import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Supabase client com service role
const getSupabaseAdmin = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Supabase client com anon key para auth
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );
};

// Middleware para verificar autenticação
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken) {
    return c.json({ error: 'Unauthorized - No token provided' }, 401);
  }

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return c.json({ error: 'Unauthorized - Invalid token' }, 401);
  }

  c.set('userId', user.id);
  c.set('user', user);
  await next();
};

// ============================================
// ROTAS DE AUTENTICAÇÃO
// ============================================

// Signup
app.post('/make-server-b2d55462/auth/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, nome, telefone, tipoConta, cidade, estado, cep } = body;

    if (!email || !password || !nome || !tipoConta) {
      return c.json({ error: 'Campos obrigatórios: email, password, nome, tipoConta' }, 400);
    }

    const supabase = getSupabaseAdmin();

    // Criar usuário
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Confirmar email automaticamente (sem servidor de email configurado)
      user_metadata: {
        nome,
        telefone,
        tipoConta,
        cidade,
        estado,
        cep,
      },
    });

    if (error) {
      console.error('Erro ao criar usuário:', error);
      return c.json({ error: error.message }, 400);
    }

    // Salvar dados adicionais no KV
    const userId = data.user.id;
    await kv.set(`user:${userId}:profile`, {
      userId,
      nome,
      email,
      telefone,
      tipoConta,
      cidade,
      estado,
      cep,
      createdAt: new Date().toISOString(),
    });

    // Fazer login automático
    const supabaseClient = getSupabaseClient();
    const { data: sessionData, error: loginError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      console.error('Erro ao fazer login após cadastro:', loginError);
      return c.json({ 
        success: true, 
        message: 'Usuário criado com sucesso. Faça login.',
        user: data.user 
      });
    }

    return c.json({
      success: true,
      user: sessionData.user,
      session: sessionData.session,
      accessToken: sessionData.session.access_token,
    });

  } catch (error) {
    console.error('Erro no signup:', error);
    return c.json({ error: 'Erro ao criar conta' }, 500);
  }
});

// Login
app.post('/make-server-b2d55462/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Email e senha são obrigatórios' }, 400);
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Erro ao fazer login:', error);
      return c.json({ error: 'Email ou senha inválidos' }, 401);
    }

    return c.json({
      success: true,
      user: data.user,
      session: data.session,
      accessToken: data.session.access_token,
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return c.json({ error: 'Erro ao fazer login' }, 500);
  }
});

// Verificar sessão
app.get('/make-server-b2d55462/auth/session', requireAuth, async (c) => {
  try {
    const user = c.get('user');
    const userId = c.get('userId');

    // Buscar perfil do usuário
    const profile = await kv.get(`user:${userId}:profile`);

    return c.json({
      success: true,
      user,
      profile,
    });

  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return c.json({ error: 'Erro ao verificar sessão' }, 500);
  }
});

// Recuperar senha
app.post('/make-server-b2d55462/auth/reset-password', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    if (!email) {
      return c.json({ error: 'Email é obrigatório' }, 400);
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error('Erro ao enviar email de recuperação:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({
      success: true,
      message: 'Email de recuperação enviado com sucesso',
    });

  } catch (error) {
    console.error('Erro na recuperação de senha:', error);
    return c.json({ error: 'Erro ao enviar email de recuperação' }, 500);
  }
});

// ============================================
// ROTAS DE PERFIL
// ============================================

// Obter perfil do usuário
app.get('/make-server-b2d55462/profile', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const profile = await kv.get(`user:${userId}:profile`);

    if (!profile) {
      return c.json({ error: 'Perfil não encontrado' }, 404);
    }

    return c.json({ success: true, profile });

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return c.json({ error: 'Erro ao buscar perfil' }, 500);
  }
});

// Atualizar perfil
app.put('/make-server-b2d55462/profile', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();

    const currentProfile = await kv.get(`user:${userId}:profile`) || {};
    const updatedProfile = { ...currentProfile, ...body, updatedAt: new Date().toISOString() };

    await kv.set(`user:${userId}:profile`, updatedProfile);

    return c.json({ success: true, profile: updatedProfile });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return c.json({ error: 'Erro ao atualizar perfil' }, 500);
  }
});

// ============================================
// ROTAS DE OCORRÊNCIAS
// ============================================

// Criar ocorrência
app.post('/make-server-b2d55462/ocorrencias', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { tipo, severidade, notas, localizacao, fotos } = body;

    if (!tipo || !severidade) {
      return c.json({ error: 'Tipo e severidade são obrigatórios' }, 400);
    }

    const ocorrenciaId = crypto.randomUUID();
    const ocorrencia = {
      id: ocorrenciaId,
      userId,
      tipo,
      severidade,
      notas,
      localizacao,
      fotos: fotos || [],
      createdAt: new Date().toISOString(),
    };

    await kv.set(`ocorrencia:${ocorrenciaId}`, ocorrencia);
    
    // Adicionar à lista de ocorrências do usuário
    const userOcorrencias = await kv.get(`user:${userId}:ocorrencias`) || [];
    userOcorrencias.push(ocorrenciaId);
    await kv.set(`user:${userId}:ocorrencias`, userOcorrencias);

    return c.json({ success: true, ocorrencia });

  } catch (error) {
    console.error('Erro ao criar ocorrência:', error);
    return c.json({ error: 'Erro ao criar ocorrência' }, 500);
  }
});

// Listar ocorrências do usuário
app.get('/make-server-b2d55462/ocorrencias', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const ocorrenciaIds = await kv.get(`user:${userId}:ocorrencias`) || [];

    const ocorrencias = await Promise.all(
      ocorrenciaIds.map((id: string) => kv.get(`ocorrencia:${id}`))
    );

    return c.json({ success: true, ocorrencias: ocorrencias.filter(Boolean) });

  } catch (error) {
    console.error('Erro ao listar ocorrências:', error);
    return c.json({ error: 'Erro ao listar ocorrências' }, 500);
  }
});

// ============================================
// ROTAS DE RELATÓRIOS
// ============================================

// Criar relatório
app.post('/make-server-b2d55462/relatorios', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { tipo, titulo, descricao, clienteId, data } = body;

    if (!tipo || !titulo) {
      return c.json({ error: 'Tipo e título são obrigatórios' }, 400);
    }

    const relatorioId = crypto.randomUUID();
    const relatorio = {
      id: relatorioId,
      userId,
      tipo,
      titulo,
      descricao,
      clienteId,
      data: data || new Date().toISOString(),
      status: 'pendente',
      createdAt: new Date().toISOString(),
    };

    await kv.set(`relatorio:${relatorioId}`, relatorio);
    
    // Adicionar à lista de relatórios do usuário
    const userRelatorios = await kv.get(`user:${userId}:relatorios`) || [];
    userRelatorios.push(relatorioId);
    await kv.set(`user:${userId}:relatorios`, userRelatorios);

    return c.json({ success: true, relatorio });

  } catch (error) {
    console.error('Erro ao criar relatório:', error);
    return c.json({ error: 'Erro ao criar relatório' }, 500);
  }
});

// Listar relatórios do usuário
app.get('/make-server-b2d55462/relatorios', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const relatorioIds = await kv.get(`user:${userId}:relatorios`) || [];

    const relatorios = await Promise.all(
      relatorioIds.map((id: string) => kv.get(`relatorio:${id}`))
    );

    return c.json({ success: true, relatorios: relatorios.filter(Boolean) });

  } catch (error) {
    console.error('Erro ao listar relatórios:', error);
    return c.json({ error: 'Erro ao listar relatórios' }, 500);
  }
});

// ============================================
// ROTAS DE EVENTOS/AGENDA
// ============================================

