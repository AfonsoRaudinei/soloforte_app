# 🐛 GUIA RÁPIDO: Scanner de Pragas → Ocorrências

## 🎯 Resumo Ultra Rápido

**O scanner de pragas agora salva automaticamente como ocorrência técnica!**

### Antes ❌
```
Scanner de Pragas → Análise IA → Ver Resultado → FIM
(Usuário precisava criar ocorrência manualmente)
```

### Agora ✅
```
Scanner de Pragas → Análise IA → Ver Resultado → 
  [Botão: Salvar como Ocorrência] → 
    Automático: Mapa + Relatórios atualizados!
```

## 🚀 Como Usar (3 passos)

### 1️⃣ Escanear Praga
- Abra Scanner de Pragas (menu FAB)
- Tire foto da praga
- Opcionalmente: adicione cultura, fazenda, localização
- Clique "Analisar Praga"

### 2️⃣ Ver Resultado
Após análise, você verá:
- 🐛 Nome da praga
- 🔬 Nome científico
- 📊 Confiança da IA (%)
- ⚠️ Severidade (baixa/média/alta/crítica)
- 💊 Tratamentos recomendados
- 🛡️ Medidas preventivas

### 3️⃣ Salvar como Ocorrência
- Clique em **"Salvar como Ocorrência Técnica"**
- ✅ Pronto! Marcador aparece no mapa
- ✅ Dados salvos no relatório
- ✅ Recomendações incluídas

## 📊 O Que é Salvo Automaticamente?

| Dado do Scanner | Vira Ocorrência |
|-----------------|-----------------|
| 🐛 Nome da praga | Tipo: Inseto |
| ⚠️ Severidade | Severidade + % |
| 📸 Foto | Anexo da ocorrência |
| 💊 Tratamentos | Recomendações |
| 🌱 Práticas culturais | Notas |
| 📍 Localização | GPS no mapa |
| ✓ Confiança IA | Incluído nas notas |

## 🎨 Exemplo Visual do Botão

```
┌─────────────────────────────────────────┐
│  📄  Salvar como Ocorrência Técnica     │
│                                         │
│  Registre este diagnóstico como         │
│  ocorrência técnica. Ele será           │
│  adicionado ao mapa e incluído          │
│  automaticamente nos relatórios.        │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  💾 Salvar como Ocorrência        │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## 💡 Dicas Pro

### ✅ Boas Práticas
- Sempre preencha "Cultura" e "Fazenda" antes de analisar
- Tire fotos nítidas e bem iluminadas
- Adicione observações no campo "Informações Extras"
- Use o GPS para localização precisa

### ⚡ Atalhos
- Scanner aparece direto no menu FAB (ícone 🐛)
- Após salvar, volte ao Dashboard para ver no mapa
- Acesse Relatórios para ver dados completos

### 🔄 Follow-up
- Volte ao mesmo local após tratamento
- Tire nova foto
- Crie nova ocorrência (será marcada como follow-up se mesma localização)

## 📱 Mobile vs Desktop

### Mobile (Recomendado)
- ✅ Câmera nativa do celular
- ✅ GPS real do dispositivo
- ✅ Fotos de alta qualidade
- ✅ Uso em campo

### Desktop
- ⚠️ Upload de fotos apenas
- ⚠️ GPS padrão (São Paulo)
- ✅ Análise de fotos existentes
- ✅ Revisão de diagnósticos

## 🎯 Casos de Uso

### Caso 1: Visita a Campo
```
1. Chega na fazenda
2. Faz check-in
3. Encontra praga
4. Scanner → Análise IA → Salvar
5. Check-out
6. Relatório gerado automaticamente com:
   - Duração da visita
   - Localização
   - Praga identificada
   - Recomendações
```

### Caso 2: Monitoramento Preventivo
```
1. Rota semanal de inspeção
2. Scanner em cada talhão
3. Salva apenas casos com severidade > 30%
4. Dashboard mostra mapa de calor
5. Relatório executivo com tendências
```

### Caso 3: Consultoria Técnica
```
1. Cliente envia foto da praga
2. Analisa no scanner
3. Salva como ocorrência
4. Exporta relatório com recomendações
5. Envia por email/WhatsApp
```

## 🔍 Entendendo os Status

| Severidade | % | Status Automático |
|------------|---|-------------------|
| Baixa | 25% | 🟢 Controlada |
| Média | 50% | 🟡 Em Monitoramento |
| Alta | 75% | 🟠 Ativa |
| Crítica | 90% | 🔴 Ativa |

## 📈 Relatórios Incluem

### Notas Formatadas
```
🐛 PRAGA IDENTIFICADA: Lagarta-da-soja
(Anticarsia gemmatalis)

✓ Confiança: 94%

📋 DESCRIÇÃO:
[Descrição completa da IA...]

📍 CONTEXTO:
Cultura: Soja | Fazenda: São João | MT

💊 TRATAMENTOS RECOMENDADOS:
1. 🧪 Deltametrina (Prioridade 1)
   • Dosagem: 200ml/ha
   • Carência: 21 dias
...
```

## ⚠️ Importante Saber

### ✅ Funciona
- Modo demo (localStorage)
- Salvamento local
- Sincronização com mapa
- Inclusão em relatórios

### 🚧 Precisa Configurar
- API key do OpenAI (para IA funcionar)
- GPS real (caso contrário usa padrão SP)
- Backend para modo produção

## 🆘 Troubleshooting

### Botão não aparece?
- ✅ Certifique-se que análise foi completada
- ✅ Verifique se praga foi identificada
- ✅ Status deve ser "completed"

### Marcador não aparece no mapa?
- ✅ Volte ao Dashboard
- ✅ Recarregue a página
- ✅ Verifique localStorage (DevTools)

### Dados não aparecem no relatório?
- ✅ Confirme que salvou como ocorrência
- ✅ Verifique filtro de datas nos relatórios
- ✅ Veja se tipo "Inseto" está selecionado

## 🎓 Recursos de Aprendizado

1. **Documentação Completa:** `/UNIFICACAO_SCANNER_PRAGAS.md`
2. **Código do Conversor:** `/utils/pestToOccurrence.ts`
3. **Componente Scanner:** `/components/PestScanner.tsx`

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique logs no console (F12)
2. Consulte documentação técnica
3. Entre em contato com suporte

---

**Versão:** 1.0  
**Última Atualização:** Janeiro 2025  
**Status:** ✅ Produção Ready
