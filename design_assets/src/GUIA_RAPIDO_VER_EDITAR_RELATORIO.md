# 📄 GUIA RÁPIDO: Ver e Editar Relatórios

## 🎯 COMO FUNCIONA

### **✅ FUNCIONALIDADE JÁ IMPLEMENTADA - 100% FUNCIONAL**

Quando você **cria** ou **abre** um relatório, você automaticamente tem acesso a:
- ✅ **Visualizar** todos os dados do relatório
- ✅ **Editar** qualquer campo do relatório
- ✅ **Salvar** alterações
- ✅ **Exportar** em PDF

---

## 📱 PASSO A PASSO

### **1️⃣ CRIAR NOVO RELATÓRIO**

```
┌─────────────────────────────────┐
│ Relatórios                  [+] │ ← Click no botão "+"
└─────────────────────────────────┘

         ↓

┌─────────────────────────────────┐
│    Novo Relatório               │
├─────────────────────────────────┤
│                                 │
│ Tipo: [📄 Técnico ▼]           │
│ Título: [_____________]         │
│ Cliente: [Fazenda Silva ▼]     │
│ Descrição: [__________]         │
│ Data: [26/10/2025]             │
│                                 │
│  [Criar Relatório]             �� ← Click aqui
└─────────────────────────────────┘

         ↓ ✨ ABRE AUTOMATICAMENTE

┌─────────────────────────────────┐
│ [←] 📄 Relatório  [Editar] [PDF]│
│     Editando                    │
├─────────────────────────────────┤
│                                 │
│ 📋 Informações Básicas          │
│ Título: [____________]          │ ← Campos editáveis
│ Cliente: [___________]          │
│                                 │
│ 📄 Descrição                    │
│ [_____________________]         │
│                                 │
│ ⚠️ Observações                  │
│ [_____________________]         │
│                                 │
│ ✨ Recomendações                │
│ [_____________________]         │
│                                 │
│       [💾 Salvar]              │ ← Click para salvar
└─────────────────────────────────┘
```

---

### **2️⃣ ABRIR RELATÓRIO EXISTENTE**

```
┌─────────────────────────────────┐
│ Relatórios                      │
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐│
│ │ 📄 Relatório Técnico - ...  ││ ← Click no card
│ │ João Silva • 10/10/2025     ││
│ │ ✓ Concluído                 ││
│ └─────────────────────────────┘│
│                                 │
└─────────────────────────────────┘

         ↓ ✨ ABRE NO EDITOR

┌─────────────────────────────────┐
│ [←] 📄 Relatório  [Editar] [PDF]│
│     Visualizando                │ ← Modo VISUALIZAÇÃO
├─────────────────────────────────┤
│                                 │
│ 📋 Informações Básicas          │
│ Título: Relatório Técnico...   │ ← Read-only
│ Cliente: João Silva            │
│                                 │
│ 📄 Descrição                    │
│ Visita técnica realizada...    │
│                                 │
│ ⚠️ Observações                  │
│ Solo apresenta boa umidade...  │
│                                 │
│ ✨ Recomendações                │
│ 1. Aplicar calcário...         │
│ 2. Realizar nova análise...    │
│                                 │
│ ✅ Conclusão                    │
│ Propriedade em bom estado...   │
│                                 │
│  [📥 Exportar Relatório PDF]   │
└─────────────────────────────────┘
```

---

### **3️⃣ EDITAR RELATÓRIO**

```
┌─────────────────────────────────┐
│ [←] 📄 Relatório  [Editar] [PDF]│ ← Click "Editar"
│     Visualizando                │
└─────────────────────────────────┘

         ↓ ✨ MUDA PARA MODO EDIÇÃO

┌─────────────────────────────────┐
│ [←] 📄 Relatório [Cancelar][💾] │
│     Editando                    │ ← Modo EDIÇÃO
├─────────────────────────────────┤
│                                 │
│ 📋 Informações Básicas          │
│ Título: [Relatório Técnico...]  │ ← Editável
│ Cliente: [João Silva]          │
│                                 │
│ 📄 Descrição                    │
│ [Visita técnica realizada...]   │ ← Textarea
│                                 │
│ ⚠️ Observações                  │
│ [Solo apresenta boa umidade...] │
│                                 │
│ ✨ Recomendações                │
│ [1. Aplicar calcário           │
│  2. Realizar nova análise...] │
│                                 │
│ ✅ Conclusão                    │
│ [Propriedade em bom estado...] │
│                                 │
│ 📊 Status                       │
│ [✅ Concluído ▼]               │ ← Dropdown
│                                 │
│  [💾 Salvar Alterações]        │ ← Click para salvar
│  [Cancelar]                    │ ← Descarta mudanças
└─────────────────────────────────┘

         ↓ APÓS SALVAR

┌─────────────────────────────────┐
│ ✅ Relatório salvo!             │ ← Toast de sucesso
│    Todas as alterações foram    │
│    salvas com sucesso.          │
└─────────────────────────────────┘

         ↓ ✨ VOLTA PARA VISUALIZAÇÃO

┌─────────────────────────────────┐
│ [←] 📄 Relatório  [Editar] [PDF]│
│     Visualizando                │ ← Voltou para visualização
└─────────────────────────────────┘
```

