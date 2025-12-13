# 🌾 SoloForte - Plataforma Agro-Tech Premium

> Sistema completo de gestão agrícola com foco em produtividade, simplicidade e performance excepcional.

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-93%2F100-success?style=for-the-badge&logo=lighthouse)](./docs/historico/PERFORMANCE_DASHBOARD.md)
[![Mobile First](https://img.shields.io/badge/Mobile-First-blue?style=for-the-badge)](./docs/implementacoes/MOBILE_ONLY_IMPLEMENTADO.md)
[![Performance](https://img.shields.io/badge/Core_Web_Vitals-Excellent-brightgreen?style=for-the-badge)](./docs/guias/LIGHTHOUSE_TRACKING.md)
[![Docs](https://img.shields.io/badge/Docs-Organized-success?style=for-the-badge&logo=readthedocs)](./docs/README.md)

---

## 🎯 Visão Geral

SoloForte é um aplicativo mobile premium para o setor agro-tech, focado em transformar complexidade em decisões simples e produtivas. Com design clean e emocional, oferece ferramentas completas para gestão de propriedades rurais, monitoramento de safras e análise de dados.

### ✨ Principais Características

- 🎨 **Design Premium**: Interface clean com cor azul #0057FF como destaque
- 📱 **Mobile-First**: Otimizado para dispositivos móveis (Score Lighthouse 88-93)
- 🗺️ **Mapas Offline**: Sistema completo com cache IndexedDB (80-95% cobertura)
- 📊 **Análise NDVI**: Integração com Sentinel Hub e Planet APIs
- ⚡ **Performance Excepcional**: +25 pontos no Lighthouse vs baseline
- 🎭 **Temas Personalizados**: Modo escuro + estilos visuais distintos
- 🔐 **Autenticação Supabase**: Sistema completo de login/cadastro
- 💬 **Chat/Suporte In-App**: Sistema completo de mensageria mobile-first

---

## 🚀 Quick Start

### Instalação

```bash
# Clone o repositório
git clone [url-do-repo]

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env

# Inicie o servidor de desenvolvimento
npm run dev
```

### Acesso Rápido

```bash
# Abrir Performance Monitor
Ctrl + Shift + M

# Abrir Prefetch Debugger
Ctrl + Shift + P

# Rodar Lighthouse
lighthouse http://localhost:5173 --preset=mobile --view
```

---

## 📊 Performance

### Score Atual

```
┌──────────────────────────────────────┐
│  LIGHTHOUSE SCORE                    │
├──────────────────────────────────────┤
│  Overall:      88-93 pontos          │
│  Mobile:       88-90 pontos          │
│  Desktop:      92-95 pontos          │
└──────────────────────────────────────┘
```

### Core Web Vitals

| Métrica | Score | Status |
|---------|-------|--------|
| LCP | 1.9s | 🟢 Excelente |
| FID | 60ms | 🟢 Excelente |
| CLS | 0.04 | 🟢 Excelente |
| FCP | 1.1s | 🟢 Excelente |
| TTFB | 480ms | 🟢 Excelente |
| TTI | 2.5s | 🟢 Excelente |

**Ganho Total**: +25 pontos (+38%) vs baseline

📈 [Ver Dashboard Completo →](./docs/historico/PERFORMANCE_DASHBOARD.md)

---

## 🎨 Funcionalidades

### 📍 Sistema de Localização
- Check-in/Check-out com GPS
- Timer em tempo real
- Histórico de visitas
- Geolocalização automática

### 🗺️ Mapas Inteligentes
- **7 Ferramentas de Desenho**:
  - Polígono livre
  - Retângulo
  - Círculo
  - Linha
  - Ponto
  - Medição de área
  - Importação KML/KMZ
- **Sistema Offline Completo**:
  - Cache IndexedDB
  - Download de tiles
  - 80-95% de cobertura
  - Funciona sem conexão

### 📊 Análise de Safras
- **NDVI (Índice de Vegetação)**:
  - Sentinel Hub integration
  - Planet API integration
  - Análise temporal
  - Comparação de períodos
- **Relatórios Completos**:
  - Exportação HTML/PDF
  - Gráficos interativos
  - Dados históricos

### 🌤️ Clima
- Radar de clima em tempo real
- Previsão do tempo
- Alertas meteorológicos
- Histórico climático

### 👥 Gestão de Clientes
- Cadastro de produtores
- Propriedades rurais
- Histórico de visitas
- Notas e observações

### 📅 Agenda
- Calendário de eventos
- Lembretes automáticos
- Sincronização de tarefas

### ⚙️ Configurações
- Sistema de temas (claro/escuro)
- Estilos visuais distintos
- Preferências de usuário
- Gestão de conta

---

## 🛠️ Tecnologias

### Frontend
- **React** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **Leaflet.js** - Mapas interativos

### Backend
- **Supabase** - Backend as a Service
  - Authentication
  - Database (PostgreSQL)
  - Storage
  - Edge Functions

### Mobile
- **Capacitor** - Native APIs
  - Camera nativa 4K
  - GPS de alta precisão
  - Storage nativo
  - Filesystem access

### Performance
- **LazyImage** - Lazy loading de imagens
- **React.memo()** - Otimização de renders
- **Prefetch System** - Carregamento inteligente
- **IndexedDB** - Cache local
- **Service Worker** - PWA ready

---

## 📚 Documentação

> 🆕 **Documentação reorganizada!** Toda a documentação foi movida para `/docs` com estrutura organizada por categorias.

### 📖 Acesso Rápido

**→ [📚 Índice Completo de Documentação](./docs/README.md)** ⭐

### 🚀 Para Começar
- [START_HERE.md](./START_HERE.md) - **Comece aqui!**
- [Como Usar](./docs/guias/COMO_USAR.md) - Guia completo de uso
- [Quick Start Performance](./docs/guias/QUICK_START_PERFORMANCE.md) - Setup em 2 minutos
- [Instalação Capacitor](./docs/guias/INSTALL_CAPACITOR.md) - Setup mobile

### 📊 Auditorias e Performance
- [🏆 Auditoria Top 0.1%](./docs/auditorias/AUDITORIA_COMPLETA_TOP_0_1_PERCENT.md) - **Mais recente!**
- [Performance Dashboard](./docs/historico/PERFORMANCE_DASHBOARD.md) - Métricas atuais
- [Lighthouse Monitoring](./docs/guias/GUIA_LIGHTHOUSE_MONITORING.md) - Guia completo
- [Plano de Ação Imediato](./PLANO_ACAO_IMEDIATO.md) - Próximos passos

### 🎯 Guias de Funcionalidades
- [Mapas Offline](./docs/guias/GUIA_MAPAS_OFFLINE.md) - Sistema offline completo
- [Marketing (Cases de Sucesso)](./docs/guias/GUIA_MARKETING.md) - Pins no mapa
- [Scanner de Pragas](./docs/guias/GUIA_RAPIDO_SCANNER_PRAGAS.md) - IA + Câmera
- [Check-in/Check-out](./docs/guias/GUIA_CHECKIN.md) - Registro de visitas
- [Análise NDVI](./docs/guias/NDVI_GUIDE.md) - Monitoramento de vegetação
- [Alertas Automáticos](./docs/guias/GUIA_ALERTAS.md) - Notificações

### 🏗️ Arquitetura e Decisões
- [Estrutura do Projeto](./docs/arquitetura/ESTRUTURA_FINAL_PROJETO.md)
- [Stack Tecnológico](./docs/arquitetura/STACK_TECNOLOGICO_COMPLETO.md)
- [Timeline (22 semanas)](./docs/decisoes/TIMELINE_COMPLETA_22_SEMANAS.md)

---

## 🎯 Arquitetura

### Estrutura de Pastas

```
/
├── components/              # Componentes React
│   ├── ui/                 # Componentes UI (shadcn)
│   ├── shared/             # Componentes compartilhados
│   └── *.tsx               # Componentes de páginas
│
├── utils/                   # Utilitários
│   ├── hooks/              # Custom hooks
│   ├── storage/            # Storage nativo (Capacitor)
│   ├── camera/             # Camera nativa
│   ├── supabase/           # Cliente Supabase
│   ├── ThemeContext.tsx    # Context de temas
│   ├── TileManager.ts      # Gerenciador de tiles offline
│   ├── prefetch.ts         # Sistema de prefetch
│   └── constants-mobile.ts # Constantes mobile-first
│
├── types/                   # TypeScript types
│
├── styles/                  # Estilos globais
│   └── globals.css         # Tailwind + variáveis CSS
│
├── supabase/               # Backend Supabase
│   └── functions/
│       └── server/         # Edge Functions
│
└── *.md                    # Documentação
```

### Fluxo de Dados

```
┌─────────────┐
│   Frontend  │
│   (React)   │
└──────┬──────┘
       │
       ├─→ Supabase Auth (Login/Cadastro)
       │
       ├─→ Supabase Database (PostgreSQL)
       │
       ├─→ Supabase Storage (Files/Images)
       │
       ├─→ IndexedDB (Cache Offline)
       │
       ├─→ Capacitor APIs (Camera/GPS/Storage)
       │
       └─→ External APIs (Sentinel Hub/Planet)
```

---

## 🎨 Design System

### Cores Principais

```css
/* Primary */
--blue-primary: #0057FF;

/* Neutrals */
--gray-50: #f9fafb;
--gray-900: #111827;

/* Success */
--green-500: #10b981;

/* Warning */
--yellow-500: #f59e0b;

/* Error */
--red-500: #ef4444;
```

### Tipografia

- **Fonte**: System Font Stack (melhor performance)
- **Heading**: Bold, Leading tight
- **Body**: Regular, Leading normal
- **Caption**: Small, Leading relaxed

### Breakpoints

```css
/* Mobile-first (sem breakpoints desktop) */
- Base: 0-∞ (100% mobile)
- Layout: Flex + Grid
- Touch targets: min 44x44px
```

---

## 🧪 Testes

### Performance Tests

```bash
# Teste mobile (recomendado)
npm run test:perf:mobile

# Teste desktop
npm run test:perf:desktop

# Bateria completa
npm run test:perf:all
```

### Manual Testing

```bash
# Abrir Performance Monitor
Ctrl+Shift+M → Ver métricas em tempo real

# Abrir Prefetch Debugger
Ctrl+Shift+P → Verificar prefetch

# Chrome DevTools
F12 → Lighthouse → Analyze page load
```

---

## 📈 Roadmap

### ✅ Fase 1-5 (Completas)
- [x] Sistema base (11 páginas)
- [x] Autenticação Supabase
- [x] Mapas com 7 ferramentas
- [x] Sistema offline (80-95%)
- [x] Otimizações mobile-first
- [x] LazyImage + React.memo()
- [x] Capacitor integration
- [x] Sistema de prefetch
- [x] Performance Monitor
- [x] Score 90+ atingido

### 🚧 Fase 6 (Próxima)
- [ ] Code splitting avançado
- [ ] Service Worker + PWA
- [ ] Image optimization (WebP)
- [ ] Bundle size reduction
- **Meta**: Score 95+

### 🔮 Futuro
- [ ] Push notifications
- [ ] Background sync
- [ ] Offline-first completo
- [ ] PWA install prompt
- [ ] Internacionalização (i18n)

---

## 🤝 Contribuindo

### Como Contribuir

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Antes de Commitar

```bash
# Checklist
✅ Código funciona localmente
✅ Performance Monitor OK (Ctrl+Shift+M)
✅ Prefetch Debugger OK (Ctrl+Shift+P)
✅ Lighthouse Score 85+ (npm run test:perf:mobile)
✅ Console sem erros
✅ Documentação atualizada
```

---

## 📊 Status do Projeto

```
┌────────────────────────────────────────────────┐
│  SOLOFORTE - STATUS ATUAL                      │
├────────────────────────────────────────────────┤
│  Versão:           2.6.0                       │
│  Status:           ✅ Produção                 │
│  Performance:      🟢 Excelente (93 pontos)    │
│  Mobile Ready:     ✅ Sim                      │
│  Offline Support:  ✅ 80-95%                   │
│  PWA Ready:        ⚠️ Parcial                  │
│  Tests:            ✅ Lighthouse automatizado  │
│  Documentation:    ✅ Completa (6+ guias)      │
└────────────────────────────────────────────────┘
```

---

## 📞 Suporte

### Documentação
- [Índice Completo](./INDICE_DOCUMENTACAO_PERFORMANCE.md) - Navegação
- [Quick Start](./QUICK_START_PERFORMANCE.md) - Começar rápido
- [FAQ](./COMO_USAR.md) - Perguntas frequentes

### Issues
- Reporte bugs via GitHub Issues
- Sugira features via GitHub Discussions

---

## 📄 Licença

Este projeto é proprietário e confidencial.

---

## 🏆 Conquistas

```
✅ Score Lighthouse 90+ atingido
✅ Todas Core Web Vitals no verde
✅ Sistema offline 80-95% funcional
✅ Prefetch 100% funcional
✅ +25 pontos de performance vs baseline
✅ Mobile-first architecture implementada
✅ Documentação completa (15+ guias)
✅ Testes automatizados configurados
```

---

## 🙏 Agradecimentos

- **Equipe de Desenvolvimento** - Implementação e otimizações
- **Google Lighthouse** - Ferramentas de performance
- **Supabase** - Backend as a Service
- **Comunidade Open Source** - Bibliotecas incríveis

---

**Última atualização**: 2025-01-20
**Versão**: 2.6.0
**Status**: ✅ Produção

---

<div align="center">
  
### 🌾 SoloForte
  
**Transformando complexidade em decisões simples e produtivas**

[![Performance](https://img.shields.io/badge/Lighthouse-93-success?style=flat-square)](./PERFORMANCE_DASHBOARD.md)
[![Mobile](https://img.shields.io/badge/Mobile-First-blue?style=flat-square)](./OTIMIZACAO_MOBILE_FIRST.md)
[![Offline](https://img.shields.io/badge/Offline-80--95%25-brightgreen?style=flat-square)](./GUIA_MAPAS_OFFLINE.md)

</div>
