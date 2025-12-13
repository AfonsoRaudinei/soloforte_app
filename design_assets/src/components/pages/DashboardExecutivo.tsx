import { useState, memo } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, MapPin, AlertTriangle, CheckCircle, Calendar, Users, Activity, RefreshCw, BarChart3 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAnalytics } from '../../utils/hooks/useAnalytics';
import { useTheme } from '../../utils/ThemeContext';
import { SkeletonCard } from '../shared';
import type { NavigateFunction } from '../../types';

interface DashboardExecutivoProps {
  navigate: NavigateFunction;
}

// Card de KPI otimizado
const KPICard = memo(function KPICard({ title, value, subtitle, icon: Icon, trend, color }: any) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${trend > 0 ? 'text-green-600 dark:text-green-500' : trend < 0 ? 'text-red-600 dark:text-red-500' : 'text-gray-500'}`}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> : trend < 0 ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-muted-foreground text-xs">{title}</h3>
        <p className="text-2xl" style={{ color }}>{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </Card>
  );
});

export default function DashboardExecutivo({ navigate }: DashboardExecutivoProps) {
  const { theme } = useTheme();
  const [period, setPeriod] = useState(30);
  const { data, loading, error, refetch } = useAnalytics(period);

  const isDark = theme === 'dark';

  // Cores do tema
  const colors = {
    primary: '#0057FF',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    purple: '#8B5CF6',
    pink: '#EC4899',
  };

  // Cores para gráficos
  const chartColors = [colors.primary, colors.success, colors.warning, colors.danger, colors.purple, colors.pink];

  if (loading) {
    return (
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg">Dashboard Executivo</h1>
              <p className="text-xs text-muted-foreground">Analytics e KPIs</p>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} height="h-28" />
            ))}
          </div>
          <SkeletonCard height="h-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <SkeletonCard height="h-64" />
            <SkeletonCard height="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-6 max-w-md w-full">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-danger" />
            <h3 className="mb-2">Erro ao Carregar Analytics</h3>
            <p className="text-muted-foreground mb-4">{error || 'Erro desconhecido'}</p>
            <Button onClick={refetch} style={{ backgroundColor: colors.primary }}>
              Tentar Novamente
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const { kpis, timeSeries, occurrenceDistribution, healthStatus, topProducers, recentActivity } = data;

  // Dados para gráfico de saúde das áreas
  const healthData = [
    { name: 'Excelente', value: healthStatus.excelente, color: colors.success },
    { name: 'Boa', value: healthStatus.boa, color: colors.primary },
    { name: 'Moderada', value: healthStatus.moderada, color: colors.warning },
    { name: 'Ruim', value: healthStatus.ruim, color: colors.danger },
  ];

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header Premium */}
      <header className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-4 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="shrink-0 hover:bg-white/50 dark:hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0057FF]" />
                Dashboard Executivo
              </h1>
              <p className="text-xs text-muted-foreground">Visão 360° do negócio</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period.toString()} onValueChange={(v) => setPeriod(Number(v))}>
              <SelectTrigger className="w-[110px] h-9 bg-white dark:bg-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="15">15 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={refetch}
              className="shrink-0 hover:bg-white/50 dark:hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Resumo Rápido */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-white/60 dark:bg-white/5 rounded-lg p-2">
            <p className="text-xl text-[#0057FF]">{kpis.totalAreas}</p>
            <p className="text-xs text-muted-foreground">Áreas</p>
          </div>
          <div className="bg-white/60 dark:bg-white/5 rounded-lg p-2">
            <p className="text-xl text-green-600">{kpis.ndviMedio.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">NDVI</p>
          </div>
          <div className="bg-white/60 dark:bg-white/5 rounded-lg p-2">
            <p className="text-xl text-orange-600">{kpis.ocorrenciasAtivas}</p>
            <p className="text-xs text-muted-foreground">Ativas</p>
          </div>
          <div className="bg-white/60 dark:bg-white/5 rounded-lg p-2">
            <p className="text-xl text-purple-600">{kpis.produtoresAtivos}</p>
            <p className="text-xs text-muted-foreground">Produtores</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scroll-smooth p-4 space-y-4 pb-32">
        {/* KPIs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <KPICard
            title="Áreas Monitoradas"
            value={kpis.totalAreas}
            subtitle={`${kpis.totalHectares.toFixed(1)} ha total`}
            icon={MapPin}
            color={colors.primary}
            trend={5}
          />
          <KPICard
            title="NDVI Médio"
            value={kpis.ndviMedio.toFixed(2)}
            subtitle="Saúde das áreas"
            icon={Activity}
            color={colors.success}
            trend={kpis.ndviMedio > 0.5 ? 3 : -2}
          />
          <KPICard
            title="Ocorrências Ativas"
            value={kpis.ocorrenciasAtivas}
            subtitle={`${kpis.taxaResolucao.toFixed(0)}% resolvidas`}
            icon={AlertTriangle}
            color={colors.warning}
            trend={-5}
          />
          <KPICard
            title="Produtores Ativos"
            value={kpis.produtoresAtivos}
            subtitle={`${kpis.eventosProximos} eventos`}
            icon={Users}
            color={colors.purple}
            trend={8}
          />
        </div>

        {/* Gráfico de Tendência - Destaque */}
        <Card className="p-4 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 border-2 border-blue-100 dark:border-blue-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <TrendingUp className="w-4 h-4 text-[#0057FF]" />
              </div>
              <span>Evolução - Últimos {period} dias</span>
            </h3>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>NDVI</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Ocorrências</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeSeries}>
              <defs>
                <linearGradient id="colorNDVI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.success} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={colors.success} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOcorrencias" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.warning} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={colors.warning} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
              <XAxis 
                dataKey="date" 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                style={{ fontSize: '10px' }}
              />
              <YAxis 
                stroke={isDark ? '#9CA3AF' : '#6B7280'}
                style={{ fontSize: '10px' }}
                width={35}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                  border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="ndvi" 
                name="NDVI"
                stroke={colors.success} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorNDVI)" 
              />
              <Area 
                type="monotone" 
                dataKey="ocorrencias" 
                name="Ocorrências"
                stroke={colors.warning} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorOcorrencias)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Distribuição de Ocorrências e Saúde das Áreas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Ocorrências por Tipo */}
          <Card className="p-4 hover:shadow-md transition-shadow">
            <h3 className="mb-3 flex items-center gap-2">
              <div className="p-1.5 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <span>Ocorrências por Tipo</span>
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={occurrenceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#E5E7EB'} />
                <XAxis 
                  dataKey="tipo" 
                  stroke={isDark ? '#9CA3AF' : '#6B7280'}
                  style={{ fontSize: '9px' }}
                />
                <YAxis 
                  stroke={isDark ? '#9CA3AF' : '#6B7280'}
                  style={{ fontSize: '10px' }}
                  width={30}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="count" fill={colors.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Saúde das Áreas */}
          <Card className="p-4 hover:shadow-md transition-shadow">
            <h3 className="mb-3 flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900 rounded-lg">
                <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span>Saúde das Áreas</span>
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelStyle={{ fontSize: '9px', fontWeight: '600' }}
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    border: `1px solid ${isDark ? '#374151' : '#E5E7EB'}`,
                    borderRadius: '8px',
                    fontSize: '11px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Produtores - Destaque */}
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <span>Top Produtores</span>
            </div>
            <span className="text-xs text-muted-foreground">Melhor desempenho</span>
          </h3>
          <div className="space-y-2">
            {topProducers.map((producer, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-muted/50 to-transparent hover:from-muted/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ 
                      backgroundColor: `${chartColors[idx % chartColors.length]}20`, 
                      color: chartColors[idx % chartColors.length],
                      border: `2px solid ${chartColors[idx % chartColors.length]}40`
                    }}
                  >
                    <span className="text-sm">#{idx + 1}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm truncate">{producer.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {producer.areas} áreas • {producer.hectares.toFixed(1)} ha
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm" style={{ color: producer.ndviMedio > 0.6 ? colors.success : colors.warning }}>
                    {producer.ndviMedio.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">NDVI</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Atividade Recente - Timeline */}
        <Card className="p-4 hover:shadow-md transition-shadow">
          <h3 className="mb-4 flex items-center gap-2">
            <div className="p-1.5 bg-pink-100 dark:bg-pink-900 rounded-lg">
              <Calendar className="w-4 h-4 text-pink-600 dark:text-pink-400" />
            </div>
            <span>Atividade Recente</span>
          </h3>
          <div className="space-y-3 relative">
            {/* Linha vertical da timeline */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
            
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 relative">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 ring-2 ring-white dark:ring-gray-900"
                  style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                >
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1 pb-2">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Métricas Adicionais - Cards Destacados */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-5 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800 hover:shadow-lg transition-all">
            <div className="inline-flex p-3 bg-green-100 dark:bg-green-900 rounded-full mb-2">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl text-green-600 dark:text-green-400 mb-1">{kpis.ocorrenciasResolvidas}</p>
            <p className="text-xs text-muted-foreground">Ocorrências Resolvidas</p>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
              ✓ {kpis.taxaResolucao.toFixed(0)}% de sucesso
            </div>
          </Card>
          <Card className="p-5 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all">
            <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-2">
              <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-3xl text-blue-600 dark:text-blue-400 mb-1">{kpis.checkInsHoje}</p>
            <p className="text-xs text-muted-foreground">Check-ins Hoje</p>
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
              📍 Monitoramento ativo
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}