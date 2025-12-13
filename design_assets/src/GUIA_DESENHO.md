# 🎨 Guia Completo de Desenho de Áreas no SoloForte

## 📐 Como Finalizar Cada Tipo de Desenho

### 1. **📐 Polígono (Polygon)**
**Para finalizar:** `Duplo clique` no último ponto

**Passo a passo:**
1. Clique no botão de **Polígono** no menu de desenho
2. Clique no mapa para adicionar cada vértice do polígono
3. Continue clicando para criar mais pontos (mínimo 3 pontos)
4. **Duplo clique** para fechar e finalizar o polígono
5. Dialog de salvamento abrirá automaticamente

**Uso ideal:** Talhões irregulares, áreas com formato complexo

---

### 2. **⬜ Retângulo (Rectangle)**
**Para finalizar:** `2 cliques` (canto oposto)

**Passo a passo:**
1. Clique no botão de **Retângulo** no menu de desenho
2. **1º clique:** Define o primeiro canto
3. Mova o mouse para ver o preview do retângulo
4. **2º clique:** Define o canto oposto e finaliza
5. Dialog de salvamento abrirá automaticamente

**Uso ideal:** Talhões regulares, áreas quadradas/retangulares

---

### 3. **🔵 Círculo/Pivô (Circle)**
**Para finalizar:** `2 cliques` (centro + raio)

**Passo a passo:**
1. Clique no botão de **Círculo/Pivô** no menu de desenho
2. **1º clique:** Define o centro do círculo
3. Mova o mouse para ver o preview do círculo (raio aumentando)
4. **2º clique:** Define o raio final e finaliza
5. Dialog de salvamento abrirá automaticamente

**Uso ideal:** Pivôs centrais, áreas circulares de irrigação

**⚠️ Correção aplicada:** O cálculo de área do círculo agora está preciso!

---

### 4. **✏️ Mão Livre (Freehand)**
**Para finalizar:** `Soltar o botão do mouse`

**Passo a passo:**
1. Clique no botão de **Mão Livre** no menu de desenho
2. **Clique e segure** o botão do mouse
3. Arraste o mouse para desenhar livremente
4. **Solte o botão** para finalizar o desenho
5. Dialog de salvamento abrirá automaticamente

**Uso ideal:** Contornar áreas irregulares rapidamente, seguir curvas naturais

---

### 5. **✂️ Recorte (Crop)**
**Para finalizar:** `Duplo clique` + selecionar área

**Passo a passo:**
1. **Primeiro:** Selecione uma área existente clicando nela
2. Clique no botão de **Recorte** no menu de desenho
3. Clique no mapa para adicionar pontos da área de recorte
4. **Duplo clique** para finalizar o recorte
5. A área será dividida automaticamente

**Uso ideal:** Dividir talhões grandes, separar áreas problemáticas

---

## 💾 Dialog de Salvamento de Área

Após finalizar qualquer desenho, um **Dialog** aparece automaticamente com:

### 📋 Informações Automáticas:
- **Tipo de desenho:** Polígono, Retângulo, Círculo, ou Mão Livre
- **Área calculada:** Em hectares (ha)
- **Perímetro calculado:** Em metros (m)

### ✍️ Campos Obrigatórios:
1. **Nome da Área** *
   - Exemplo: "Talhão 1", "Pivô Central Norte", "Área de Soja"
   - Preenche automaticamente com "Área 1", "Área 2", etc.

2. **Produtor** *
   - Selecione o produtor/cliente responsável pela área
   - Opções: João Silva, Maria Santos, Pedro Oliveira, Ana Costa, Carlos Souza

3. **Fazenda** *
   - Selecione a propriedade/fazenda onde está a área
   - Opções: Santa Maria, Boa Vista, São João, Esperança, Progresso

### 🔘 Botões:
- **Cancelar:** Descarta o desenho sem salvar
- **Salvar Área:** Confirma e salva no sistema (precisa preencher todos os campos)

---

## 🎯 Exemplo de Fluxo Completo

### Cenário: Desenhar um pivô central de 50 hectares

