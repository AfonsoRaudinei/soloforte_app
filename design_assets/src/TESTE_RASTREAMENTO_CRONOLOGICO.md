# 🧪 Guia de Testes - Sistema de Rastreamento Cronológico

**Versão**: 1.0  
**Data**: 20 de outubro de 2025  
**Objetivo**: Validar sistema completo de follow-up e severidade percentual

---

## ⚡ Quick Test (5 minutos)

### **Teste 1: Nova Ocorrência com Severidade Percentual**

1. Acesse o **Dashboard** (Clima com mapa)
2. Clique no FAB → **Mensagem** (Adicionar Relatório)
3. No dialog "Nova Ocorrência Técnica":
   - ✅ Verifique que "Follow-up" está **desmarcado**
   - Tipo: Selecione "🐛 Inseto"
   - Severidade: Arraste slider para **100%**
   - ✅ Verifique badge "🔴 Alta" está **destacado**
   - ✅ Verifique texto: "100% de área afetada"
   - Recomendações: Digite "Aplicar Inseticida XYZ 2L/ha"
   - Observações: "Lagarta alta infestação"
4. Clique em **Salvar Ocorrência**
5. ✅ **Verificar toast**: "✅ Ocorrência registrada! Severidade: 100%"
6. ✅ **Verificar descrição do toast**: "Status: ATIVA"

**✅ PASSOU SE:**
- Slider funciona suavemente de 0-100%
- Badges mudam de cor conforme % (verde/amarelo/vermelho)
- Toast mostra % correto
- Status é "ATIVA" para 100%

---

### **Teste 2: Follow-up com Melhoria**

1. Abra **Nova Ocorrência Técnica** novamente
2. ✅ **Marque** checkbox "Esta é uma visita de acompanhamento (Follow-up)"
3. ✅ **Verificar** que aparece select "Qual ocorrência você está acompanhando?"
4. Selecione: "🐛 inseto - 100% (data de hoje)"
5. ✅ **Verificar** que mostra histórico: "Última visita: 100%"
6. ✅ **Verificar** que Tipo está **desabilitado** (fixo em "Inseto")
7. Severidade: Arraste slider para **20%**
8. ✅ **Verificar** badge "🟢 Baixa" está destacado
9. Produtos Aplicados: Digite "Inseticida XYZ - 2L/ha"
10. Observações: "Redução significativa"
11. Clique em **Salvar Ocorrência**
12. ✅ **Verificar toast**: "✅ Follow-up registrado! Severidade: 20%"
13. ✅ **Verificar descrição**: "Status: CONTROLADA"

**✅ PASSOU SE:**
- Follow-up aparece na lista de seleção
- Histórico mostra severidade anterior (100%)
- Tipo é copiado e desabilitado
- Campo "Produtos Aplicados" aparece apenas em follow-up
- Status é "CONTROLADA" para 20%

---

### **Teste 3: Segundo Follow-up (Piora)**

1. Abra **Nova Ocorrência Técnica** novamente
2. Marque "Follow-up"
3. Selecione: "🐛 inseto - 20% (data de hoje)"
4. ✅ **Verificar**: "Última visita: 20%"
5. Severidade: Arraste slider para **60%**
6. ✅ **Verificar** badge "🟡 Média" está destacado
7. Produtos Aplicados: "Nenhum"
8. Observações: "Reinfestação detectada"
9. Salvar
10. ✅ **Verificar toast**: "Status: EM MONITORAMENTO"

**✅ PASSOU SE:**
- Segunda visita aparece na lista
- Mostra severidade correta (20%)
- Piora (20% → 60%) resulta em status "EM MONITORAMENTO"

---

## 🎨 Teste de Interface

### **Teste 4: Slider de Severidade Visual**

1. Abra dialog de ocorrência
2. Teste slider em diferentes pontos:

| Valor | Cor do Gradiente | Badge Ativo | Texto |
|-------|-----------------|-------------|-------|
| 0% | Verde (início) | 🟢 Baixa | "0% de área afetada" |
| 15% | Verde | 🟢 Baixa | "15% de área afetada" |
| 29% | Verde | 🟢 Baixa | "29% de área afetada" |
| 30% | Amarelo | 🟡 Média | "30% de área afetada" |
| 50% | Amarelo | 🟡 Média | "50% de área afetada" |
| 69% | Amarelo | 🟡 Média | "69% de área afetada" |
| 70% | Vermelho | 🔴 Alta | "70% de área afetada" |
| 100% | Vermelho | 🔴 Alta | "100% de área afetada" |

**✅ PASSOU SE:**
- Gradiente muda suavemente
- Badge correto se destaca (borda azul grossa + scale 105%)
- Texto atualiza em tempo real

---

### **Teste 5: Campo Produtos Aplicados (Condicional)**

1. **Nova ocorrência** (sem follow-up):
   - ✅ **Verificar**: Campo "Produtos Aplicados" **NÃO** aparece
   - ✅ **Verificar**: Campo "Recomendações" aparece

