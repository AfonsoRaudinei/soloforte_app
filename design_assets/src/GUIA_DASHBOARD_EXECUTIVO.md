# 📊 Guia do Dashboard Executivo

## Visão Geral

O **Dashboard Executivo** é uma página completa de analytics e KPIs criada para fornecer uma visão estratégica e consolidada de todas as operações do SoloForte. Oferece métricas importantes, gráficos interativos e insights acionáveis para tomada de decisões.

## 🎯 Funcionalidades Principais

### 1. KPIs em Tempo Real

Quatro cards principais mostrando:
- **Áreas Monitoradas**: Total de áreas e hectares cadastrados
- **NDVI Médio**: Índice de saúde geral das áreas
- **Ocorrências Ativas**: Problemas detectados e taxa de resolução
- **Produtores Ativos**: Total de produtores e eventos próximos

Cada KPI mostra:
- ✅ Valor principal
- 📊 Tendência (alta/baixa/estável)
- 📝 Subtítulo com contexto adicional
- 🎨 Ícone e cor temática

### 2. Gráficos de Tendência

**Gráfico de Área (Time Series)**
- Evolução do NDVI médio ao longo do tempo
- Número de ocorrências registradas
- Visualização em gradiente para facilitar interpretação
- Suporta períodos de 7, 15, 30, 60 ou 90 dias

### 3. Distribuição de Ocorrências

**Gráfico de Barras**
- Mostra ocorrências por tipo (pragas, doenças, plantas daninhas, etc.)
- Cores consistentes com o design do app
- Fácil identificação de problemas mais frequentes

### 4. Saúde das Áreas (NDVI)

**Gráfico Pizza/Donut**
- Distribuição de áreas por faixa de NDVI:
  - 🟢 Excelente (NDVI > 0.6)
  - 🔵 Boa (NDVI 0.4-0.6)
  - 🟡 Moderada (NDVI 0.2-0.4)
  - 🔴 Ruim (NDVI < 0.2)

### 5. Top Produtores

Lista ranqueada dos principais produtores mostrando:
- Nome do produtor
- Número de áreas gerenciadas
- Hectares totais
- NDVI médio de suas áreas

### 6. Atividade Recente

Timeline das últimas ações no sistema:
- Cadastro de novas áreas
- Detecção de ocorrências
- Check-ins realizados
- Análises NDVI concluídas
- Eventos agendados

### 7. Métricas Adicionais

Cards extras com:
- Total de ocorrências resolvidas
- Check-ins realizados hoje

## 🎨 Design e UX

