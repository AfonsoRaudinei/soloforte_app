/**
 * 🗺️ TILE MANAGER - Sistema de Cache de Mapas Offline
 * 
 * Gerencia cache de tiles para funcionamento offline do mapa.
 * 
 * Funcionalidades:
 * - Cache offline-first (IndexedDB)
 * - Detecção automática online/offline
 * - Pré-carregamento de áreas
 * - Limpeza automática (max 100MB)
 * - Fallback para placeholder
 * 
 * @version 1.0.0
 * @author SoloForte Team
 */

import { logger } from './logger';

interface CachedTile {
  key: string;
  url: string;
  blob: Blob;
  timestamp: number;
  zoom: number;
  x: number;
  y: number;
}

interface CacheStats {
  totalTiles: number;
  totalSizeMB: number;
  oldestTile: Date | null;
  newestTile: Date | null;
}

interface PreloadBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

/**
 * ✅ TILE MANAGER SINGLETON
 * 
 * Gerencia todo o sistema de cache de tiles.
 * Usa IndexedDB para persistir tiles entre sessões.
 */
export class TileManager {
  private static instance: TileManager;
  private db: IDBDatabase | null = null;
  private isOnline: boolean = true;
  private readonly maxCacheSize: number = 100 * 1024 * 1024; // 100MB
  private readonly maxTileAge: number = 7 * 24 * 60 * 60 * 1000; // 7 dias
  private readonly dbName: string = 'soloforte-map-tiles';
  private readonly storeName: string = 'tiles';
  
  // ✅ NOVO: Sistema de rastreamento de Blob URLs para prevenir memory leaks
  private blobUrls: Map<string, string> = new Map();
  
  // ✅ NOVO: Rate limiting para evitar sobrecarga de requisições
  private activeRequests = 0;
  private readonly MAX_CONCURRENT = 4; // Máximo de 4 requisições simultâneas

  private constructor() {
    this.initDatabase();
    this.initNetworkListener();
  }

  /**
   * Obter instância singleton
   */
  static getInstance(): TileManager {
    if (!TileManager.instance) {
      TileManager.instance = new TileManager();
    }
    return TileManager.instance;
  }