2. **Follow-up**:
   - ✅ **Verificar**: Campo "Produtos Aplicados" **aparece**
   - ✅ **Verificar**: Tem fundo verde claro
   - ✅ **Verificar**: Placeholder: "Digite um produto por linha"
   - Digite múltiplas linhas:
     ```
     Inseticida XYZ - 2L/ha
     Adjuvante ABC - 500ml/ha
     Espalhante DEF - 200ml/ha
     ```
   - Salve
   - ✅ **Verificar** (no console): Produtos salvos como array

**✅ PASSOU SE:**
- Campo aparece/desaparece corretamente
- Múltiplas linhas são separadas corretamente
- Visual diferenciado (fundo verde)

---

## 📊 Teste de Dados

### **Teste 6: localStorage (Modo Demo)**

1. Crie 3 ocorrências:
   - Ocorrência 1: Inseto 100%
   - Follow-up 1: Inseto 20%
   - Follow-up 2: Inseto 60%

2. Abra **DevTools** → **Application** → **Local Storage**

3. Encontre chave: `demo_markers`

4. ✅ **Verificar estrutura**:
```json
[
  {
    "id": "marker_...",
    "tipo": "inseto",
    "severidadePercentual": 100,
    "followUps": ["marker_..."], // ← ID do follow-up 1
    "status": "ativa"
  },
  {
    "id": "marker_...",
    "tipo": "inseto",
    "severidadePercentual": 20,
    "ocorrenciaOriginalId": "marker_...", // ← ID da primeira
    "ocorrenciaAnteriorId": "marker_...", // ← ID da primeira
    "followUps": ["marker_..."], // ← ID do follow-up 2
    "produtosAplicados": ["Inseticida XYZ - 2L/ha"],
    "status": "controlada"
  },
  {
    "id": "marker_...",
    "tipo": "inseto",
    "severidadePercentual": 60,
    "ocorrenciaOriginalId": "marker_...", // ← ID da primeira
    "ocorrenciaAnteriorId": "marker_...", // ← ID do follow-up 1
    "followUps": [],
    "status": "em-monitoramento"
  }
]
```

**✅ PASSOU SE:**
- Primeira ocorrência tem `followUps` com IDs corretos
- Follow-ups têm `ocorrenciaOriginalId` e `ocorrenciaAnteriorId`
- Status calculado corretamente
- `produtosAplicados` é array

---

## 🔗 Teste de Relacionamento

### **Teste 7: Encadeamento de Follow-ups**

**Cenário**: Criar cadeia de 4 ocorrências

```
Ocorrência Original (A)
  ↓
Follow-up 1 (B) → vinculado a A
  ↓
Follow-up 2 (C) → vinculado a B, original A
  ↓
Follow-up 3 (D) → vinculado a C, original A
```

**Passos**:

1. Criar Ocorrência A: Inseto 100%
2. Criar Follow-up B: Selecionar A, 20%
3. Criar Follow-up C: Selecionar B, 15%
4. Criar Follow-up D: Selecionar C, 30%

**Verificações**:

| Ocorrência | ocorrenciaOriginalId | ocorrenciaAnteriorId | followUps |
|------------|----------------------|----------------------|-----------|
| A (100%) | undefined | undefined | [B] |
| B (20%) | A | A | [C] |
| C (15%) | A | B | [D] |
| D (30%) | A | C | [] |

**✅ PASSOU SE:**
- Cada follow-up aponta para original (A)
- `ocorrenciaAnteriorId` aponta para imediatamente anterior
- Array `followUps` contém apenas próximo direto

---

## 🎯 Teste de Lógica de Status

### **Teste 8: Cálculo Automático de Status**

**Casos de Teste**:

| Contexto | Severidade | Severidade Anterior | Status Esperado |
|----------|-----------|---------------------|-----------------|
| **Nova** | 5% | - | 🟢 controlada |
| **Nova** | 35% | - | 🟡 em-monitoramento |
| **Nova** | 75% | - | 🔴 ativa |
| **Follow-up** | 15% | 80% | 🟢 controlada |
| **Follow-up** | 50% | 80% | 🟡 em-monitoramento |
| **Follow-up** | 85% | 80% | 🔴 ativa |
| **Follow-up** | 60% | 40% | 🔴 ativa (piorou!) |

**Procedimento**:
- Para cada linha, criar ocorrência
- Verificar toast de status

**✅ PASSOU SE:**
- Todos os status conferem com a tabela

---

## 🚨 Teste de Validações

### **Teste 9: Campos Obrigatórios**

1. Tentar salvar sem preencher Tipo:
   - ✅ **Verificar toast**: "Tipo e severidade são obrigatórios"

2. Tentar salvar sem preencher Severidade:
   - ✅ **Verificar toast**: "Tipo e severidade são obrigatórios"

3. Follow-up sem selecionar ocorrência anterior:
   - ✅ **Verificar**: Lista mostra "Nenhuma ocorrência ativa disponível" se vazio

**✅ PASSOU SE:**
- Validações impedem salvamento
- Mensagens de erro claras

---

## 📱 Teste Mobile

### **Teste 10: Responsividade**

1. Abra DevTools → Toggle Device Toolbar (iPhone 12 Pro)

2. Teste slider de severidade:
   - ✅ Touch funciona suavemente
   - ✅ Valor atualiza em tempo real