// Criar evento
app.post('/make-server-b2d55462/eventos', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { tipo, titulo, data, hora, clienteId } = body;

    if (!tipo || !titulo || !data) {
      return c.json({ error: 'Tipo, título e data são obrigatórios' }, 400);
    }

    const eventoId = crypto.randomUUID();
    const evento = {
      id: eventoId,
      userId,
      tipo,
      titulo,
      data,
      hora,
      clienteId,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`evento:${eventoId}`, evento);
    
    // Adicionar à lista de eventos do usuário
    const userEventos = await kv.get(`user:${userId}:eventos`) || [];
    userEventos.push(eventoId);
    await kv.set(`user:${userId}:eventos`, userEventos);

    return c.json({ success: true, evento });

  } catch (error) {
    console.error('Erro ao criar evento:', error);
    return c.json({ error: 'Erro ao criar evento' }, 500);
  }
});

// Listar eventos do usuário
app.get('/make-server-b2d55462/eventos', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const eventoIds = await kv.get(`user:${userId}:eventos`) || [];

    const eventos = await Promise.all(
      eventoIds.map((id: string) => kv.get(`evento:${id}`))
    );

    return c.json({ success: true, eventos: eventos.filter(Boolean) });

  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    return c.json({ error: 'Erro ao listar eventos' }, 500);
  }
});

// ============================================
// ROTAS DE FEEDBACK
// ============================================

// Enviar feedback
app.post('/make-server-b2d55462/feedback', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { tipo, pagina, mensagem } = body;

    if (!tipo || !mensagem) {
      return c.json({ error: 'Tipo e mensagem são obrigatórios' }, 400);
    }

    const feedbackId = crypto.randomUUID();
    const feedback = {
      id: feedbackId,
      userId,
      tipo,
      pagina,
      mensagem,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`feedback:${feedbackId}`, feedback);

    return c.json({ success: true, feedback });

  } catch (error) {
    console.error('Erro ao enviar feedback:', error);
    return c.json({ error: 'Erro ao enviar feedback' }, 500);
  }
});

// ============================================
// ROTAS DE CLIMA
// ============================================

// Obter clima atual e previsão
app.get('/make-server-b2d55462/clima/previsao', requireAuth, async (c) => {
  try {
    const lat = c.req.query('lat') || '-23.5505';
    const lon = c.req.query('lon') || '-46.6333';
    const cidade = c.req.query('cidade') || 'São Paulo';

    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');
    
    if (!apiKey) {
      console.error('OPENWEATHER_API_KEY não configurada');
      return c.json({ error: 'API Key do clima não configurada' }, 500);
    }

    // Buscar clima atual
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
    const currentResponse = await fetch(currentWeatherUrl);
    
    if (!currentResponse.ok) {
      console.error('Erro ao buscar clima atual:', await currentResponse.text());
      return c.json({ error: 'Erro ao buscar dados climáticos' }, 500);
    }
    
    const currentWeather = await currentResponse.json();

    // Buscar previsão de 7 dias
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
    const forecastResponse = await fetch(forecastUrl);
    
    if (!forecastResponse.ok) {
      console.error('Erro ao buscar previsão:', await forecastResponse.text());
      return c.json({ error: 'Erro ao buscar previsão do tempo' }, 500);
    }
    
    const forecastData = await forecastResponse.json();

    // Processar previsão para 7 dias (pegar 1 registro por dia ao meio-dia)
    const dailyForecasts = forecastData.list
      .filter((item: any) => item.dt_txt.includes('12:00:00'))
      .slice(0, 7)
      .map((item: any) => ({
        date: item.dt_txt.split(' ')[0],
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        rain: item.rain ? item.rain['3h'] || 0 : 0,
      }));

    const response = {
      success: true,
      cidade,
      atual: {
        temp: Math.round(currentWeather.main.temp),
        sensacao: Math.round(currentWeather.main.feels_like),
        description: currentWeather.weather[0].description,
        icon: currentWeather.weather[0].icon,
        humidity: currentWeather.main.humidity,
        windSpeed: currentWeather.wind.speed,
        pressure: currentWeather.main.pressure,
        visibility: currentWeather.visibility,
        sunrise: currentWeather.sys.sunrise,
        sunset: currentWeather.sys.sunset,
      },
      previsao: dailyForecasts,
      timestamp: new Date().toISOString(),
    };

    return c.json(response);

  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    return c.json({ error: 'Erro ao buscar dados climáticos' }, 500);
  }
});