  /**
   * ✅ INICIALIZAR INDEXEDDB
   */
  private async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = () => {
        logger.error('❌ Erro ao abrir IndexedDB:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        logger.log('✅ IndexedDB inicializado');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Criar object store se não existir
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'key' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('zoom', 'zoom', { unique: false });
          logger.log('✅ Object store criado');
        }
      };
    });
  }

  /**
   * ✅ INICIALIZAR LISTENER DE REDE
   */
  private initNetworkListener(): void {
    // Status inicial
    this.isOnline = navigator.onLine;

    // Listener de mudanças
    window.addEventListener('online', () => {
      this.isOnline = true;
      logger.log('📶 Status de rede: ONLINE');
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      logger.log('📵 Status de rede: OFFLINE');
    });
  }

  /**
   * ✅ OBTER TILE (CACHE OU REDE)
   * 
   * Estratégia offline-first com rate limiting e rastreamento de memória:
   * 1. Buscar no cache (IndexedDB)
   * 2. Se não encontrar e online, buscar da rede (com rate limiting)
   * 3. Salvar no cache
   * 4. Rastrear Blob URLs para cleanup posterior
   * 5. Se offline sem cache, retornar placeholder
   * 
   * @version 2.0.0 - Corrige race conditions e memory leaks
   */
  async getTile(url: string, x: number, y: number, z: number): Promise<string> {
    const key = this.getTileKey(x, y, z);

    // ✅ Rate limiting: aguardar se muitas requisições ativas
    while (this.activeRequests >= this.MAX_CONCURRENT) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    this.activeRequests++;
    
    try {
      // 1. Tentar cache primeiro (offline-first)
      const cachedTile = await this.getFromCache(key);
      if (cachedTile) {
        const blobUrl = URL.createObjectURL(cachedTile.blob);
        this.trackBlobUrl(blobUrl, key); // ✅ Rastrear para cleanup
        return blobUrl;
      }

      // 2. Se online, buscar da rede
      if (this.isOnline) {
        try {
          const blob = await this.fetchTileFromNetwork(url);
          
          // Salvar no cache (non-blocking)
          this.saveToCache(key, url, blob, x, y, z).catch(err => {
            logger.warn(`⚠️ Erro ao salvar tile ${key} no cache:`, err);
          });
          
          const blobUrl = URL.createObjectURL(blob);
          this.trackBlobUrl(blobUrl, key); // ✅ Rastrear para cleanup
          return blobUrl;
          
        } catch (error) {
          // ✅ LOG DETALHADO para diagnóstico
          const errorMsg = error instanceof Error ? error.message : String(error);
          
          if (errorMsg.includes('404')) {
            // Tile não existe no servidor (normal em alguns zooms/coords)
            logger.debug(`🗺️ Tile ${key} não existe (404)`);
          } else if (errorMsg.includes('429')) {
            // Rate limit do servidor
            logger.warn(`⏱️ Rate limit no tile ${key} (429)`);
          } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('CORS')) {
            // Erro de CORS ou rede
            logger.error(`❌ Erro de rede no tile ${key}: ${errorMsg}`);
          } else {
            // Outro erro
            logger.error(`❌ Erro ao carregar tile ${key}:`, error);
          }
          
          return this.getTransparentTile();
        }
      }

      // 3. Offline sem cache = tile transparente
      logger.debug(`📵 Tile ${key} não disponível offline`);
      return this.getTransparentTile();
      
    } catch (error) {
      logger.error(`❌ Erro inesperado ao obter tile ${key}:`, error);
      return this.getTransparentTile();
    } finally {
      this.activeRequests--;
    }
  }

  /**
   * ✅ RASTREAR BLOB URL para cleanup posterior
   * Previne memory leaks revogando Blob URLs antigos
   */
  private trackBlobUrl(blobUrl: string, key: string): void {
    // Revogar blob antigo se existir
    const oldBlob = this.blobUrls.get(key);
    if (oldBlob) {
      URL.revokeObjectURL(oldBlob);
    }
    this.blobUrls.set(key, blobUrl);
  }

  /**
   * ✅ BUSCAR TILE DA REDE
   */
  private async fetchTileFromNetwork(url: string): Promise<Blob> {
    const response = await fetch(url, {
      mode: 'cors',
      cache: 'force-cache' // Usar cache do navegador quando possível
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.blob();
  }

  /**
   * ✅ SALVAR TILE NO CACHE
   */
  private async saveToCache(
    key: string,
    url: string,
    blob: Blob,
    x: number,
    y: number,
    z: number
  ): Promise<void> {
    if (!this.db) {
      await this.initDatabase();
    }

    if (!this.db) {
      throw new Error('Database não inicializado');
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);

      const cachedTile: CachedTile = {
        key,
        url,
        blob,
        timestamp: Date.now(),
        zoom: z,
        x,
        y
      };

      const request = store.put(cachedTile);

      request.onsuccess = () => {
        // Verificar tamanho do cache (não-bloqueante)
        this.cleanupCacheIfNeeded().catch(err => {
          logger.error('❌ Erro ao limpar cache:', err);
        });
        resolve();
      };

      request.onerror = () => {
        logger.error('❌ Erro ao salvar tile:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * ✅ OBTER TILE DO CACHE
   */
  private async getFromCache(key: string): Promise<CachedTile | null> {
    if (!this.db) {
      await this.initDatabase();
    }

    if (!this.db) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        const cachedTile = request.result as CachedTile | undefined;
        
        if (!cachedTile) {
          resolve(null);
          return;
        }

        // Verificar se tile está muito antigo
        const age = Date.now() - cachedTile.timestamp;
        if (age > this.maxTileAge) {
          // logger.log(`🗑️ Tile expirado: ${key}`);
          this.removeFromCache(key).catch(err => {
            logger.error('❌ Erro ao remover tile expirado:', err);
          });
          resolve(null);
          return;
        }

        resolve(cachedTile);
      };

      request.onerror = () => {
        logger.error('❌ Erro ao buscar tile do cache:', request.error);
        resolve(null);
      };
    });
  }

  /**
   * ✅ REMOVER TILE DO CACHE
   */
  private async removeFromCache(key: string): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * ✅ GERAR CHAVE ÚNICA PARA TILE
   */
  private getTileKey(x: number, y: number, z: number): string {
    return `tile_${z}_${x}_${y}`;
  }

  /**
   * ✅ RETORNAR TILE PLACEHOLDER
   * 
   * Canvas cinza com texto "Offline"
   */
  private getPlaceholderTile(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fundo cinza claro
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, 256, 256);
      
      // Borda
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 256, 256);
      
      // Texto "Offline"
      ctx.fillStyle = '#9ca3af';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Offline', 128, 128);
    }

    return canvas.toDataURL();
  }

  /**
   * ✅ RETORNAR TILE TRANSPARENTE
   * 
   * Para tiles que não existem (comum em certos zooms/coords)
   */
  private getTransparentTile(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    // Canvas vazio = transparente
    return canvas.toDataURL();
  }

  /**
   * ✅ LIMPAR CACHE SE MUITO GRANDE
   * 
   * Quando cache > 100MB, remove 25% dos tiles mais antigos
   */
  private async cleanupCacheIfNeeded(): Promise<void> {
    if (!this.db) return;

    const cacheSize = await this.calculateCacheSize();

    if (cacheSize > this.maxCacheSize) {
      logger.log(`🧹 Cache muito grande (${(cacheSize / 1024 / 1024).toFixed(2)}MB), limpando...`);
      
      const tiles = await this.getAllTiles();
      
      // Ordenar por timestamp (mais antigos primeiro)
      tiles.sort((a, b) => a.timestamp - b.timestamp);

      // Deletar 25% mais antigos
      const toDelete = Math.floor(tiles.length * 0.25);
      for (let i = 0; i < toDelete; i++) {
        await this.removeFromCache(tiles[i].key);
      }

      logger.log(`✅ ${toDelete} tiles antigos removidos`);
    }
  }

  /**
   * ✅ CALCULAR TAMANHO TOTAL DO CACHE
   */
  private async calculateCacheSize(): Promise<number> {
    if (!this.db) return 0;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.openCursor();

      let totalSize = 0;

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          const tile = cursor.value as CachedTile;
          if (tile && tile.blob) {
            totalSize += tile.blob.size;
          }
          cursor.continue();
        } else {
          resolve(totalSize);
        }
      };

      request.onerror = () => {
        logger.error('❌ Erro ao calcular tamanho do cache:', request.error);
        resolve(0);
      };
    });
  }

  /**
   * ✅ OBTER TODOS OS TILES
   */
  private async getAllTiles(): Promise<CachedTile[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result as CachedTile[]);
      };

      request.onerror = () => {
        logger.error('❌ Erro ao obter tiles:', request.error);
        resolve([]);
      };
    });
  }

  /**
   * ✅ PRÉ-CARREGAR ÁREA PARA USO OFFLINE
   * 
   * Baixa todos os tiles de uma área específica
   * 
   * @param bounds - Limites da área (lat/lng)
   * @param minZoom - Zoom mínimo
   * @param maxZoom - Zoom máximo
   * @param tileUrlTemplate - Template da URL dos tiles
   * @param onProgress - Callback de progresso
   */
  async preloadArea(
    bounds: PreloadBounds,
    minZoom: number,
    maxZoom: number,
    tileUrlTemplate: string,
    onProgress?: (progress: number, total: number) => void
  ): Promise<void> {
    logger.log('📦 Iniciando pré-carregamento de área offline...');
    
    const tiles: Array<{ x: number; y: number; z: number; url: string }> = [];

    // Calcular todos os tiles necessários
    for (let z = minZoom; z <= maxZoom; z++) {
      const minTileX = this.long2tile(bounds.minLng, z);
      const maxTileX = this.long2tile(bounds.maxLng, z);
      const minTileY = this.lat2tile(bounds.maxLat, z);
      const maxTileY = this.lat2tile(bounds.minLat, z);

      for (let x = minTileX; x <= maxTileX; x++) {
        for (let y = minTileY; y <= maxTileY; y++) {
          const url = tileUrlTemplate
            .replace('{z}', z.toString())
            .replace('{x}', x.toString())
            .replace('{y}', y.toString())
            .replace('{s}', ['a', 'b', 'c'][Math.floor(Math.random() * 3)]);

          tiles.push({ x, y, z, url });
        }
      }
    }

    logger.log(`📊 Total de tiles para baixar: ${tiles.length}`);

    // Baixar tiles em lotes (para não sobrecarregar)
    const batchSize = 5; // Reduzido para evitar rate limiting
    let downloaded = 0;

    for (let i = 0; i < tiles.length; i += batchSize) {
      const batch = tiles.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (tile) => {
          try {
            await this.getTile(tile.url, tile.x, tile.y, tile.z);
            downloaded++;
          } catch (error) {
            logger.error(`❌ Erro ao baixar tile ${tile.z}/${tile.x}/${tile.y}:`, error);
          }
        })
      );

      if (onProgress) {
        onProgress(downloaded, tiles.length);
      }

      // Delay entre batches para não sobrecarregar
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    logger.log('✅ Pré-carregamento concluído!');
  }

  /**
   * ✅ CONVERTER LONGITUDE PARA TILE X
   */
  private long2tile(lon: number, zoom: number): number {
    return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  }

  /**
   * ✅ CONVERTER LATITUDE PARA TILE Y
   */
  private lat2tile(lat: number, zoom: number): number {
    return Math.floor(
      ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
      Math.pow(2, zoom)
    );
  }

  /**
   * ✅ OBTER ESTATÍSTICAS DO CACHE
   */
  async getCacheStats(): Promise<CacheStats> {
    const tiles = await this.getAllTiles();
    const totalTiles = tiles.length;
    const totalSize = await this.calculateCacheSize();

    let oldestTimestamp = Infinity;
    let newestTimestamp = 0;

    tiles.forEach(tile => {
      if (tile.timestamp < oldestTimestamp) oldestTimestamp = tile.timestamp;
      if (tile.timestamp > newestTimestamp) newestTimestamp = tile.timestamp;
    });

    return {
      totalTiles,
      totalSizeMB: totalSize / 1024 / 1024,
      oldestTile: oldestTimestamp !== Infinity ? new Date(oldestTimestamp) : null,
      newestTile: newestTimestamp !== 0 ? new Date(newestTimestamp) : null
    };
  }

  /**
   * ✅ LIMPAR TODO O CACHE
   */
  async clearCache(): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        logger.log('🗑️ Cache de tiles limpo completamente');
        // ✅ Limpar Blob URLs também
        this.cleanup();
        resolve();
      };

      request.onerror = () => {
        logger.error('❌ Erro ao limpar cache:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * ✅ CLEANUP DE BLOB URLs
   * Previne memory leaks revogando todos os Blob URLs criados
   */
  public cleanup(): void {
    let count = 0;
    this.blobUrls.forEach(blobUrl => {
      URL.revokeObjectURL(blobUrl);
      count++;
    });
    this.blobUrls.clear();
    
    if (count > 0) {
      logger.log(`🧹 ${count} Blob URLs limpos (memória liberada)`);
    }
  }

  /**
   * ✅ VERIFICAR SE ESTÁ ONLINE
   */
  get online(): boolean {
    return this.isOnline;
  }

  /**
   * ✅ OBTER ESTATÍSTICAS DE REQUISIÇÕES
   * Útil para debugging e monitoramento
   */
  public getRequestStats(): { active: number; max: number; blobUrls: number } {
    return {
      active: this.activeRequests,
      max: this.MAX_CONCURRENT,
      blobUrls: this.blobUrls.size
    };
  }
}

// ===================================
// EXPORTAR INSTÂNCIA SINGLETON
// ===================================

export const tileManager = TileManager.getInstance();