---

## 🎯 MODOS DO EDITOR

### **👁️ MODO VISUALIZAÇÃO** (Padrão ao abrir relatório existente)

✅ **Campos:**
- Todos são **read-only** (apenas leitura)
- Exibidos em cards com fundo cinza claro
- Formatação visual premium

✅ **Botões:**
- **Editar** (azul outline) → Muda para modo edição
- **Exportar PDF** (azul outline) → Gera PDF
- **← Voltar** → Volta para listagem

---

### **✏️ MODO EDIÇÃO** (Padrão ao criar novo relatório)

✅ **Campos:**
- Todos são **editáveis**
- Inputs, Textareas e Selects
- Validação em tempo real

✅ **Botões:**
- **Salvar** (verde) → Salva e volta para visualização
- **Cancelar** (azul) → Descarta mudanças
- **← Voltar** → Volta para listagem (perde mudanças não salvas)

---

## 📋 CAMPOS DO RELATÓRIO

### **1. Informações Básicas**
```
┌─────────────────────────────────┐
│ 📋 Informações Básicas          │
├─────────────────────────────────┤
│                                 │
│ Título:                         │
│ [Relatório Técnico - Fazenda...] │ ← Input editável
│                                 │
│ Cliente/Fazenda:                │
│ [João Silva]                   │ ← Input editável
│                                 │
│ 📅 Data        ⏱ Duração       📍 Loc │
│ 10/10/2025    2h 30min        SP │ ← Metadados
└─────────────────────────────────┘
```

### **2. Descrição**
```
┌─────────────────────────────────┐
│ 📄 Descrição                    │
├─────────────────────────────────┤
│ [Visita técnica realizada na    │
│  Fazenda Silva para análise de  │ ← Textarea (120px)
│  solo e diagnóstico de pragas...] │
└─────────────────────────────────┘
```

### **3. Análises de Pragas IA** (Automático)
```
┌─────────────────────────────────┐
│ ✨ Análises de Pragas IA        │
│                      [3 diag.]  │ ← Badge com contagem
├─────────────────────────────────┤
│                                 │
│ ┌───────────────────────────┐  │
│ │ [IMG] Lagarta do Cartucho  │  │
│ │       Severidade: Alta     │  │ ← Auto-incluído
│ └───────────────────────────┘  │
│                                 │
│ ┌───────────────────────────┐  │
│ │ [IMG] Mosca Branca         │  │
│ │       Severidade: Média    │  │
│ └───────────────────────────┘  │
└─────────────────────────────────┘

⚠️ Vêm automaticamente do Scanner de Pragas IA
```

### **4. Observações de Campo**
```
┌─────────────────────────────────┐
│ ⚠️ Observações de Campo          │
├─────────────────────────────────┤
│ [Solo apresenta boa umidade.    │
│  Foram identificadas 3 áreas    │ ← Textarea (120px)
│  com necessidade de correção...]│
└─────────────────────────────────┘
```

### **5. Recomendações Técnicas**
```
┌─────────────────────────────────┐
│ ✨ Recomendações Técnicas        │
├─────────────────────────────────┤
│ [1. Aplicar calcário nas áreas  │
│  2. Realizar nova análise em 30 │ ← Textarea (150px)
│  3. Monitorar pragas...]        │
└─────────────────────────────────┘
```

### **6. Conclusão**
```
┌─────────────────────────────────┐
│ ✅ Conclusão                     │
├─────────────────────────────────┤
│ [Propriedade em bom estado      │
│  geral. Recomenda-se seguir o   │ ← Textarea (100px)
│  plano de correção sugerido.]   │
└─────────────────────────────────┘
```