// Obter alertas climáticos da Embrapa
app.get('/make-server-b2d55462/clima/alertas', requireAuth, async (c) => {
  try {
    const apiKey = Deno.env.get('EMBRAPA_CLIMA_API_KEY');
    
    if (!apiKey) {
      console.log('EMBRAPA_CLIMA_API_KEY não configurada, retornando alertas simulados');
      // Retornar alertas simulados se a API não estiver configurada
      return c.json({
        success: true,
        alertas: [
          {
            tipo: 'chuva',
            severidade: 'media',
            titulo: 'Previsão de Chuva',
            mensagem: 'Possibilidade de chuva moderada nos próximos dias.',
            dataInicio: new Date().toISOString(),
            dataFim: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
        source: 'simulado',
      });
    }

    // Integração com Embrapa Clima
    // Nota: A API da Embrapa pode ter endpoints específicos que precisam ser ajustados
    const embrapaUrl = `https://api.cnptia.embrapa.br/clima/v1/alertas`;
    
    try {
      const response = await fetch(embrapaUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        console.error('Erro ao buscar alertas Embrapa:', response.status);
        throw new Error('Erro na API Embrapa');
      }

      const data = await response.json();
      
      return c.json({
        success: true,
        alertas: data.alertas || [],
        source: 'embrapa',
      });

    } catch (embrapaError) {
      console.error('Erro ao conectar com Embrapa:', embrapaError);
      // Fallback para alertas simulados
      return c.json({
        success: true,
        alertas: [
          {
            tipo: 'info',
            severidade: 'baixa',
            titulo: 'Sistema de Alertas',
            mensagem: 'Conectando com sistema de alertas climáticos...',
            dataInicio: new Date().toISOString(),
          },
        ],
        source: 'fallback',
      });
    }

  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return c.json({ error: 'Erro ao buscar alertas climáticos' }, 500);
  }
});

// Obter dados agroclimáticos
app.get('/make-server-b2d55462/clima/agroclimatico', requireAuth, async (c) => {
  try {
    const lat = c.req.query('lat') || '-23.5505';
    const lon = c.req.query('lon') || '-46.6333';

    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');
    
    if (!apiKey) {
      return c.json({ error: 'API Key do clima não configurada' }, 500);
    }

    // Buscar dados de UV e qualidade do ar
    const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const [uvResponse, airResponse] = await Promise.all([
      fetch(uvUrl),
      fetch(airUrl),
    ]);

    const uvData = uvResponse.ok ? await uvResponse.json() : null;
    const airData = airResponse.ok ? await airResponse.json() : null;

    return c.json({
      success: true,
      uv: uvData ? {
        value: uvData.value,
        nivel: uvData.value < 3 ? 'baixo' : uvData.value < 6 ? 'moderado' : uvData.value < 8 ? 'alto' : 'muito alto',
      } : null,
      qualidadeAr: airData ? {
        aqi: airData.list[0].main.aqi,
        components: airData.list[0].components,
      } : null,
      recomendacoes: [
        {
          tipo: 'aplicacao',
          mensagem: 'Condições favoráveis para aplicação de defensivos nas próximas 24h',
        },
        {
          tipo: 'irrigacao',
          mensagem: 'Umidade adequada, irrigação pode ser reduzida',
        },
      ],
    });

  } catch (error) {
    console.error('Erro ao buscar dados agroclimáticos:', error);
    return c.json({ error: 'Erro ao buscar dados agroclimáticos' }, 500);
  }
});

// ============================================
// ROTAS DE POLÍGONOS/DESENHOS
// ============================================

import * as polygonRoutes from './routes.tsx';

// Salvar polígono
app.post('/make-server-b2d55462/polygons', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    
    const result = await polygonRoutes.savePolygon(userId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao salvar polígono:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Buscar polígonos do usuário
app.get('/make-server-b2d55462/polygons', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const result = await polygonRoutes.getUserPolygons(userId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar polígonos:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar polígono
app.put('/make-server-b2d55462/polygons/:polygonId', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const polygonId = c.req.param('polygonId');
    const body = await c.req.json();
    
    const result = await polygonRoutes.updatePolygon(userId, polygonId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao atualizar polígono:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Deletar polígono
app.delete('/make-server-b2d55462/polygons/:polygonId', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const polygonId = c.req.param('polygonId');
    
    const result = await polygonRoutes.deletePolygon(userId, polygonId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao deletar polígono:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Processar arquivo KML/KMZ
app.post('/make-server-b2d55462/polygons/import-kml', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { fileContent, fileName } = body;
    
    if (!fileContent || !fileName) {
      return c.json({ error: 'Conteúdo do arquivo e nome são obrigatórios' }, 400);
    }
    
    const result = await polygonRoutes.processKMLFile(userId, fileContent, fileName);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao processar KML:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// ROTAS DE NDVI
// ============================================

// Processar NDVI para uma área
app.post('/make-server-b2d55462/ndvi/process', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { date, bounds, source, areaId } = body;
    
    if (!date || !bounds || !source || !areaId) {
      return c.json({ error: 'Parâmetros obrigatórios: date, bounds, source, areaId' }, 400);
    }
    
    console.log(`Processando NDVI - Usuário: ${userId}, Área: ${areaId}, Data: ${date}, Fonte: ${source}`);
    
    const result = await polygonRoutes.processNDVI(userId, date, bounds, source, areaId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao processar NDVI:', error);
    return c.json({ 
      error: 'Erro ao processar NDVI',
      details: error.message 
    }, 500);
  }
});

// Buscar histórico NDVI de uma área
app.get('/make-server-b2d55462/ndvi/history/:areaId', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const areaId = c.req.param('areaId');
    const period = c.req.query('period') || '30';
    
    const prefix = `ndvi:${userId}:${areaId}:`;
    const allHistory = await kv.getByPrefix(prefix);
    
    // Filtrar por período
    const daysAgo = parseInt(period);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    const filteredHistory = allHistory.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
    
    // Ordenar por data (mais antigo primeiro para gráfico)
    const sortedHistory = filteredHistory.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
    
    // Formatar para o formato esperado pelo frontend
    const formattedHistory = sortedHistory.map((item: any) => ({
      date: item.date,
      ndvi: item.averageNDVI,
      cloudCover: item.cloudCover,
      biomassaAlta: item.distribution?.veryHigh || 0,
      biomassaBaixa: item.distribution?.veryLow || 0,
    }));
    
    console.log(`Histórico NDVI recuperado: ${formattedHistory.length} registros para área ${areaId}`);
    
    return c.json({ success: true, history: formattedHistory });
  } catch (error) {
    console.error('Erro ao buscar histórico NDVI:', error);
    return c.json({ error: 'Erro ao buscar histórico NDVI' }, 500);
  }
});

// ==========================================
// ROTAS DE SCANNER DE PRAGAS
// ==========================================

import { createPestScannerRoutes } from './pest-scanner.ts';
createPestScannerRoutes(app);

// ==========================================
// ROTAS DE ANALYTICS E DASHBOARD EXECUTIVO
// ==========================================

// Buscar analytics e KPIs
app.get('/make-server-b2d55462/analytics', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const period = parseInt(c.req.query('period') || '30');
    
    console.log(`Buscando analytics para usuário ${userId}, período: ${period} dias`);
    
    // Buscar dados do usuário
    const polygons = await kv.getByPrefix(`user:${userId}:polygons:`);
    const ocorrencias = await kv.getByPrefix(`user:${userId}:ocorrencias:`);
    const eventos = await kv.getByPrefix(`user:${userId}:eventos:`);
    const checkIns = await kv.getByPrefix(`user:${userId}:checkins:`);
    const produtores = await kv.getByPrefix(`consultor:${userId}:produtor:`);
    
    // Calcular KPIs
    const totalAreas = polygons.length;
    const totalHectares = polygons.reduce((sum: number, p: any) => sum + (p.area || 0), 0);
    
    // Filtrar ocorrências por período
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - period);
    
    const recentOcorrencias = ocorrencias.filter((o: any) => {
      const createdAt = new Date(o.createdAt || o.data);
      return createdAt >= cutoffDate;
    });
    
    const ocorrenciasAtivas = recentOcorrencias.filter((o: any) => 
      o.status === 'ativa' || !o.status
    ).length;
    
    const ocorrenciasResolvidas = recentOcorrencias.filter((o: any) => 
      o.status === 'resolvida' || o.status === 'controlada'
    ).length;
    
    const taxaResolucao = recentOcorrencias.length > 0 
      ? (ocorrenciasResolvidas / recentOcorrencias.length) * 100 
      : 0;
    
    // Calcular NDVI médio (simulado por enquanto)
    const ndviMedio = 0.65 + (Math.random() * 0.2);
    
    // Produtores ativos
    const produtoresAtivos = produtores.filter((p: any) => p.ativo !== false).length;
    
    // Eventos próximos (próximos 7 dias)
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const eventosProximos = eventos.filter((e: any) => {
      const eventDate = new Date(e.data);
      return eventDate >= new Date() && eventDate <= futureDate;
    }).length;
    
    // Check-ins hoje
    const today = new Date().toISOString().split('T')[0];
    const checkInsHoje = checkIns.filter((c: any) => {
      const checkInDate = new Date(c.checkInTime).toISOString().split('T')[0];
      return checkInDate === today;
    }).length;
    
    // Alertas ativos (simulado)
    const alertasAtivos = Math.floor(Math.random() * 5);
    
    const kpis = {
      totalAreas,
      totalHectares,
      ocorrenciasAtivas,
      ocorrenciasResolvidas,
      taxaResolucao,
      ndviMedio,
      produtoresAtivos,
      eventosProximos,
      checkInsHoje,
      alertasAtivos,
    };
    
    // Time series data (últimos N dias)
    const timeSeries = [];
    for (let i = period - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Contar ocorrências neste dia
      const ocorrenciasNoDia = ocorrencias.filter((o: any) => {
        const oDate = new Date(o.createdAt || o.data).toISOString().split('T')[0];
        return oDate === dateStr;
      }).length;
      
      // Check-ins neste dia
      const checkInsNoDia = checkIns.filter((c: any) => {
        const cDate = new Date(c.checkInTime).toISOString().split('T')[0];
        return cDate === dateStr;
      }).length;
      
      timeSeries.push({
        date: dateStr.slice(5), // MM-DD
        areas: totalAreas,
        ocorrencias: ocorrenciasNoDia,
        checkIns: checkInsNoDia,
        ndvi: +(0.55 + Math.random() * 0.25).toFixed(2),
      });
    }
    
    // Distribuição de ocorrências por tipo
    const tipoCount: any = {};
    recentOcorrencias.forEach((o: any) => {
      const tipo = o.tipo || 'outros';
      if (!tipoCount[tipo]) {
        tipoCount[tipo] = { count: 0, baixa: 0, media: 0, alta: 0 };
      }
      tipoCount[tipo].count++;
      
      const sev = o.severidade || 'media';
      if (sev === 'baixa') tipoCount[tipo].baixa++;
      else if (sev === 'media') tipoCount[tipo].media++;
      else if (sev === 'alta') tipoCount[tipo].alta++;
    });
    
    const occurrenceDistribution = Object.keys(tipoCount).map(tipo => ({
      tipo: tipo.replace('-', ' '),
      count: tipoCount[tipo].count,
      severidadeBaixa: tipoCount[tipo].baixa,
      severidadeMedia: tipoCount[tipo].media,
      severidadeAlta: tipoCount[tipo].alta,
    }));
    
    // Saúde das áreas (baseado em NDVI simulado)
    const healthStatus = {
      excelente: 45 + Math.floor(Math.random() * 10),
      boa: 25 + Math.floor(Math.random() * 10),
      moderada: 15 + Math.floor(Math.random() * 10),
      ruim: 5 + Math.floor(Math.random() * 5),
    };
    
    // Top produtores
    const topProducers = produtores
      .slice(0, 5)
      .map((p: any, idx: number) => ({
        nome: p.nome || `Produtor ${idx + 1}`,
        areas: Math.floor(Math.random() * 5) + 1,
        hectares: +(Math.random() * 100 + 20).toFixed(1),
        ndviMedio: +(0.5 + Math.random() * 0.3).toFixed(2),
      }));
    
    // Atividade recente
    const recentActivity = [
      {
        type: 'area',
        message: 'Nova área cadastrada - Talhão Norte',
        timestamp: 'há 2 horas',
      },
      {
        type: 'occurrence',
        message: 'Ocorrência de praga detectada',
        timestamp: 'há 3 horas',
      },
      {
        type: 'checkin',
        message: 'Check-in realizado - Fazenda São José',
        timestamp: 'há 5 horas',
      },
      {
        type: 'ndvi',
        message: 'Análise NDVI concluída',
        timestamp: 'há 1 dia',
      },
      {
        type: 'event',
        message: 'Evento agendado para amanhã',
        timestamp: 'há 1 dia',
      },
    ];
    
    const analyticsData = {
      kpis,
      timeSeries,
      occurrenceDistribution,
      healthStatus,
      topProducers,
      recentActivity,
    };
    
    return c.json({
      success: true,
      data: analyticsData,
    });
    
  } catch (error) {
    console.error('Erro ao buscar analytics:', error);
    return c.json({ error: 'Erro ao buscar analytics' }, 500);
  }
});

// ==========================================
// ROTAS DE ALERTAS E NOTIFICAÇÕES
// ==========================================

// Salvar configurações de alertas
app.post('/make-server-b2d55462/alerts', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { alerts } = await c.req.json();
    
    const key = `alerts:${userId}`;
    await kv.set(key, alerts);
    
    console.log(`Alertas salvos para usuário ${userId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar alertas:', error);
    return c.json({ error: 'Erro ao salvar alertas' }, 500);
  }
});

// Buscar configurações de alertas
app.get('/make-server-b2d55462/alerts', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    const key = `alerts:${userId}`;
    const alerts = await kv.get(key);
    
    return c.json({ success: true, alerts: alerts || [] });
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return c.json({ error: 'Erro ao buscar alertas' }, 500);
  }
});

// Enviar notificação de teste
app.post('/make-server-b2d55462/notifications/test', requireAuth, async (c) => {
  try {
    const { channel, email, phone } = await c.req.json();
    
    if (channel === 'email' && email) {
      // Enviar email de teste
      await sendTestEmail(email);
      return c.json({ success: true, message: 'Email de teste enviado' });
    }
    
    if ((channel === 'whatsapp' || channel === 'both') && phone) {
      // Enviar WhatsApp de teste
      await sendTestWhatsApp(phone);
      return c.json({ success: true, message: 'WhatsApp de teste enviado' });
    }
    
    return c.json({ error: 'Canal ou destino inválido' }, 400);
  } catch (error) {
    console.error('Erro ao enviar teste:', error);
    return c.json({ error: 'Erro ao enviar notificação de teste' }, 500);
  }
});

// Enviar previsão do tempo
app.post('/make-server-b2d55462/notifications/weather', requireAuth, async (c) => {
  try {
    const { channel, email, phone, location } = await c.req.json();
    
    // Buscar dados do tempo (simulados aqui, você pode integrar com API real)
    const weatherData = await getWeatherForecast(location || 'São Paulo, BR');
    
    if (channel === 'email' && email) {
      await sendWeatherEmail(email, weatherData);
    }
    
    if (channel === 'whatsapp' && phone) {
      await sendWeatherWhatsApp(phone, weatherData);
    }
    
    if (channel === 'both' && email && phone) {
      await Promise.all([
        sendWeatherEmail(email, weatherData),
        sendWeatherWhatsApp(phone, weatherData)
      ]);
    }
    
    return c.json({ success: true, message: 'Previsão enviada com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar previsão:', error);
    return c.json({ error: 'Erro ao enviar previsão do tempo' }, 500);
  }
});

// Enviar alerta NDVI
app.post('/make-server-b2d55462/notifications/ndvi-alert', requireAuth, async (c) => {
  try {
    const { channel, email, phone, ndviData, areaName } = await c.req.json();
    
    if (channel === 'email' && email) {
      await sendNDVIAlertEmail(email, ndviData, areaName);
    }
    
    if (channel === 'whatsapp' && phone) {
      await sendNDVIAlertWhatsApp(phone, ndviData, areaName);
    }
    
    if (channel === 'both' && email && phone) {
      await Promise.all([
        sendNDVIAlertEmail(email, ndviData, areaName),
        sendNDVIAlertWhatsApp(phone, ndviData, areaName)
      ]);
    }
    
    return c.json({ success: true, message: 'Alerta NDVI enviado' });
  } catch (error) {
    console.error('Erro ao enviar alerta NDVI:', error);
    return c.json({ error: 'Erro ao enviar alerta NDVI' }, 500);
  }
});

// ==========================================
// FUNÇÕES AUXILIARES DE NOTIFICAÇÃO
// ==========================================

async function sendTestEmail(email: string) {
  console.log(`[EMAIL TEST] Enviando para ${email}`);
  
  // Se tiver RESEND_API_KEY configurada, enviar email real
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (resendApiKey) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SoloForte <noreply@soloforte.com>',
        to: [email],
        subject: '✅ Teste de Notificação - SoloForte',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #0057FF 0%, #0046CC 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; font-size: 28px;">✅ Teste Bem-Sucedido!</h1>
            </div>
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Parabéns! Seu sistema de notificações por email está funcionando perfeitamente.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #374151;">
                Agora você receberá:
              </p>
              <ul style="font-size: 16px; line-height: 1.8; color: #374151;">
                <li>📊 Alertas de NDVI automáticos</li>
                <li>☁️ Previsão do tempo diária</li>
                <li>📈 Relatórios de vegetação</li>
                <li>⚠️ Avisos de condições críticas</li>
              </ul>
              <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-left: 4px solid #0057FF; border-radius: 8px;">
                <p style="margin: 0; color: #1e40af; font-size: 14px;">
                  <strong>💡 Dica:</strong> Configure seus alertas no app para receber notificações personalizadas!
                </p>
              </div>
            </div>
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
              <p>SoloForte - Transformando complexidade em decisões simples e produtivas 🌱</p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar email via Resend');
    }
    
    console.log('[EMAIL] Enviado via Resend com sucesso');
  } else {
    console.log('[EMAIL] RESEND_API_KEY não configurada. Email simulado.');
  }
}

async function sendTestWhatsApp(phone: string) {
  console.log(`[WHATSAPP TEST] Enviando para ${phone}`);
  
  // Se tiver Twilio configurado, enviar WhatsApp real
  const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const twilioWhatsAppNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER');
  
  if (twilioAccountSid && twilioAuthToken && twilioWhatsAppNumber) {
    const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
    
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: `whatsapp:${twilioWhatsAppNumber}`,
          To: `whatsapp:${phone}`,
          Body: `✅ *Teste Bem-Sucedido!*\n\n` +
                `Seu sistema de notificações WhatsApp do SoloForte está funcionando!\n\n` +
                `Você receberá:\n` +
                `📊 Alertas NDVI automáticos\n` +
                `☁️ Previsão do tempo\n` +
                `⚠️ Avisos críticos\n\n` +
                `🌱 SoloForte - Tecnologia no campo`,
        }).toString(),
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao enviar WhatsApp via Twilio');
    }
    
    console.log('[WHATSAPP] Enviado via Twilio com sucesso');
  } else {
    console.log('[WHATSAPP] Twilio não configurado. WhatsApp simulado.');
  }
}

async function getWeatherForecast(location: string) {
  // Dados simulados - você pode integrar com API real aqui
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    return {
      day: days[date.getDay()],
      date: `${date.getDate()}/${date.getMonth() + 1}`,
      temp_max: Math.round(25 + Math.random() * 10),
      temp_min: Math.round(15 + Math.random() * 8),
      condition: ['sol', 'nublado', 'chuva', 'sol'][Math.floor(Math.random() * 4)],
      humidity: Math.round(50 + Math.random() * 40),
      rain_chance: Math.round(Math.random() * 100),
    };
  });
}

async function sendWeatherEmail(email: string, weatherData: any[]) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.log('[EMAIL] RESEND_API_KEY não configurada');
    return;
  }

  const weatherHTML = generateWeatherHTML(weatherData);
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SoloForte <noreply@soloforte.com>',
      to: [email],
      subject: `☁️ Previsão do Tempo - ${new Date().toLocaleDateString('pt-BR')}`,
      html: weatherHTML,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar email de previsão');
  }
  
  console.log('[EMAIL] Previsão do tempo enviada');
}

async function sendWeatherWhatsApp(phone: string, weatherData: any[]) {
  const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const twilioWhatsAppNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER');
  
  if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppNumber) {
    console.log('[WHATSAPP] Twilio não configurado');
    return;
  }

  const weatherText = generateWeatherText(weatherData);
  const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
  
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: `whatsapp:${twilioWhatsAppNumber}`,
        To: `whatsapp:${phone}`,
        Body: weatherText,
      }).toString(),
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao enviar WhatsApp de previsão');
  }
  
  console.log('[WHATSAPP] Previsão do tempo enviada');
}

function generateWeatherHTML(weatherData: any[]): string {
  const weatherCards = weatherData.map(day => {
    const icon = day.condition === 'sol' ? '☀️' : 
                 day.condition === 'chuva' ? '🌧️' : 
                 day.condition === 'nublado' ? '☁️' : '🌤️';
    
    return `
      <div style="background: #f9fafb; padding: 20px; border-radius: 12px; text-align: center; border: 2px solid #e5e7eb;">
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 5px;">${day.day}</div>
        <div style="font-size: 12px; color: #9ca3af; margin-bottom: 10px;">${day.date}</div>
        <div style="font-size: 48px; margin: 10px 0;">${icon}</div>
        <div style="font-size: 24px; font-weight: 700; color: #0057FF; margin: 10px 0;">
          ${day.temp_max}°
        </div>
        <div style="font-size: 14px; color: #6b7280;">
          min ${day.temp_min}°
        </div>
        <div style="margin-top: 10px; font-size: 12px; color: #6b7280;">
          💧 ${day.rain_chance}% chuva
        </div>
      </div>
    `;
  }).join('');

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Previsão do Tempo - SoloForte</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f3f4f6;">
  <div style="max-width: 700px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #0057FF 0%, #0046CC 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
      <h1 style="margin: 0 0 10px 0; font-size: 28px;">☁️ Previsão do Tempo</h1>
      <p style="margin: 0; font-size: 16px; opacity: 0.9;">Próximos 7 dias</p>
    </div>
    
    <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px; margin-bottom: 30px;">
        ${weatherCards}
      </div>
      
      <div style="background: #f0f9ff; border-left: 4px solid #0057FF; padding: 20px; border-radius: 8px;">
        <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600;">💡 Recomendações:</p>
        <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
          <li>Programe suas atividades considerando a previsão</li>
          <li>Evite aplicações em dias de chuva</li>
          <li>Aproveite dias de sol para operações no campo</li>
        </ul>
      </div>
    </div>
    
    <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
      <p style="margin: 0; color: #6b7280; font-size: 12px;">
        <strong>SoloForte</strong> - Transformando complexidade em decisões simples e produtivas 🌱
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateWeatherText(weatherData: any[]): string {
  const days = weatherData.slice(0, 5).map(day => {
    const icon = day.condition === 'sol' ? '☀️' : 
                 day.condition === 'chuva' ? '🌧️' : 
                 day.condition === 'nublado' ? '☁️' : '🌤️';
    
    return `${day.day} ${day.date}: ${icon} ${day.temp_max}°/${day.temp_min}° - ${day.rain_chance}% chuva`;
  }).join('\n');

  return `☁️ *Previsão do Tempo - SoloForte*\n\n${days}\n\n💡 *Dica:* Programe suas atividades considerando a previsão!\n\n🌱 SoloForte`;
}

async function sendNDVIAlertEmail(email: string, ndviData: any, areaName: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.log('[EMAIL] RESEND_API_KEY não configurada');
    return;
  }

  const alertHTML = generateNDVIAlertHTML(ndviData, areaName);
  
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'SoloForte <noreply@soloforte.com>',
      to: [email],
      subject: `⚠️ Alerta NDVI - ${areaName}`,
      html: alertHTML,
    }),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar email de alerta NDVI');
  }
  
  console.log('[EMAIL] Alerta NDVI enviado');
}

async function sendNDVIAlertWhatsApp(phone: string, ndviData: any, areaName: string) {
  const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const twilioWhatsAppNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER');
  
  if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppNumber) {
    console.log('[WHATSAPP] Twilio não configurado');
    return;
  }

  const alertText = generateNDVIAlertText(ndviData, areaName);
  const credentials = btoa(`${twilioAccountSid}:${twilioAuthToken}`);
  
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: `whatsapp:${twilioWhatsAppNumber}`,
        To: `whatsapp:${phone}`,
        Body: alertText,
      }).toString(),
    }
  );

  if (!response.ok) {
    throw new Error('Erro ao enviar WhatsApp de alerta NDVI');
  }
  
  console.log('[WHATSAPP] Alerta NDVI enviado');
}

function generateNDVIAlertHTML(ndviData: any, areaName: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Alerta NDVI - ${areaName}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f9fafb;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; padding: 30px; text-align: center;">
      <h1 style="margin: 0 0 10px 0; font-size: 28px;">⚠️ Alerta NDVI</h1>
      <p style="margin: 0; font-size: 18px; font-weight: 600;">${areaName}</p>
    </div>
    
    <div style="padding: 30px;">
      <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px 0; color: #92400E; font-weight: 600; font-size: 16px;">
          Vegetação abaixo do esperado detectada
        </p>
        <p style="margin: 0; color: #78350F; font-size: 14px;">
          NDVI Médio: <strong>${ndviData.averageNDVI.toFixed(3)}</strong>
        </p>
      </div>
      
      <h3 style="margin: 20px 0 10px 0;">📊 Recomendações:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.8;">
        <li>Verificar sistema de irrigação</li>
        <li>Avaliar necessidade de nutrientes</li>
        <li>Inspecionar campo para pragas/doenças</li>
        <li>Considerar análise de solo</li>
      </ul>
      
      <div style="margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #1e40af; font-size: 14px;">
          Acesse o SoloForte para análise detalhada e relatórios completos
        </p>
      </div>
    </div>
    
    <div style="background: #f3f4f6; padding: 20px; text-align: center;">
      <p style="margin: 0; color: #6b7280; font-size: 12px;">
        <strong>SoloForte</strong> - Monitoramento inteligente da sua lavoura 🌱
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateNDVIAlertText(ndviData: any, areaName: string): string {
  return `⚠️ *Alerta NDVI - ${areaName}*\n\n` +
         `Vegetação abaixo do esperado detectada!\n\n` +
         `📊 NDVI Médio: *${ndviData.averageNDVI.toFixed(3)}*\n\n` +
         `🔍 *Recomendações:*\n` +
         `• Verificar irrigação\n` +
         `• Avaliar nutrientes\n` +
         `• Inspecionar pragas\n` +
         `• Análise de solo\n\n` +
         `🌱 SoloForte - Acesse o app para detalhes`;
}

// ==========================================
// ROTAS DE CHECK-IN/CHECK-OUT
// ==========================================

// Check-in
app.post('/make-server-b2d55462/visits/checkin', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { location, notes, photo } = await c.req.json();
    
    const visit = {
      id: Date.now().toString(),
      userId,
      type: 'checkin',
      timestamp: new Date().toISOString(),
      location,
      notes,
      photo
    };
    
    // Salvar visita ativa
    const activeKey = `visits:active:${userId}`;
    await kv.set(activeKey, visit);
    
    // Adicionar ao histórico
    const historyKey = `visits:history:${userId}`;
    const history = await kv.get(historyKey) || [];
    history.push(visit);
    await kv.set(historyKey, history);
    
    console.log(`Check-in realizado: ${visit.id}`);
    
    return c.json({ success: true, visit });
  } catch (error) {
    console.error('Erro no check-in:', error);
    return c.json({ error: 'Erro ao fazer check-in' }, 500);
  }
});

// Check-out
app.post('/make-server-b2d55462/visits/checkout', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { visitId, location, notes, photo, duration } = await c.req.json();
    
    // Remover visita ativa
    const activeKey = `visits:active:${userId}`;
    await kv.del(activeKey);
    
    // Atualizar histórico com check-out
    const historyKey = `visits:history:${userId}`;
    const history = await kv.get(historyKey) || [];
    
    const checkoutVisit = {
      id: visitId,
      userId,
      type: 'checkout',
      timestamp: new Date().toISOString(),
      location,
      notes,
      photo,
      duration
    };
    
    history.push(checkoutVisit);
    await kv.set(historyKey, history);
    
    console.log(`Check-out realizado: ${visitId}, duração: ${duration}min`);
    
    return c.json({ success: true, visit: checkoutVisit });
  } catch (error) {
    console.error('Erro no check-out:', error);
    return c.json({ error: 'Erro ao fazer check-out' }, 500);
  }
});

// Buscar visita ativa
app.get('/make-server-b2d55462/visits/active', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const activeKey = `visits:active:${userId}`;
    const visit = await kv.get(activeKey);
    
    return c.json({ success: true, visit: visit || null });
  } catch (error) {
    console.error('Erro ao buscar visita ativa:', error);
    return c.json({ error: 'Erro ao buscar visita ativa' }, 500);
  }
});

// Buscar histórico de visitas
app.get('/make-server-b2d55462/visits/history', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const historyKey = `visits:history:${userId}`;
    const history = await kv.get(historyKey) || [];
    
    // Ordenar por mais recente
    const sorted = history.sort((a: any, b: any) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    return c.json({ success: true, visits: sorted });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return c.json({ error: 'Erro ao buscar histórico' }, 500);
  }
});

// Health check
app.get('/make-server-b2d55462/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================
// ROTAS DE PRODUTORES
// ============================================

// Listar produtores do consultor
app.get('/make-server-b2d55462/produtores', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const result = await polygonRoutes.getProdutoresByConsultor(consultorId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao listar produtores:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Buscar produtor específico
app.get('/make-server-b2d55462/produtores/:produtorId', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const produtorId = c.req.param('produtorId');
    const result = await polygonRoutes.getProdutor(consultorId, produtorId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar produtor:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Criar ou atualizar produtor
app.post('/make-server-b2d55462/produtores', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const body = await c.req.json();
    const result = await polygonRoutes.saveProdutor(consultorId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao salvar produtor:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar produtor
app.put('/make-server-b2d55462/produtores/:produtorId', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const produtorId = c.req.param('produtorId');
    const body = await c.req.json();
    const result = await polygonRoutes.saveProdutor(consultorId, { ...body, id: produtorId });
    return c.json(result);
  } catch (error) {
    console.error('Erro ao atualizar produtor:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Deletar produtor
app.delete('/make-server-b2d55462/produtores/:produtorId', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const produtorId = c.req.param('produtorId');
    const result = await polygonRoutes.deleteProdutor(consultorId, produtorId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao deletar produtor:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Sincronizar produtores do sistema externo
app.post('/make-server-b2d55462/produtores/sync', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const { apiUrl, apiToken } = await c.req.json();
    
    if (!apiUrl) {
      return c.json({ error: 'URL da API é obrigatória' }, 400);
    }
    
    const result = await polygonRoutes.syncProdutoresFromExternalSystem(consultorId, apiUrl, apiToken);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao sincronizar produtores:', error);
    return c.json({ 
      error: 'Erro ao sincronizar produtores', 
      details: error.message 
    }, 500);
  }
});

// Buscar talhões de um produtor
app.get('/make-server-b2d55462/produtores/:produtorId/talhoes', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const produtorId = c.req.param('produtorId');
    const result = await polygonRoutes.getTalhoesProdutor(consultorId, produtorId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar talhões:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Criar/atualizar talhão de um produtor
app.post('/make-server-b2d55462/produtores/:produtorId/talhoes', requireAuth, async (c) => {
  try {
    const consultorId = c.get('userId');
    const produtorId = c.req.param('produtorId');
    const body = await c.req.json();
    const result = await polygonRoutes.saveTalhao(consultorId, produtorId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao salvar talhão:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ============================================
// ROTAS DE NOTIFICAÇÕES
// ============================================

// Criar notificação
app.post('/make-server-b2d55462/notifications', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const body = await c.req.json();
    const { type, priority, title, bodyText, icon, image, data, actionUrl } = body;

    if (!title || !bodyText) {
      return c.json({ error: 'Título e corpo são obrigatórios' }, 400);
    }

    const notificationId = `notif_${userId}_${Date.now()}`;
    const key = `user:${userId}:notifications:${notificationId}`;
    
    const notification = {
      id: notificationId,
      userId,
      type: type || 'geral',
      priority: priority || 'normal',
      title,
      body: bodyText,
      icon,
      image,
      data,
      actionUrl,
      timestamp: Date.now(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    await kv.set(key, notification);
    
    console.log(`Notificação criada: ${notificationId} para usuário ${userId}`);
    return c.json({ success: true, notification });

  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    return c.json({ error: 'Erro ao criar notificação' }, 500);
  }
});

// Listar notificações do usuário
app.get('/make-server-b2d55462/notifications', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const prefix = `user:${userId}:notifications:`;
    const notifications = await kv.getByPrefix(prefix);
    
    // Ordenar por timestamp (mais recentes primeiro)
    const sorted = notifications.sort((a: any, b: any) => b.timestamp - a.timestamp);
    
    console.log(`Notificações recuperadas para usuário ${userId}: ${sorted.length}`);
    return c.json({ success: true, notifications: sorted });

  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return c.json({ error: 'Erro ao buscar notificações' }, 500);
  }
});

// Marcar notificação como lida
app.patch('/make-server-b2d55462/notifications/:id/read', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const notificationId = c.req.param('id');
    
    const key = `user:${userId}:notifications:${notificationId}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      return c.json({ error: 'Notificação não encontrada' }, 404);
    }

    const updated = {
      ...existing,
      read: true,
      readAt: new Date().toISOString(),
    };

    await kv.set(key, updated);
    
    console.log(`Notificação marcada como lida: ${notificationId}`);
    return c.json({ success: true, notification: updated });

  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    return c.json({ error: 'Erro ao marcar notificação como lida' }, 500);
  }
});

// Deletar notificação
app.delete('/make-server-b2d55462/notifications/:id', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const notificationId = c.req.param('id');
    
    const key = `user:${userId}:notifications:${notificationId}`;
    await kv.del(key);
    
    console.log(`Notificação deletada: ${notificationId}`);
    return c.json({ success: true });

  } catch (error) {
    console.error('Erro ao deletar notificação:', error);
    return c.json({ error: 'Erro ao deletar notificação' }, 500);
  }
});

// Limpar todas as notificações lidas
app.delete('/make-server-b2d55462/notifications/clear-read', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const prefix = `user:${userId}:notifications:`;
    const notifications = await kv.getByPrefix(prefix);
    
    // Deletar apenas as lidas
    const readNotifications = notifications.filter((n: any) => n.read);
    for (const notif of readNotifications) {
      const key = `user:${userId}:notifications:${notif.id}`;
      await kv.del(key);
    }
    
    console.log(`${readNotifications.length} notificações lidas deletadas para usuário ${userId}`);
    return c.json({ success: true, deleted: readNotifications.length });

  } catch (error) {
    console.error('Erro ao limpar notificações lidas:', error);
    return c.json({ error: 'Erro ao limpar notificações lidas' }, 500);
  }
});

