import * as kv from './kv_store.tsx';

// Rota para obter configurações públicas (como MapTiler key se necessário)
export function getPublicConfig() {
  return {
    maptilerKey: Deno.env.get('MAPTILER_API_KEY') || '',
  };
}

// ===== ROTAS PARA NOTIFICAÇÕES =====

// Criar e disparar notificação
export async function createNotification(userId: string, notificationData: any) {
  try {
    const notificationId = `notif_${userId}_${Date.now()}`;
    const key = `user:${userId}:notifications:${notificationId}`;
    
    const notification = {
      ...notificationData,
      id: notificationId,
      userId,
      timestamp: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    await kv.set(key, notification);
    
    console.log(`Notificação criada: ${notificationId} para usuário ${userId}`);
    return { success: true, notification };
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    throw new Error(`Erro ao criar notificação: ${error}`);
  }
}

// Buscar notificações de um usuário
export async function getUserNotifications(userId: string) {
  try {
    const prefix = `user:${userId}:notifications:`;
    const notifications = await kv.getByPrefix(prefix);
    
    // Ordenar por timestamp (mais recentes primeiro)
    const sorted = notifications.sort((a: any, b: any) => b.timestamp - a.timestamp);
    
    console.log(`Notificações recuperadas para usuário ${userId}: ${sorted.length}`);
    return { success: true, notifications: sorted };
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    throw new Error(`Erro ao buscar notificações: ${error}`);
  }
}

// Marcar notificação como lida
export async function markNotificationAsRead(userId: string, notificationId: string) {
  try {
    const key = `user:${userId}:notifications:${notificationId}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      throw new Error('Notificação não encontrada');
    }

    const updated = {
      ...existing,
      read: true,
      readAt: new Date().toISOString(),
    };

    await kv.set(key, updated);
    
    console.log(`Notificação marcada como lida: ${notificationId}`);
    return { success: true, notification: updated };
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    throw new Error(`Erro ao marcar notificação como lida: ${error}`);
  }
}

// Deletar notificação
export async function deleteNotification(userId: string, notificationId: string) {
  try {
    const key = `user:${userId}:notifications:${notificationId}`;
    await kv.del(key);
    
    console.log(`Notificação deletada: ${notificationId}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar notificação:', error);
    throw new Error(`Erro ao deletar notificação: ${error}`);
  }
}

// ===== ROTAS PARA GERENCIAMENTO DE POLÍGONOS =====

// Salvar novo polígono
export async function savePolygon(userId: string, polygonData: any) {
  try {
    const polygonId = `polygon_${userId}_${Date.now()}`;
    const key = `user:${userId}:polygons:${polygonId}`;
    
    const polygon = {
      ...polygonData,
      id: polygonId,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, polygon);
    
    console.log(`Polígono salvo: ${polygonId} para usuário ${userId}`);
    return { success: true, polygon };
  } catch (error) {
    console.error('Erro ao salvar polígono:', error);
    throw new Error(`Erro ao salvar polígono: ${error}`);
  }
}

// Buscar todos os polígonos de um usuário
export async function getUserPolygons(userId: string) {
  try {
    const prefix = `user:${userId}:polygons:`;
    const polygons = await kv.getByPrefix(prefix);
    
    console.log(`Polígonos recuperados para usuário ${userId}: ${polygons.length}`);
    return { success: true, polygons };
  } catch (error) {
    console.error('Erro ao buscar polígonos:', error);
    throw new Error(`Erro ao buscar polígonos: ${error}`);
  }
}

// Atualizar polígono existente
export async function updatePolygon(userId: string, polygonId: string, updates: any) {
  try {
    const key = `user:${userId}:polygons:${polygonId}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      throw new Error('Polígono não encontrado');
    }

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(key, updated);
    
    console.log(`Polígono atualizado: ${polygonId}`);
    return { success: true, polygon: updated };
  } catch (error) {
    console.error('Erro ao atualizar polígono:', error);
    throw new Error(`Erro ao atualizar polígono: ${error}`);
  }
}

// Deletar polígono
export async function deletePolygon(userId: string, polygonId: string) {
  try {
    const key = `user:${userId}:polygons:${polygonId}`;
    await kv.del(key);
    
    console.log(`Polígono deletado: ${polygonId}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar polígono:', error);
    throw new Error(`Erro ao deletar polígono: ${error}`);
  }
}

// Processar arquivo KML/KMZ
export async function processKMLFile(userId: string, fileContent: string, fileName: string) {
  try {
    // Parser simples de KML - em produção usaria biblioteca completa
    const polygons = parseKML(fileContent);
    
    // Salvar cada polígono encontrado
    const savedPolygons = [];
    for (const polygonData of polygons) {
      const result = await savePolygon(userId, {
        ...polygonData,
        name: `${fileName} - ${polygonData.name || 'Área'}`,
        source: 'kml',
      });
      savedPolygons.push(result.polygon);
    }
    
    console.log(`KML processado: ${savedPolygons.length} polígonos importados`);
    return { success: true, polygons: savedPolygons, count: savedPolygons.length };
  } catch (error) {
    console.error('Erro ao processar KML:', error);
    throw new Error(`Erro ao processar KML: ${error}`);
  }
}

// Parser básico de KML
function parseKML(kmlContent: string) {
  const polygons = [];
  
  try {
    // Encontrar todos os blocos de coordenadas
    const coordsRegex = /<coordinates>([\s\S]*?)<\/coordinates>/g;
    const nameRegex = /<name>(.*?)<\/name>/g;
    
    let coordMatch;
    let nameMatch;
    const names = [];
    
    // Extrair nomes
    while ((nameMatch = nameRegex.exec(kmlContent)) !== null) {
      names.push(nameMatch[1]);
    }
    
    let index = 0;
    while ((coordMatch = coordsRegex.exec(kmlContent)) !== null) {
      const coordsText = coordMatch[1].trim();
      const coordPairs = coordsText.split(/\s+/);
      
      const points = coordPairs
        .map(pair => {
          const [lng, lat, alt] = pair.split(',').map(Number);
          if (isNaN(lat) || isNaN(lng)) return null;
          return { lat, lng, x: 0, y: 0 }; // x, y serão calculados no frontend
        })
        .filter(Boolean);
      
      if (points.length >= 3) {
        polygons.push({
          name: names[index] || `Área ${index + 1}`,
          points,
          type: 'polygon',
          color: getRandomColor(),
        });
      }
      
      index++;
    }
  } catch (error) {
    console.error('Erro ao fazer parse do KML:', error);
  }
  
  return polygons;
}

function getRandomColor() {
  const colors = ['#0057FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ===== ROTAS PARA GERENCIAMENTO DE PRODUTORES =====

// Buscar produtores de um sistema externo
export async function syncProdutoresFromExternalSystem(consultorId: string, apiUrl: string, apiToken?: string) {
  try {
    console.log(`Sincronizando produtores do sistema externo para consultor ${consultorId}`);
    
    // Headers para a requisição
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (apiToken) {
      headers['Authorization'] = `Bearer ${apiToken}`;
    }
    
    // Buscar produtores do sistema externo
    const response = await fetch(apiUrl, { headers });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtores: ${response.statusText}`);
    }
    
    const externalData = await response.json();
    
    // Processar e salvar produtores
    // Assumindo que a resposta contém um array de produtores
    const produtores = Array.isArray(externalData) ? externalData : externalData.produtores || externalData.data || [];
    
    const savedProdutores = [];
    for (const produtorData of produtores) {
      const produtor = await saveProdutorFromExternalData(consultorId, produtorData);
      savedProdutores.push(produtor);
    }
    
    console.log(`Sincronizados ${savedProdutores.length} produtores`);
    
    return {
      success: true,
      count: savedProdutores.length,
      produtores: savedProdutores,
    };
  } catch (error) {
    console.error('Erro ao sincronizar produtores:', error);
    throw new Error(`Erro ao sincronizar produtores: ${error}`);
  }
}

// Salvar produtor a partir de dados externos
async function saveProdutorFromExternalData(consultorId: string, externalData: any) {
  // Extrair dados do produtor (adaptar conforme formato do sistema externo)
  const produtorId = externalData.id || externalData.produtor_id || crypto.randomUUID();
  const key = `consultor:${consultorId}:produtor:${produtorId}`;
  
  const produtor = {
    id: produtorId,
    consultorId,
    nome: externalData.nome || externalData.name || '',
    email: externalData.email || '',
    whatsapp: externalData.whatsapp || externalData.telefone || externalData.phone || '',
    telefone: externalData.telefone || externalData.phone || '',
    cpfCnpj: externalData.cpf || externalData.cnpj || externalData.cpfCnpj || '',
    fazenda: externalData.fazenda || externalData.propriedade || '',
    cidade: externalData.cidade || externalData.city || '',
    estado: externalData.estado || externalData.uf || externalData.state || '',
    endereco: externalData.endereco || externalData.address || '',
    ativo: externalData.ativo !== undefined ? externalData.ativo : true,
    syncedFrom: 'external',
    externalId: externalData.id || externalData.external_id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  await kv.set(key, produtor);
  return produtor;
}

// Criar/atualizar produtor manualmente
export async function saveProdutor(consultorId: string, produtorData: any) {
  try {
    const produtorId = produtorData.id || crypto.randomUUID();
    const key = `consultor:${consultorId}:produtor:${produtorId}`;
    
    const existing = await kv.get(key);
    
    const produtor = {
      ...(existing || {}),
      ...produtorData,
      id: produtorId,
      consultorId,
      updatedAt: new Date().toISOString(),
      createdAt: existing?.createdAt || new Date().toISOString(),
    };
    
    await kv.set(key, produtor);
    
    console.log(`Produtor salvo: ${produtorId} para consultor ${consultorId}`);
    return { success: true, produtor };
  } catch (error) {
    console.error('Erro ao salvar produtor:', error);
    throw new Error(`Erro ao salvar produtor: ${error}`);
  }
}

// Buscar todos os produtores de um consultor
export async function getProdutoresByConsultor(consultorId: string) {
  try {
    const prefix = `consultor:${consultorId}:produtor:`;
    const produtores = await kv.getByPrefix(prefix);
    
    // Ordenar por nome
    const sorted = produtores.sort((a: any, b: any) => {
      return (a.nome || '').localeCompare(b.nome || '');
    });
    
    console.log(`Produtores recuperados para consultor ${consultorId}: ${sorted.length}`);
    return { success: true, produtores: sorted };
  } catch (error) {
    console.error('Erro ao buscar produtores:', error);
    throw new Error(`Erro ao buscar produtores: ${error}`);
  }
}

// Buscar um produtor específico
export async function getProdutor(consultorId: string, produtorId: string) {
  try {
    const key = `consultor:${consultorId}:produtor:${produtorId}`;
    const produtor = await kv.get(key);
    
    if (!produtor) {
      throw new Error('Produtor não encontrado');
    }
    
    return { success: true, produtor };
  } catch (error) {
    console.error('Erro ao buscar produtor:', error);
    throw new Error(`Erro ao buscar produtor: ${error}`);
  }
}

// Deletar produtor
export async function deleteProdutor(consultorId: string, produtorId: string) {
  try {
    const key = `consultor:${consultorId}:produtor:${produtorId}`;
    await kv.del(key);
    
    console.log(`Produtor deletado: ${produtorId}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar produtor:', error);
    throw new Error(`Erro ao deletar produtor: ${error}`);
  }
}

// Buscar talhões de um produtor
export async function getTalhoesProdutor(consultorId: string, produtorId: string) {
  try {
    const prefix = `consultor:${consultorId}:produtor:${produtorId}:talhao:`;
    const talhoes = await kv.getByPrefix(prefix);
    
    console.log(`Talhões recuperados para produtor ${produtorId}: ${talhoes.length}`);
    return { success: true, talhoes };
  } catch (error) {
    console.error('Erro ao buscar talhões:', error);
    throw new Error(`Erro ao buscar talhões: ${error}`);
  }
}

// Salvar talhão de um produtor
export async function saveTalhao(consultorId: string, produtorId: string, talhaoData: any) {
  try {
    const talhaoId = talhaoData.id || crypto.randomUUID();
    const key = `consultor:${consultorId}:produtor:${produtorId}:talhao:${talhaoId}`;
    
    const talhao = {
      ...talhaoData,
      id: talhaoId,
      produtorId,
      consultorId,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(key, talhao);
    
    console.log(`Talhão salvo: ${talhaoId} para produtor ${produtorId}`);
    return { success: true, talhao };
  } catch (error) {
    console.error('Erro ao salvar talhão:', error);
    throw new Error(`Erro ao salvar talhão: ${error}`);
  }
}

// ===== ROTAS PARA PROCESSAMENTO NDVI =====

// Processar NDVI de uma área
export async function processNDVI(userId: string, date: string, bounds: any, source: 'sentinel' | 'planet', areaId: string) {
  try {
    console.log(`Processando NDVI para usuário ${userId}, área ${areaId}, data ${date}, fonte ${source}`);
    
    // Extrair bbox da área
    const bbox = calculateBBox(bounds);
    
    let ndviData;
    
    if (source === 'sentinel') {
      ndviData = await fetchSentinelNDVI(bbox, date);
    } else if (source === 'planet') {
      ndviData = await fetchPlanetNDVI(bbox, date);
    }
    
    // Calcular estatísticas de distribuição
    const distribution = calculateNDVIDistribution(ndviData?.values || []);
    
    // Salvar cache do resultado
    const cacheKey = `ndvi:${userId}:${areaId}:${date}:${source}`;
    await kv.set(cacheKey, {
      ...ndviData,
      distribution,
      cachedAt: new Date().toISOString(),
    });
    
    return {
      date,
      cloudCover: ndviData?.cloudCover || 0,
      distribution,
      averageNDVI: calculateAverageNDVI(ndviData?.values || []),
      imageUrl: ndviData?.imageUrl,
    };
  } catch (error) {
    console.error('Erro ao processar NDVI:', error);
    throw new Error(`Erro ao processar NDVI: ${error}`);
  }
}

// Buscar dados NDVI do Sentinel Hub
async function fetchSentinelNDVI(bbox: number[], date: string) {
  try {
    const clientId = Deno.env.get('SENTINEL_HUB_CLIENT_ID');
    const clientSecret = Deno.env.get('SENTINEL_HUB_CLIENT_SECRET');
    
    if (!clientId || !clientSecret) {
      throw new Error('Credenciais Sentinel Hub não configuradas');
    }
    
    // Autenticar com Sentinel Hub
    const authResponse = await fetch('https://services.sentinel-hub.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });
    
    if (!authResponse.ok) {
      throw new Error(`Erro de autenticação Sentinel Hub: ${authResponse.statusText}`);
    }
    
    const authData = await authResponse.json();
    const accessToken = authData.access_token;
    
    // Requisitar dados NDVI
    const evalscript = `
      //VERSION=3
      function setup() {
        return {
          input: [{
            bands: ["B04", "B08", "SCL"],
            units: "DN"
          }],
          output: {
            bands: 1,
            sampleType: "FLOAT32"
          }
        };
      }
      
      function evaluatePixel(sample) {
        // SCL (Scene Classification Layer) - 8,9 = nuvens
        if (sample.SCL === 8 || sample.SCL === 9) {
          return [-999]; // Máscara de nuvem
        }
        
        let ndvi = (sample.B08 - sample.B04) / (sample.B08 + sample.B04);
        return [ndvi];
      }
    `;
    
    const requestBody = {
      input: {
        bounds: {
          bbox: bbox,
          properties: {
            crs: "http://www.opengis.net/def/crs/EPSG/0/4326"
          }
        },
        data: [{
          type: "S2L2A",
          dataFilter: {
            timeRange: {
              from: `${date}T00:00:00Z`,
              to: `${date}T23:59:59Z`
            },
            maxCloudCoverage: 30
          }
        }]
      },
      output: {
        width: 512,
        height: 512,
        responses: [{
          identifier: "default",
          format: {
            type: "image/png"
          }
        }]
      },
      evalscript: evalscript
    };
    
    const response = await fetch('https://services.sentinel-hub.com/api/v1/process', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados Sentinel: ${response.statusText}`);
    }
    
    // Em produção, processar a imagem e extrair valores NDVI
    // Por enquanto, retornar dados simulados
    const imageBlob = await response.blob();
    
    return {
      cloudCover: Math.random() * 15,
      values: generateMockNDVIValues(1000),
      imageUrl: '', // URL da imagem processada
    };
    
  } catch (error) {
    console.error('Erro ao buscar Sentinel NDVI:', error);
    throw error;
  }
}

// Buscar dados NDVI do Planet
async function fetchPlanetNDVI(bbox: number[], date: string) {
  try {
    const apiKey = Deno.env.get('PLANET_API_KEY');
    
    if (!apiKey) {
      throw new Error('API Key Planet não configurada');
    }
    
    // Requisição ao Planet API
    const searchRequest = {
      item_types: ["PSScene"],
      filter: {
        type: "AndFilter",
        config: [
          {
            type: "GeometryFilter",
            field_name: "geometry",
            config: {
              type: "Polygon",
              coordinates: [
                [
                  [bbox[0], bbox[1]],
                  [bbox[2], bbox[1]],
                  [bbox[2], bbox[3]],
                  [bbox[0], bbox[3]],
                  [bbox[0], bbox[1]]
                ]
              ]
            }
          },
          {
            type: "DateRangeFilter",
            field_name: "acquired",
            config: {
              gte: `${date}T00:00:00.000Z`,
              lte: `${date}T23:59:59.999Z`
            }
          },
          {
            type: "RangeFilter",
            field_name: "cloud_cover",
            config: {
              lte: 0.3
            }
          }
        ]
      }
    };
    
    const response = await fetch('https://api.planet.com/data/v1/quick-search', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(apiKey + ':')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchRequest),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados Planet: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Em produção, processar as imagens e calcular NDVI
    return {
      cloudCover: Math.random() * 15,
      values: generateMockNDVIValues(1000),
      imageUrl: '',
    };
    
  } catch (error) {
    console.error('Erro ao buscar Planet NDVI:', error);
    throw error;
  }
}

// Calcular bounding box de um polígono
function calculateBBox(bounds: any[]): number[] {
  const lats = bounds.map((coord: any) => coord[1] || coord.lat);
  const lngs = bounds.map((coord: any) => coord[0] || coord.lng);
  
  return [
    Math.min(...lngs), // minLng
    Math.min(...lats), // minLat
    Math.max(...lngs), // maxLng
    Math.max(...lats)  // maxLat
  ];
}

// Calcular distribuição de valores NDVI
function calculateNDVIDistribution(values: number[]) {
  const distribution = {
    veryHigh: 0,  // 0.6 - 1.0
    high: 0,      // 0.4 - 0.6
    medium: 0,    // 0.2 - 0.4
    low: 0,       // 0.0 - 0.2
    veryLow: 0,   // -1.0 - 0.0
  };
  
  values.forEach(value => {
    if (value >= 0.6) distribution.veryHigh++;
    else if (value >= 0.4) distribution.high++;
    else if (value >= 0.2) distribution.medium++;
    else if (value >= 0.0) distribution.low++;
    else distribution.veryLow++;
  });
  
  const total = values.length;
  return {
    veryHigh: (distribution.veryHigh / total) * 100,
    high: (distribution.high / total) * 100,
    medium: (distribution.medium / total) * 100,
    low: (distribution.low / total) * 100,
    veryLow: (distribution.veryLow / total) * 100,
  };
}

// Calcular NDVI médio
function calculateAverageNDVI(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

// Gerar valores NDVI mock para testes
function generateMockNDVIValues(count: number): number[] {
  const values = [];
  for (let i = 0; i < count; i++) {
    // Gerar valores com distribuição realista
    const rand = Math.random();
    let ndvi;
    
    if (rand < 0.14) ndvi = 0.6 + Math.random() * 0.4;      // 14% alta biomassa
    else if (rand < 0.36) ndvi = 0.4 + Math.random() * 0.2; // 22% boa vegetação
    else if (rand < 0.67) ndvi = 0.2 + Math.random() * 0.2; // 31% moderada
    else if (rand < 0.98) ndvi = 0.0 + Math.random() * 0.2; // 31% baixa
    else ndvi = -0.5 + Math.random() * 0.5;                 // 2% muito baixa
    
    values.push(ndvi);
  }
  return values;
}

// ===== ROTAS PARA GESTÃO DE EQUIPES E TAREFAS =====

// Listar membros da equipe
export async function getMembrosEquipe(userId: string) {
  try {
    const prefix = `user:${userId}:equipe:membro:`;
    const membros = await kv.getByPrefix(prefix);
    
    // Ordenar por nome
    const sorted = membros.sort((a: any, b: any) => {
      return (a.nome || '').localeCompare(b.nome || '');
    });
    
    console.log(`Membros recuperados para usuário ${userId}: ${sorted.length}`);
    return { success: true, membros: sorted };
  } catch (error) {
    console.error('Erro ao buscar membros da equipe:', error);
    throw new Error(`Erro ao buscar membros da equipe: ${error}`);
  }
}

// Adicionar membro à equipe
export async function addMembroEquipe(userId: string, membroData: any) {
  try {
    const membroId = `membro_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const key = `user:${userId}:equipe:membro:${membroId}`;
    
    const membro = {
      ...membroData,
      id: membroId,
      userId,
      criadoEm: new Date().toISOString(),
    };
    
    await kv.set(key, membro);
    
    console.log(`Membro adicionado: ${membroId} para usuário ${userId}`);
    return { success: true, membro };
  } catch (error) {
    console.error('Erro ao adicionar membro:', error);
    throw new Error(`Erro ao adicionar membro: ${error}`);
  }
}

// Atualizar membro
export async function updateMembroEquipe(userId: string, membroId: string, updates: any) {
  try {
    const key = `user:${userId}:equipe:membro:${membroId}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      throw new Error('Membro não encontrado');
    }
    
    const updated = {
      ...existing,
      ...updates,
      atualizadoEm: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    
    console.log(`Membro atualizado: ${membroId}`);
    return { success: true, membro: updated };
  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
    throw new Error(`Erro ao atualizar membro: ${error}`);
  }
}

// Remover membro
export async function deleteMembroEquipe(userId: string, membroId: string) {
  try {
    const key = `user:${userId}:equipe:membro:${membroId}`;
    await kv.del(key);
    
    console.log(`Membro removido: ${membroId}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao remover membro:', error);
    throw new Error(`Erro ao remover membro: ${error}`);
  }
}

// Listar tarefas com filtros
export async function getTarefasEquipe(userId: string, filtros?: any) {
  try {
    const prefix = `user:${userId}:equipe:tarefa:`;
    let tarefas = await kv.getByPrefix(prefix);
    
    // Aplicar filtros
    if (filtros?.membroId) {
      tarefas = tarefas.filter((t: any) => t.membroId === filtros.membroId);
    }
    if (filtros?.status) {
      tarefas = tarefas.filter((t: any) => t.status === filtros.status);
    }
    if (filtros?.prioridade) {
      tarefas = tarefas.filter((t: any) => t.prioridade === filtros.prioridade);
    }
    if (filtros?.tipo) {
      tarefas = tarefas.filter((t: any) => t.tipo === filtros.tipo);
    }
    if (filtros?.dataInicio) {
      tarefas = tarefas.filter((t: any) => t.dataInicio >= filtros.dataInicio);
    }
    if (filtros?.dataFim) {
      tarefas = tarefas.filter((t: any) => t.dataVencimento <= filtros.dataFim);
    }
    
    // Ordenar por data de vencimento (mais recentes primeiro)
    const sorted = tarefas.sort((a: any, b: any) => {
      return new Date(a.dataVencimento).getTime() - new Date(b.dataVencimento).getTime();
    });
    
    console.log(`Tarefas recuperadas para usuário ${userId}: ${sorted.length}`);
    return { success: true, tarefas: sorted };
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw new Error(`Erro ao buscar tarefas: ${error}`);
  }
}

// Adicionar tarefa
export async function addTarefaEquipe(userId: string, tarefaData: any) {
  try {
    const tarefaId = `tarefa_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const key = `user:${userId}:equipe:tarefa:${tarefaId}`;
    
    const tarefa = {
      ...tarefaData,
      id: tarefaId,
      userId,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    };
    
    await kv.set(key, tarefa);
    
    console.log(`Tarefa adicionada: ${tarefaId} para usuário ${userId}`);
    return { success: true, tarefa };
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    throw new Error(`Erro ao adicionar tarefa: ${error}`);
  }
}

// Atualizar tarefa
export async function updateTarefaEquipe(userId: string, tarefaId: string, updates: any) {
  try {
    const key = `user:${userId}:equipe:tarefa:${tarefaId}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      throw new Error('Tarefa não encontrada');
    }
    
    const updated = {
      ...existing,
      ...updates,
      atualizadoEm: new Date().toISOString(),
    };
    
    // Se a tarefa foi concluída, adicionar data de conclusão
    if (updates.status === 'concluida' && !existing.dataConclusao) {
      updated.dataConclusao = new Date().toISOString();
    }
    
    await kv.set(key, updated);
    
    console.log(`Tarefa atualizada: ${tarefaId}`);
    return { success: true, tarefa: updated };
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw new Error(`Erro ao atualizar tarefa: ${error}`);
  }
}

// Remover tarefa
export async function deleteTarefaEquipe(userId: string, tarefaId: string) {
  try {
    const key = `user:${userId}:equipe:tarefa:${tarefaId}`;
    await kv.del(key);
    
    console.log(`Tarefa removida: ${tarefaId}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    throw new Error(`Erro ao remover tarefa: ${error}`);
  }
}

// Gerar estatísticas da equipe
export async function getEstatisticasEquipe(userId: string, periodo?: string) {
  try {
    const membros = await getMembrosEquipe(userId);
    const tarefas = await getTarefasEquipe(userId);
    
    const totalMembros = membros.membros.length;
    const membrosAtivos = membros.membros.filter((m: any) => m.status === 'ativo').length;
    
    const totalTarefas = tarefas.tarefas.length;
    const tarefasPendentes = tarefas.tarefas.filter((t: any) => t.status === 'pendente').length;
    const tarefasEmAndamento = tarefas.tarefas.filter((t: any) => t.status === 'em_andamento').length;
    const tarefasConcluidas = tarefas.tarefas.filter((t: any) => t.status === 'concluida').length;
    
    // Calcular tarefas atrasadas
    const agora = new Date();
    const tarefasAtrasadas = tarefas.tarefas.filter((t: any) => {
      if (t.status === 'concluida' || t.status === 'cancelada') return false;
      return new Date(t.dataVencimento) < agora;
    }).length;
    
    // Calcular taxa de conclusão
    const taxaConclusao = totalTarefas > 0 ? (tarefasConcluidas / totalTarefas) * 100 : 0;
    
    // Calcular tempo médio de conclusão (em horas)
    const tarefasConcluidasComTempo = tarefas.tarefas.filter((t: any) => 
      t.status === 'concluida' && t.dataConclusao && t.dataInicio
    );
    
    let tempoMedioConclusao = 0;
    if (tarefasConcluidasComTempo.length > 0) {
      const tempos = tarefasConcluidasComTempo.map((t: any) => {
        const inicio = new Date(t.dataInicio).getTime();
        const conclusao = new Date(t.dataConclusao).getTime();
        return (conclusao - inicio) / (1000 * 60 * 60); // converter para horas
      });
      tempoMedioConclusao = tempos.reduce((a: number, b: number) => a + b, 0) / tempos.length;
    }
    
    // Calcular produtividade por membro
    const produtividadePorMembro = membros.membros.map((membro: any) => {
      const tarefasMembro = tarefas.tarefas.filter((t: any) => t.membroId === membro.id);
      const conclusas = tarefasMembro.filter((t: any) => t.status === 'concluida');
      const emAndamento = tarefasMembro.filter((t: any) => t.status === 'em_andamento');
      const pendentes = tarefasMembro.filter((t: any) => t.status === 'pendente');
      
      // Calcular tempo médio deste membro
      const tarefasComTempo = conclusas.filter((t: any) => t.dataConclusao && t.dataInicio);
      let tempoMedio = 0;
      if (tarefasComTempo.length > 0) {
        const tempos = tarefasComTempo.map((t: any) => {
          const inicio = new Date(t.dataInicio).getTime();
          const conclusao = new Date(t.dataConclusao).getTime();
          return (conclusao - inicio) / (1000 * 60 * 60);
        });
        tempoMedio = tempos.reduce((a: number, b: number) => a + b, 0) / tempos.length;
      }
      
      return {
        membroId: membro.id,
        membroNome: membro.nome,
        tarefasConcluidas: conclusas.length,
        tarefasEmAndamento: emAndamento.length,
        tarefasPendentes: pendentes.length,
        tempoMedio: tempoMedio,
      };
    });
    
    const estatisticas = {
      totalMembros,
      membrosAtivos,
      totalTarefas,
      tarefasPendentes,
      tarefasEmAndamento,
      tarefasConcluidas,
      tarefasAtrasadas,
      taxaConclusao,
      tempoMedioConclusao,
      produtividadePorMembro,
    };
    
    console.log(`Estatísticas geradas para usuário ${userId}`);
    return estatisticas;
  } catch (error) {
    console.error('Erro ao gerar estatísticas:', error);
    throw new Error(`Erro ao gerar estatísticas: ${error}`);
  }
}