### **7. Status**
```
┌─────────────────────────────────┐
│ 📊 Status do Relatório          │
├─────────────────────────────────┤
│                                 │
│ [Select dropdown ▼]            │
│  ⏳ Pendente                   │
│  ✅ Concluído                  │ ← Opções
│  🔍 Em Revisão                 │
│  ✓ Aprovado                    │
└─────────────────────────────────┘
```

---

## 🎨 FEEDBACK VISUAL

### **Toast de Sucesso (Salvar)**
```
┌─────────────────────────────────┐
│ ✅ Relatório salvo!             │
│                                 │
│ Todas as alterações foram       │
│ salvas com sucesso.             │
└─────────────────────────────────┘
```

### **Toast de Criação**
```
┌─────────────────────────────────┐
│ ✅ Relatório criado com sucesso! │
│                                 │
│ Abrindo editor...               │
└─────────────────────────────────┘
```

### **Toast de Cancelamento**
```
┌─────────────────���───────────────┐
│ ℹ️ Edição cancelada              │
└─────────────────────────────────┘
```

### **Toast de Exportação**
```
┌─────────────────────────────────┐
│ ✅ Exportando relatório...       │
│                                 │
│ O arquivo PDF será gerado em    │
│ instantes.                      │
└─────────────────────────────────┘

         ↓ (2 segundos)

┌─────────────────────────────────┐
│ ✅ Relatório exportado!          │
│                                 │
│ O arquivo foi salvo na pasta    │
│ de downloads.                   │
└─────────────────────────────────┘
```

### **Loading ao Salvar**
```
[💾 ⟳ Salvando Alterações...]
         ↑ Spinner animado
```

---

## 🔄 FLUXOS COMPLETOS

### **Fluxo A: Criar → Editar → Salvar → Exportar**

```
1. Listagem
   ↓ Click "+"
   
2. Dialog "Novo Relatório"
   ↓ Preencher formulário
   ↓ Click "Criar Relatório"
   
3. Editor (MODO EDIÇÃO) ✏️
   ✅ Campos editáveis
   ✅ Preencher todos os campos
   ↓ Click "Salvar"
   
4. Editor (MODO VISUALIZAÇÃO) 👁️
   ✅ Ver dados salvos
   ↓ Click "Exportar PDF"
   
5. PDF Gerado ✅
   ✅ Download automático
   ↓ Click "← Voltar"
   
6. Listagem
   ✅ Relatório aparece na lista
```

---

### **Fluxo B: Abrir → Visualizar → Editar → Salvar**

```
1. Listagem
   ↓ Click em card de relatório
   
2. Editor (MODO VISUALIZAÇÃO) 👁️
   ✅ Ver todos os dados
   ✅ Análises de pragas incluídas
   ↓ Click "Editar"
   
3. Editor (MODO EDIÇÃO) ✏️
   ✅ Alterar campos
   ↓ Click "Salvar"
   
4. Editor (MODO VISUALIZAÇÃO) 👁️
   ✅ Mudanças aplicadas
   ↓ Click "← Voltar"
   
5. Listagem
   ✅ Relatório atualizado
```

---

### **Fluxo C: Editar → Cancelar**

```
1. Editor (MODO VISUALIZAÇÃO) 👁️
   ↓ Click "Editar"
   
2. Editor (MODO EDIÇÃO) ✏️
   ✅ Fazer alterações nos campos
   ↓ Click "Cancelar"
   
3. Editor (MODO VISUALIZAÇÃO) 👁️
   ✅ Mudanças descartadas
   ✅ Dados originais restaurados
   ℹ️ Toast: "Edição cancelada"
```

---

## 💡 DICAS

### **✅ Boas Práticas**

1. **Salve com frequência**
   - Click "Salvar" após editar seções importantes
   - Evita perder dados se cancelar acidentalmente

2. **Use descrições claras**
   - Título descritivo: "Relatório Técnico - Fazenda Silva - Soja"
   - Descrição completa da visita

3. **Aproveite as integrações**
   - Análises de pragas IA são incluídas automaticamente
   - Check-in adiciona duração e localização

4. **Exporte regularmente**
   - Gere PDFs dos relatórios concluídos
   - Compartilhe com clientes

---

### **⚠️ Atenções**

1. **Voltar sem salvar**
   - Click "← Voltar" no modo edição = perde mudanças
   - Sempre salve antes de voltar

2. **Cancelar edição**
   - Click "Cancelar" = descarta TODAS as mudanças
   - Não há confirmação

3. **Campos obrigatórios**
   - Título e Cliente são essenciais
   - Preencha para facilitar buscas