// ==========================================
// ROTAS DE ALERTAS AUTOMÁTICOS
// ==========================================

// Rota para alertas climáticos (para sistema de alertas automáticos)
app.get('/make-server-b2d55462/climate/alerts', requireAuth, async (c) => {
  try {
    // Por enquanto retornar array vazio - pode ser expandido futuramente
    // com integração real de APIs climáticas
    return c.json({
      success: true,
      alerts: []
    });
  } catch (error) {
    console.error('Erro ao buscar alertas climáticos:', error);
    return c.json({ error: 'Erro ao buscar alertas climáticos' }, 500);
  }
});

// Rota para ocorrências pendentes (para sistema de alertas automáticos)
app.get('/make-server-b2d55462/occurrences/pending', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const ocorrenciaIds = await kv.get(`user:${userId}:ocorrencias`) || [];

    const ocorrencias = await Promise.all(
      ocorrenciaIds.map(async (id: string) => {
        const ocorrencia = await kv.get(`ocorrencia:${id}`);
        if (!ocorrencia) return null;

        // Calcular dias em aberto
        const createdAt = new Date(ocorrencia.createdAt);
        const now = new Date();
        const daysOpen = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

        return {
          id: ocorrencia.id,
          type: ocorrencia.tipo,
          severity: ocorrencia.severidade,
          description: ocorrencia.notas || '',
          location: ocorrencia.localizacao || 'Local não especificado',
          daysOpen,
          isUrgent: ocorrencia.severidade >= 70
        };
      })
    );

    return c.json({
      success: true,
      occurrences: ocorrencias.filter(Boolean)
    });
  } catch (error) {
    console.error('Erro ao buscar ocorrências pendentes:', error);
    return c.json({ error: 'Erro ao buscar ocorrências pendentes' }, 500);
  }
});