### Cores Temáticas
- **Azul (#0057FF)**: Cor principal (áreas, tendências)
- **Verde (#10B981)**: Sucesso, saúde positiva
- **Laranja (#F59E0B)**: Atenção, ocorrências
- **Vermelho (#EF4444)**: Perigo, problemas críticos
- **Roxo (#8B5CF6)**: Produtores, usuários
- **Rosa (#EC4899)**: Atividades, eventos

### Responsividade
- ✅ Grid adaptativo (2 colunas em mobile, expandindo em desktop)
- ✅ Gráficos responsivos usando ResponsiveContainer
- ✅ Tamanhos de fonte otimizados para leitura em telas pequenas
- ✅ Scrolling suave com área fixa no topo

### Tema Escuro/Claro
- Suporta ambos os modos automaticamente
- Cores de gráficos ajustadas para contraste adequado
- Bordas e backgrounds adaptados ao tema

## 🔌 Integração com Backend

### Rota de Analytics
```
GET /make-server-b2d55462/analytics?period=30
```

**Parâmetros:**
- `period`: Número de dias para análise (7, 15, 30, 60, 90)

**Response:**
```json
{
  "success": true,
  "data": {
    "kpis": {
      "totalAreas": 15,
      "totalHectares": 342.5,
      "ocorrenciasAtivas": 8,
      "ocorrenciasResolvidas": 23,
      "taxaResolucao": 74.2,
      "ndviMedio": 0.68,
      "produtoresAtivos": 12,
      "eventosProximos": 5,
      "checkInsHoje": 3,
      "alertasAtivos": 2
    },
    "timeSeries": [...],
    "occurrenceDistribution": [...],
    "healthStatus": {...},
    "topProducers": [...],
    "recentActivity": [...]
  }
}
```

### Hook Customizado
```typescript
import { useAnalytics } from '../../utils/hooks/useAnalytics';

const { data, loading, error, refetch } = useAnalytics(30);
```

### Armazenamento
Os dados são calculados em tempo real a partir de:
- Polígonos salvos (`user:${userId}:polygons:*`)
- Ocorrências registradas (`user:${userId}:ocorrencias:*`)
- Eventos agendados (`user:${userId}:eventos:*`)
- Check-ins (`user:${userId}:checkins:*`)
- Produtores (`consultor:${userId}:produtor:*`)

## 🚀 Como Acessar

### Pelo Menu FAB
1. Abra o Dashboard principal (mapa)
2. Clique no botão **+** flutuante (canto inferior direito)
3. Selecione "Dashboard Executivo" (primeiro item)

### Por Navegação Direta
```javascript
navigate('/analytics')
// ou
navigate('/dashboard-executivo')
```

### Prefetch Inteligente
O componente é automaticamente pré-carregado quando:
- O usuário acessa o Dashboard principal
- O mouse passa sobre o botão no menu FAB
- O usuário toca no botão em dispositivos móveis

## 📱 Funcionalidades Mobile-First

1. **Seletor de Período** - Dropdown compacto no header
2. **Botão de Atualização** - Recarrega dados com um toque
3. **Cards Compactos** - Grid 2x2 otimizado para telas pequenas
4. **Gráficos Interativos** - Tooltips informativos ao tocar
5. **Scroll Infinito** - Navbar fixa, conteúdo rolável
6. **Loading States** - Indicadores visuais durante carregamento
7. **Error Handling** - Mensagens claras e opção de retry

## 🎯 Casos de Uso

### Para Consultores Agronômicos
- Monitorar saúde geral de todas as áreas
- Identificar tendências de NDVI
- Priorizar atendimentos baseado em ocorrências ativas
- Acompanhar performance de produtores

### Para Gestores
- Avaliar eficiência operacional (taxa de resolução)
- Monitorar volume de atividades (check-ins, eventos)
- Identificar áreas de risco (NDVI baixo)
- Analisar distribuição de problemas

### Para Produtores
- Ver resumo consolidado de suas propriedades
- Comparar performance com outros produtores
- Acompanhar evolução da saúde das áreas
- Verificar atividades recentes

## 🔧 Personalização

### Alterar Período de Análise
Use o seletor no header para escolher entre:
- 7 dias (última semana)
- 15 dias (últimas duas semanas)
- 30 dias (último mês) - padrão
- 60 dias (últimos dois meses)
- 90 dias (último trimestre)

### Atualizar Dados
Clique no ícone de refresh no header para recarregar todos os dados

## 📊 Interpretação dos Dados

### NDVI Médio
- **> 0.7**: Excelente - Vegetação muito saudável
- **0.5 - 0.7**: Bom - Vegetação saudável
- **0.3 - 0.5**: Moderado - Atenção necessária
- **< 0.3**: Crítico - Intervenção urgente

### Taxa de Resolução
- **> 80%**: Excelente performance
- **60-80%**: Bom, mas pode melhorar
- **< 60%**: Precisa atenção urgente

### Tendências
- **↗ Verde**: Melhoria - Continue assim!
- **↘ Vermelho**: Piora - Ação necessária
- **→ Cinza**: Estável - Manter monitoramento

## 🏆 Melhores Práticas

1. **Acesse Diariamente** - Mantenha-se atualizado sobre todas as operações
2. **Analise Tendências** - Não olhe apenas valores pontuais
3. **Compare Períodos** - Alterne entre 30 e 90 dias para perspectiva ampla
4. **Monitore Top Produtores** - Aprenda com os melhores
5. **Aja Sobre Alertas** - Ocorrências ativas precisam resolução

## 🎨 Bibliotecas Utilizadas

- **Recharts**: Gráficos interativos e responsivos
- **Lucide React**: Ícones modernos e consistentes
- **Tailwind CSS**: Estilização utilitária e responsiva
- **ShadCN UI**: Componentes base (Card, Select, Button)

## 🔐 Segurança

- ✅ Requer autenticação (middleware `requireAuth`)
- ✅ Dados isolados por usuário (`userId` do token)
- ✅ Nenhum dado sensível exposto no frontend
- ✅ Rate limiting no backend (via Supabase)

## 🚀 Performance

- **Lazy Loading**: Componente carregado sob demanda
- **Memoização**: Cálculos otimizados no backend
- **Cache**: Dados armazenados no KV store
- **Prefetch**: Pré-carregamento inteligente
- **Code Splitting**: Bundle otimizado

## 📝 Próximas Melhorias

- [ ] Export de relatórios em PDF
- [ ] Filtros avançados (por produtor, fazenda, tipo)
- [ ] Comparação entre períodos (mês atual vs anterior)
- [ ] Alertas personalizados baseados em KPIs
- [ ] Dashboard customizável (drag-and-drop de widgets)
- [ ] Integração com BI externo
- [ ] Gráficos de dispersão e correlação
- [ ] Previsões com ML

## 🐛 Troubleshooting

### "Erro ao Carregar Analytics"
1. Verifique conexão com internet
2. Confirme que está autenticado
3. Tente atualizar com o botão de refresh
4. Verifique console para erros específicos

### Gráficos não aparecem
1. Aguarde o carregamento completo
2. Verifique se há dados no período selecionado
3. Tente um período mais longo (90 dias)

### Dados zerados
- Normal para usuários novos
- Desenhe áreas, registre ocorrências, faça check-ins
- Os dados são calculados em tempo real

## 📚 Documentação Relacionada

- `/types/index.ts` - Tipos TypeScript
- `/utils/hooks/useAnalytics.ts` - Hook de analytics
- `/components/pages/DashboardExecutivo.tsx` - Componente principal
- `/supabase/functions/server/index.tsx` - Rota de analytics (linha 838+)

---

**Versão**: 1.0.0  
**Última Atualização**: Janeiro 2025  
**Autor**: SoloForte Team