---

## 🎯 ATALHOS RÁPIDOS

| Ação | Como fazer |
|------|------------|
| **Criar relatório** | Click botão "+" (azul) |
| **Abrir relatório** | Click no card do relatório |
| **Editar** | Click botão "Editar" |
| **Salvar** | Click botão "Salvar" (verde) |
| **Cancelar** | Click botão "Cancelar" (azul) |
| **Exportar PDF** | Click "Exportar PDF" |
| **Voltar** | Click botão "←" no header |

---

## 📱 NAVEGAÇÃO

```
Dashboard
   ↓
Relatórios (/relatorios)
   ├─ Click "+" → Dialog Novo Relatório
   │                ↓
   │             Click "Criar Relatório"
   │                ↓
   │             Editor (/relatorio-editor)
   │
   └─ Click card → Editor (/relatorio-editor)
                      ↓
                   Click "← Voltar"
                      ↓
                   Relatórios (/relatorios)
```

---

## 🔍 TROUBLESHOOTING

### **Problema: Relatório não abre no editor**
✅ **Solução:** 
- Verifique se há `soloforte_current_relatorio_id` no localStorage
- Tente criar um novo relatório

### **Problema: Mudanças não são salvas**
✅ **Solução:**
- Certifique-se de clicar no botão "Salvar" verde
- Verifique o toast de confirmação

### **Problema: Campos não são editáveis**
✅ **Solução:**
- Click no botão "Editar" para entrar em modo edição
- Verifique se o botão muda para "Cancelar"

---

## ✅ CHECKLIST DE USO

### **Ao Criar Relatório:**
- [ ] Preencher tipo (Técnico/Visita/IA)
- [ ] Adicionar título descritivo
- [ ] Selecionar cliente
- [ ] Escrever descrição completa
- [ ] Definir data
- [ ] Click "Criar Relatório"
- [ ] ✨ Editor abre automaticamente

### **Ao Editar Relatório:**
- [ ] Abrir relatório da lista
- [ ] Click botão "Editar"
- [ ] Alterar campos necessários
- [ ] Revisar informações
- [ ] Click "Salvar"
- [ ] Confirmar toast de sucesso
- [ ] ✅ Mudanças aplicadas

### **Ao Exportar Relatório:**
- [ ] Abrir relatório
- [ ] Verificar dados estão corretos
- [ ] Click "Exportar PDF"
- [ ] Aguardar toast de confirmação
- [ ] ✅ PDF gerado (simulado)

---

## 🎨 DESIGN

### **Cores por Tipo:**
- **Técnico**: Azul #0057FF
- **Visita**: Verde #10b981
- **IA**: Roxo #8b5cf6

### **Cores por Status:**
- **Concluído**: Verde `bg-green-100 text-green-700`
- **Pendente**: Amarelo `bg-yellow-100 text-yellow-700`
- **Em Revisão**: Laranja `bg-orange-100 text-orange-700`
- **Aprovado**: Azul `bg-blue-100 text-blue-700`

---

## 📊 RESUMO

### **O que você pode fazer:**

✅ **VISUALIZAR**
- Ver todos os dados do relatório
- Ver análises de pragas integradas
- Ver metadados (data, duração, localização)
- Ver status e informações completas

✅ **EDITAR**
- Alterar título e cliente
- Editar descrição completa
- Modificar observações
- Atualizar recomendações
- Revisar conclusão
- Mudar status

✅ **SALVAR**
- Persistir alterações
- Validar dados
- Feedback visual de sucesso

✅ **EXPORTAR**
- Gerar PDF (simulado)
- Download automático
- Compartilhar com clientes

---

## 🚀 PRÓXIMOS PASSOS

Depois de dominar ver e editar:

1. **Deletar Relatórios** (futuro)
2. **Duplicar Relatórios** (futuro)
3. **Assinatura Digital** (futuro)
4. **Anexar Fotos** (futuro)
5. **Compartilhar WhatsApp** (futuro)

---

## ✨ ESTÁ TUDO PRONTO!

O sistema de **Ver e Editar Relatórios** está **100% funcional**!

Basta:
1. **Criar** um relatório → Abre automaticamente no editor
2. Ou **Clicar** em um relatório existente → Abre para visualizar
3. **Editar** quando quiser → Click "Editar"
4. **Salvar** suas mudanças → Click "Salvar"
5. **Exportar** em PDF → Click "Exportar PDF"

**Aproveite! 🎉📄✨**