// Rota para check-ins vencidos (para sistema de alertas automáticos)
app.get('/make-server-b2d55462/checkins/overdue', requireAuth, async (c) => {
  try {
    // Por enquanto retornar array vazio - pode ser expandido futuramente
    // com lógica de check-ins vencidos baseada em visitas programadas
    return c.json({
      success: true,
      overdueCheckins: []
    });
  } catch (error) {
    console.error('Erro ao buscar check-ins vencidos:', error);
    return c.json({ error: 'Erro ao buscar check-ins vencidos' }, 500);
  }
});

// Rota para tarefas vencidas (para sistema de alertas automáticos)
app.get('/make-server-b2d55462/tasks/due', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const eventoIds = await kv.get(`user:${userId}:eventos`) || [];

    const eventos = await Promise.all(
      eventoIds.map(async (id: string) => {
        const evento = await kv.get(`evento:${id}`);
        if (!evento) return null;

        // Verificar se a data do evento já passou
        const eventDate = new Date(evento.data);
        const now = new Date();
        const isOverdue = eventDate < now;

        // Se vence em até 3 dias ou já venceu
        const daysUntilDue = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0;

        if (isOverdue || isDueSoon) {
          return {
            id: evento.id,
            title: evento.titulo,
            dueDate: evento.data,
            isOverdue,
            farmName: 'Fazenda' // Pode ser expandido com dados reais
          };
        }

        return null;
      })
    );

    return c.json({
      success: true,
      dueTasks: eventos.filter(Boolean)
    });
  } catch (error) {
    console.error('Erro ao buscar tarefas vencidas:', error);
    return c.json({ error: 'Erro ao buscar tarefas vencidas' }, 500);
  }
});