```
1. Dashboard → Menu Desenho (ícone lápis) → Círculo/Pivô 🔵

2. Mapa fica com cursor em cruz (+)

3. 1º CLIQUE no centro do pivô
   └─ Mensagem: "Clique para definir o raio"

4. Mova o mouse e veja o círculo crescer

5. 2º CLIQUE no final do raio desejado
   └─ Círculo é finalizado
   └─ Dialog abre automaticamente

6. DIALOG DE SALVAMENTO:
   ┌─────────────────────────────────────┐
   │ 🖊️ Salvar Área Desenhada           │
   ├─────────────────────────────────────┤
   │ Tipo: 🔵 Círculo/Pivô              │
   │ Área: 48.73 ha                     │
   │ Perímetro: 2,478 m                 │
   ├─────────────────────────────────────┤
   │ Nome da Área: [Pivô Central 1]     │
   │ Produtor: [João Silva ▼]           │
   │ Fazenda: [Santa Maria ▼]           │
   ├─────────────────────────────────────┤
   │ [Cancelar]  [Salvar Área]          │
   └─────────────────────────────────────┘

7. Preencher campos obrigatórios

8. Clicar "Salvar Área"
   ├─ Toast: ✅ "Área 'Pivô Central 1' salva com sucesso!"
   └─ Área aparece na lista de áreas desenhadas
```

---

## 📊 Lista de Áreas Desenhadas

Após salvar, a área aparece na lista no **canto inferior esquerdo** do Dashboard:

### Informações exibidas:
- ⚫ **Bolinha colorida** (cada área tem uma cor)
- 📝 **Nome da área**
- 📏 **Área em hectares**
- 📐 **Perímetro em metros**
- 🏷️ **Tipo** (Polígono, Retângulo, Círculo, Mão Livre)

### Ações disponíveis:
- ✏️ **Editar nome:** Clique no ícone de lápis
- 🗑️ **Deletar:** Clique no ícone de lixeira
- 📊 **Ver NDVI:** Selecione a área e clique em "Análise NDVI"
- 📥 **Exportar KML:** Exporta todas as áreas para arquivo KML

---

## 🔄 Cancelar Desenho

Se mudar de ideia:

### Durante o desenho:
- **Polígono/Crop:** Clique no `X` ou pressione `ESC`
- **Retângulo/Círculo:** Clique no `X` (antes do 2º clique)
- **Mão Livre:** Não tem cancelamento durante (soltar finaliza)

### No Dialog de Salvamento:
- Clique em **"Cancelar"**
- Ou clique fora do dialog
- O desenho será descartado

---

## ✅ Checklist de Desenho Bem-Sucedido

| Etapa | Status |
|-------|--------|
| ☑️ Ferramenta selecionada | ✓ |
| ☑️ Desenho finalizado corretamente | ✓ |
| ☑️ Dialog de salvamento abriu | ✓ |
| ☑️ Nome da área preenchido | ✓ |
| ☑️ Produtor selecionado | ✓ |
| ☑️ Fazenda selecionada | ✓ |
| ☑️ Botão "Salvar Área" clicado | ✓ |
| ☑️ Toast de confirmação | ✓ |
| ☑️ Área na lista inferior esquerda | ✓ |

---

## 🐛 Problemas Conhecidos (CORRIGIDOS)

### ❌ ANTES:
1. ~~Círculo salvava área incorreta~~
2. ~~Não tinha como selecionar produtor/fazenda~~
3. ~~Área salvava automaticamente sem confirmação~~

### ✅ AGORA:
1. ✅ Círculo calcula área corretamente usando 32 pontos
2. ✅ Dialog obrigatório com produtor e fazenda
3. ✅ Salvamento só após confirmação no dialog

---

## 📱 Dicas Pro

1. **Zoom antes de desenhar:** Use os botões +/- para ajustar o zoom
2. **Centralize a área:** Use o botão de bússola para posicionar
3. **Use a ferramenta certa:** 
   - Talhões regulares → Retângulo
   - Pivôs → Círculo
   - Áreas complexas → Polígono
   - Rapidez → Mão Livre
4. **Nomes descritivos:** Use nomes como "Talhão 1 - Soja" ao invés de "Área 1"
5. **Organize por fazenda:** Mantenha consistência nos nomes

---

## 🎨 Teclas de Atalho

| Ação | Tecla |
|------|-------|
| Finalizar Polígono | **Duplo Clique** |
| Finalizar Crop | **Duplo Clique** |
| Finalizar Retângulo | **2º Clique** |
| Finalizar Círculo | **2º Clique** |
| Finalizar Mão Livre | **Soltar Mouse** |
| Cancelar (Dialog) | **ESC** ou **Clique Fora** |

---

## 📞 Suporte

Se tiver dúvidas ou problemas:
1. Verifique se todos os campos obrigatórios (*) estão preenchidos
2. Tente recarregar a página
3. Use o modo demo para testar

**Versão do Documento:** 1.0  
**Última Atualização:** 2025-10-16
