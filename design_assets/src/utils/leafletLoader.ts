/**
 * 🗺️ LEAFLET LOADER
 * 
 * Utilitário para carregar o Leaflet de forma otimizada
 * com retry logic e CDN fallback
 * 
 * @version 1.0.0
 */

export class LeafletLoader {
  private static instance: LeafletLoader;
  private loadPromise: Promise<any> | null = null;
  private retryCount = 0;
  private readonly MAX_RETRIES = 2;
  private readonly TIMEOUT_MS = 10000;

  private constructor() {}

  public static getInstance(): LeafletLoader {
    if (!LeafletLoader.instance) {
      LeafletLoader.instance = new LeafletLoader();
    }
    return LeafletLoader.instance;
  }

  /**
   * Carrega o Leaflet se ainda não foi carregado
   */
  public async load(): Promise<any> {
    // Se já carregado, retornar
    if ((window as any).L) {
      console.log('✅ Leaflet já disponível');
      return (window as any).L;
    }

    // Se já está carregando, retornar a Promise existente
    if (this.loadPromise) {
      console.log('⏳ Leaflet já está sendo carregado...');
      return this.loadPromise;
    }

    // Iniciar novo carregamento
    this.loadPromise = this.loadLeafletScript();
    return this.loadPromise;
  }

  private async loadLeafletScript(): Promise<any> {
    try {
      console.log('🗺️ [LeafletLoader] Iniciando carregamento...');

      // Carregar CSS
      await this.loadCSS();

      // Carregar JS
      await this.loadJS();

      // Verificar se carregou
      if ((window as any).L) {
        console.log('✅ [LeafletLoader] Carregamento completo!');
        return (window as any).L;
      } else {
        throw new Error('Leaflet carregou mas window.L não está disponível');
      }
    } catch (error) {
      console.error('❌ [LeafletLoader] Erro:', error);

      // Tentar retry
      if (this.retryCount < this.MAX_RETRIES) {
        this.retryCount++;
        console.log(`🔄 [LeafletLoader] Tentando novamente (${this.retryCount}/${this.MAX_RETRIES})...`);
        
        // Remover script anterior
        const oldScript = document.querySelector('script[src*="leaflet.js"]');
        if (oldScript) oldScript.remove();
        
        // Aguardar 500ms e tentar novamente
        await new Promise(resolve => setTimeout(resolve, 500));
        this.loadPromise = null; // Reset promise
        return this.load();
      }

      throw error;
    }
  }

  private loadCSS(): Promise<void> {
    return new Promise((resolve) => {
      // Verificar se já existe
      if (document.querySelector('link[href*="leaflet.css"]')) {
        console.log('✅ [LeafletLoader] CSS já carregado');
        resolve();
        return;
      }

      console.log('📦 [LeafletLoader] Carregando CSS...');
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.crossOrigin = 'anonymous';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      
      link.onload = () => {
        console.log('✅ [LeafletLoader] CSS carregado');
        resolve();
      };
      
      link.onerror = () => {
        console.warn('⚠️ [LeafletLoader] Erro ao carregar CSS (continuando...)');
        resolve(); // Não bloquear por causa do CSS
      };
      
      document.head.appendChild(link);
    });
  }

  private loadJS(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar se já existe
      const existingScript = document.querySelector('script[src*="leaflet.js"]');
      if (existingScript) {
        console.log('⏳ [LeafletLoader] Script já existe, aguardando...');
        this.waitForLeaflet().then(resolve).catch(reject);
        return;
      }

      console.log('📦 [LeafletLoader] Carregando JS...');
      const script = document.createElement('script');
      
      // Escolher CDN baseado no retry count
      if (this.retryCount === 0) {
        // Primeira tentativa: unpkg
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      } else {
        // Segunda tentativa: cdnjs (geralmente mais rápido)
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.integrity = 'sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==';
      }
      
      script.crossOrigin = 'anonymous';

      // Timeout
      const timeout = setTimeout(() => {
        console.error('❌ [LeafletLoader] Timeout ao carregar JS');
        reject(new Error('Timeout ao carregar Leaflet'));
      }, this.TIMEOUT_MS);

      script.onload = () => {
        clearTimeout(timeout);
        console.log('✅ [LeafletLoader] JS carregado');
        
        if ((window as any).L) {
          resolve();
        } else {
          // Aguardar um pouco para o Leaflet inicializar
          this.waitForLeaflet().then(resolve).catch(reject);
        }
      };

      script.onerror = (error) => {
        clearTimeout(timeout);
        console.error('❌ [LeafletLoader] Erro ao carregar JS:', error);
        reject(new Error('Erro ao carregar Leaflet'));
      };

      document.head.appendChild(script);
    });
  }

  private waitForLeaflet(): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 100; // 10 segundos

      const interval = setInterval(() => {
        attempts++;
        
        if ((window as any).L) {
          console.log(`✅ [LeafletLoader] Leaflet detectado após ${attempts * 100}ms`);
          clearInterval(interval);
          resolve();
        } else if (attempts >= maxAttempts) {
          console.error('❌ [LeafletLoader] Timeout aguardando Leaflet');
          clearInterval(interval);
          reject(new Error('Timeout aguardando Leaflet'));
        }
      }, 100);
    });
  }

  /**
   * Pré-carregar o Leaflet (útil para chamadas antecipadas)
   */
  public preload(): void {
    if (!(window as any).L && !this.loadPromise) {
      console.log('🚀 [LeafletLoader] Pré-carregando Leaflet...');
      this.load().catch(err => {
        console.warn('⚠️ [LeafletLoader] Falha no pré-carregamento:', err);
      });
    }
  }

  /**
   * Reset (útil para testes)
   */
  public reset(): void {
    this.loadPromise = null;
    this.retryCount = 0;
  }
}

// Export singleton instance
export const leafletLoader = LeafletLoader.getInstance();

// Auto pré-carregar quando este módulo for importado
// (apenas em produção, para não afetar desenvolvimento)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  // Aguardar 1 segundo após page load para não interferir com critical path
  if (document.readyState === 'complete') {
    setTimeout(() => leafletLoader.preload(), 1000);
  } else {
    window.addEventListener('load', () => {
      setTimeout(() => leafletLoader.preload(), 1000);
    });
  }
}