// Rota para relatórios prontos (para sistema de alertas automáticos)
app.get('/make-server-b2d55462/reports/ready', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const relatorioIds = await kv.get(`user:${userId}:relatorios`) || [];

    const relatorios = await Promise.all(
      relatorioIds.map(async (id: string) => {
        const relatorio = await kv.get(`relatorio:${id}`);
        if (!relatorio || relatorio.status !== 'concluido') return null;

        return {
          id: relatorio.id,
          title: relatorio.titulo,
          type: relatorio.tipo,
          farmName: 'Fazenda', // Pode ser expandido com dados reais
          generatedAt: relatorio.createdAt
        };
      })
    );

    return c.json({
      success: true,
      readyReports: relatorios.filter(Boolean)
    });
  } catch (error) {
    console.error('Erro ao buscar relatórios prontos:', error);
    return c.json({ error: 'Erro ao buscar relatórios prontos' }, 500);
  }
});

// ==========================================
// ROTAS DE GESTÃO DE EQUIPES E TAREFAS
// ==========================================

import {
  getMembrosEquipe,
  addMembroEquipe,
  updateMembroEquipe,
  deleteMembroEquipe,
  getTarefasEquipe,
  addTarefaEquipe,
  updateTarefaEquipe,
  deleteTarefaEquipe,
  getEstatisticasEquipe,
} from './routes.tsx';