3. Teste campos multi-linha (Produtos Aplicados):
   - ✅ Teclado virtual não quebra layout
   - ✅ Scroll funciona no dialog

4. Teste badges de severidade:
   - ✅ Layout não quebra em 375px
   - ✅ Ícones e texto visíveis

**✅ PASSOU SE:**
- Dialog scrollável
- Todos os campos acessíveis
- Slider responsivo ao toque

---

## 🎓 Cenário Completo End-to-End

### **Teste 11: Ciclo Completo de Controle de Praga**

**História**:  
Fazenda Boa Vista tem infestação de lagarta. Consultor faz 4 visitas ao longo de 1 mês.

**Semana 1 (Descoberta)**:
```
Nova Ocorrência:
  Tipo: 🐛 Inseto
  Severidade: 100%
  Fotos: 3 fotos
  Recomendações: "Aplicar Inseticida XYZ 2L/ha + Adjuvante"
  Observações: "Lagarta em estágio inicial, alta população"
  Status esperado: ATIVA 🔴
```

**Semana 2 (Primeira aplicação)**:
```
Follow-up #1:
  Ocorrência anterior: Inseto 100%
  Severidade: 60%
  Fotos: 2 fotos
  Produtos: "Inseticida XYZ - 2L/ha\nAdjuvante ABC - 500ml/ha"
  Observações: "Redução moderada, lagarta ainda presente"
  Status esperado: EM MONITORAMENTO 🟡
```

**Semana 3 (Controle efetivo)**:
```
Follow-up #2:
  Ocorrência anterior: Inseto 60%
  Severidade: 15%
  Fotos: 2 fotos
  Produtos: "Nenhum - apenas monitoramento"
  Observações: "Grande melhoria, população baixíssima"
  Status esperado: CONTROLADA 🟢
```

**Semana 4 (Reinfestação!)**:
```
Follow-up #3:
  Ocorrência anterior: Inseto 15%
  Severidade: 45%
  Fotos: 3 fotos (nova geração de lagartas)
  Produtos: "Nenhum"
  Recomendações: "Reaplicar com produto de princípio ativo diferente"
  Observações: "Reinfestação, possível resistência"
  Status esperado: EM MONITORAMENTO 🟡 (piorou de 15% → 45%)
```

**Validações**:

1. ✅ Todas as 4 ocorrências aparecem na lista de follow-up
2. ✅ Histórico mostra evolução: 100% → 60% → 15% → 45%
3. ✅ Status muda conforme esperado
4. ✅ Produtos aplicados registrados em cada etapa
5. ✅ localStorage mostra cadeia completa de `followUps`

---

## 📋 Checklist Final

### ✅ **Funcionalidades Básicas**
- [ ] Criar nova ocorrência com severidade %
- [ ] Slider 0-100% funciona
- [ ] Badges visuais mudam conforme %
- [ ] Campo recomendações salvo

### ✅ **Follow-up**
- [ ] Toggle follow-up funciona
- [ ] Lista de ocorrências disponíveis aparece
- [ ] Histórico da ocorrência anterior exibido
- [ ] Tipo e localização auto-preenchidos
- [ ] Campo produtos aplicados aparece

### ✅ **Status Automático**
- [ ] Nova ocorrência: Status baseado em %
- [ ] Follow-up: Status considera evolução
- [ ] Toast mostra status correto

### ✅ **Dados e Persistência**
- [ ] localStorage salva corretamente
- [ ] Relacionamentos (IDs) corretos
- [ ] Array `followUps` atualizado
- [ ] Produtos salvos como array

### ✅ **UX e Interface**
- [ ] Dialog scrollável
- [ ] Campos condicionais aparecem/desaparecem
- [ ] Validações funcionam
- [ ] Mobile responsivo

---

## 🐛 Problemas Conhecidos e Soluções

### **Problema**: Ocorrência não aparece na lista de follow-up

**Causa**: Status é 'resolvida' ou 'controlada'  
**Solução**: Apenas ocorrências 'ativa' ou 'em-monitoramento' aparecem

### **Problema**: Tipo não está desabilitado no follow-up

**Causa**: Ocorrência anterior não foi selecionada  
**Solução**: Selecionar ocorrência anterior primeiro

### **Problema**: Produtos Aplicados não salvam

**Causa**: Campo é string ao invés de array  
**Solução**: Código split por `\n` já implementado

---

## 📊 Métricas de Sucesso

**O sistema está funcionando perfeitamente se**:

✅ **Taxa de conclusão do fluxo**: > 95%  
✅ **Tempo para registrar follow-up**: < 30 segundos  
✅ **Erros de validação**: 0  
✅ **Dados consistentes no localStorage**: 100%  
✅ **UX mobile**: Sem quebras de layout  

---

**Data de Teste**: ____/____/2025  
**Testador**: _______________________  
**Versão Testada**: 1.0  
**Status**: ✅ APROVADO / ⚠️ COM RESSALVAS / ❌ REPROVADO

---

**Desenvolvido com 💙 para SoloForte Agro-Tech**  
**Testes completos para garantir rastreamento confiável** 🌾