// Listar membros da equipe
app.get('/make-server-b2d55462/equipes/membros', async (c) => {
  try {
    const userId = 'demo_user'; // Usar userId real em produção
    const result = await getMembrosEquipe(userId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar membros:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Adicionar membro
app.post('/make-server-b2d55462/equipes/membros', async (c) => {
  try {
    const userId = 'demo_user';
    const body = await c.req.json();
    const result = await addMembroEquipe(userId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao adicionar membro:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar membro
app.put('/make-server-b2d55462/equipes/membros/:id', async (c) => {
  try {
    const userId = 'demo_user';
    const membroId = c.req.param('id');
    const body = await c.req.json();
    const result = await updateMembroEquipe(userId, membroId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Remover membro
app.delete('/make-server-b2d55462/equipes/membros/:id', async (c) => {
  try {
    const userId = 'demo_user';
    const membroId = c.req.param('id');
    const result = await deleteMembroEquipe(userId, membroId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao remover membro:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Listar tarefas
app.get('/make-server-b2d55462/equipes/tarefas', async (c) => {
  try {
    const userId = 'demo_user';
    const filtros = {
      membroId: c.req.query('membroId'),
      status: c.req.query('status'),
      prioridade: c.req.query('prioridade'),
      tipo: c.req.query('tipo'),
      dataInicio: c.req.query('dataInicio'),
      dataFim: c.req.query('dataFim'),
    };
    const result = await getTarefasEquipe(userId, filtros);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Adicionar tarefa
app.post('/make-server-b2d55462/equipes/tarefas', async (c) => {
  try {
    const userId = 'demo_user';
    const body = await c.req.json();
    const result = await addTarefaEquipe(userId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Atualizar tarefa
app.put('/make-server-b2d55462/equipes/tarefas/:id', async (c) => {
  try {
    const userId = 'demo_user';
    const tarefaId = c.req.param('id');
    const body = await c.req.json();
    const result = await updateTarefaEquipe(userId, tarefaId, body);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Remover tarefa
app.delete('/make-server-b2d55462/equipes/tarefas/:id', async (c) => {
  try {
    const userId = 'demo_user';
    const tarefaId = c.req.param('id');
    const result = await deleteTarefaEquipe(userId, tarefaId);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Buscar estatísticas da equipe
app.get('/make-server-b2d55462/equipes/estatisticas', async (c) => {
  try {
    const userId = 'demo_user';
    const periodo = c.req.query('periodo');
    const result = await getEstatisticasEquipe(userId, periodo);
    return c.json(result);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return c.json({ error: error.message }, 500);
  }
});

// ==========================================
// ROTAS DE CHAT/SUPORTE IN-APP
// ==========================================

// Buscar ou criar sessão de chat
app.get('/make-server-b2d55462/chat/session', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    
    // Buscar sessão ativa
    let session = await kv.get(`chat:session:${userId}`);
    
    if (!session) {
      // Criar nova sessão
      const sessionId = crypto.randomUUID();
      session = {
        id: sessionId,
        userId,
        status: 'open',
        createdAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
      };
      
      await kv.set(`chat:session:${userId}`, session);
      
      // Mensagem de boas-vindas
      const welcomeMessage = {
        id: crypto.randomUUID(),
        senderId: 'system',
        senderName: 'SoloForte',
        senderType: 'support',
        message: 'Olá! 👋 Bem-vindo ao suporte SoloForte. Como posso ajudá-lo hoje?',
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      await kv.set(`chat:${sessionId}:msg:${welcomeMessage.id}`, welcomeMessage);
      
      return c.json({
        success: true,
        session,
        messages: [welcomeMessage],
      });
    }
    
    // Buscar mensagens da sessão
    const messagesPrefix = `chat:${session.id}:msg:`;
    const messages = await kv.getByPrefix(messagesPrefix);
    
    // Ordenar por timestamp
    messages.sort((a: any, b: any) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    return c.json({
      success: true,
      session,
      messages,
    });
    
  } catch (error) {
    console.error('Erro ao buscar sessão de chat:', error);
    return c.json({ error: 'Erro ao buscar sessão de chat' }, 500);
  }
});

// Enviar mensagem
app.post('/make-server-b2d55462/chat/send', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const user = c.get('user');
    const { message, attachments, sessionId } = await c.req.json();
    
    if (!message?.trim() && (!attachments || attachments.length === 0)) {
      return c.json({ error: 'Mensagem ou anexo é obrigatório' }, 400);
    }
    
    // Buscar ou criar sessão
    let session = await kv.get(`chat:session:${userId}`);
    
    if (!session || (sessionId && session.id !== sessionId)) {
      const newSessionId = crypto.randomUUID();
      session = {
        id: newSessionId,
        userId,
        status: 'open',
        createdAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0,
      };
      await kv.set(`chat:session:${userId}`, session);
    }
    
    // Criar mensagem
    const messageId = crypto.randomUUID();
    const newMessage = {
      id: messageId,
      senderId: userId,
      senderName: user.user_metadata?.nome || user.email || 'Você',
      senderType: 'user',
      message: message.trim(),
      attachments: attachments || [],
      timestamp: new Date().toISOString(),
      read: true, // Mensagem do usuário já é "lida" por ele
    };
    
    // Salvar mensagem
    await kv.set(`chat:${session.id}:msg:${messageId}`, newMessage);
    
    // Atualizar sessão
    session.lastMessageAt = newMessage.timestamp;
    await kv.set(`chat:session:${userId}`, session);
    
    console.log(`Mensagem enviada no chat - Usuário: ${userId}, Sessão: ${session.id}`);
    
    return c.json({
      success: true,
      message: newMessage,
      session,
    });
    
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return c.json({ error: 'Erro ao enviar mensagem' }, 500);
  }
});

// Buscar mensagens da sessão
app.get('/make-server-b2d55462/chat/messages/:sessionId', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const sessionId = c.req.param('sessionId');
    
    // Verificar se sessão pertence ao usuário
    const session = await kv.get(`chat:session:${userId}`);
    if (!session || session.id !== sessionId) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }
    
    // Buscar mensagens
    const messagesPrefix = `chat:${sessionId}:msg:`;
    const messages = await kv.getByPrefix(messagesPrefix);
    
    // Ordenar por timestamp
    messages.sort((a: any, b: any) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    return c.json({
      success: true,
      messages,
    });
    
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error);
    return c.json({ error: 'Erro ao buscar mensagens' }, 500);
  }
});

// Marcar mensagens como lidas
app.post('/make-server-b2d55462/chat/mark-read', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { sessionId } = await c.req.json();
    
    // Verificar se sessão pertence ao usuário
    const session = await kv.get(`chat:session:${userId}`);
    if (!session || session.id !== sessionId) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }
    
    // Buscar e atualizar mensagens não lidas
    const messagesPrefix = `chat:${sessionId}:msg:`;
    const messages = await kv.getByPrefix(messagesPrefix);
    
    for (const msg of messages) {
      if (!msg.read && msg.senderType === 'support') {
        msg.read = true;
        await kv.set(`chat:${sessionId}:msg:${msg.id}`, msg);
      }
    }
    
    // Atualizar contador de não lidas na sessão
    session.unreadCount = 0;
    await kv.set(`chat:session:${userId}`, session);
    
    return c.json({ success: true });
    
  } catch (error) {
    console.error('Erro ao marcar mensagens como lidas:', error);
    return c.json({ error: 'Erro ao marcar mensagens como lidas' }, 500);
  }
});

// Fechar sessão de chat
app.post('/make-server-b2d55462/chat/close', requireAuth, async (c) => {
  try {
    const userId = c.get('userId');
    const { sessionId } = await c.req.json();
    
    // Verificar se sessão pertence ao usuário
    const session = await kv.get(`chat:session:${userId}`);
    if (!session || session.id !== sessionId) {
      return c.json({ error: 'Sessão não encontrada' }, 404);
    }
    
    // Atualizar status da sessão
    session.status = 'closed';
    session.closedAt = new Date().toISOString();
    await kv.set(`chat:session:${userId}`, session);
    
    console.log(`Sessão de chat fechada - Usuário: ${userId}, Sessão: ${sessionId}`);
    
    return c.json({
      success: true,
      message: 'Sessão fechada com sucesso',
    });
    
  } catch (error) {
    console.error('Erro ao fechar sessão:', error);
    return c.json({ error: 'Erro ao fechar sessão' }, 500);
  }
});

Deno.serve(app.fetch);