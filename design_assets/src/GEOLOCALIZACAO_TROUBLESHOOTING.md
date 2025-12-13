# 🗺️ Geolocalização - SoloForte

## 📍 Funcionalidade Opcional

A geolocalização no SoloForte é uma **funcionalidade opcional** que melhora a experiência do usuário, mas o app funciona perfeitamente sem ela.

## ℹ️ Quando a localização não está disponível

Em alguns ambientes (como previews em iframe), a geolocalização pode estar bloqueada por **políticas de segurança do navegador**.

### 🔍 Causas Comuns

1. **App rodando em iframe sem permissões adequadas**
2. **Cabeçalho HTTP Permissions-Policy bloqueando geolocalização**
3. **Ambiente de preview/desenvolvimento com restrições**

---

## ✅ Soluções

### 1️⃣ Se o app está em um iframe

Adicione o atributo `allow="geolocation"` no iframe pai:

```html
<iframe 
  src="https://seu-app.com" 
  allow="geolocation"
>
</iframe>
```

**Melhor ainda**, use permissões completas:

```html
<iframe 
  src="https://seu-app.com" 
  allow="geolocation; camera; microphone"
>
</iframe>
```

### 2️⃣ Configurar Permissions-Policy no servidor

Se você tem controle sobre o servidor, configure o header HTTP:

```
Permissions-Policy: geolocation=(self)
```

Ou para permitir de qualquer origem (menos seguro):

```
Permissions-Policy: geolocation=*
```

### 3️⃣ Abrir em nova aba (solução imediata)

Se está testando em preview/iframe, abra o app diretamente em uma nova aba:
- Clique com botão direito → "Abrir em nova aba"
- Ou copie a URL e cole em uma nova aba

---

## 🎯 Solução Implementada no SoloForte

### Comportamento Atual

1. **Funcionalidade opcional**: App funciona perfeitamente sem geolocalização
2. **Sem solicitação automática**: O app NÃO pede localização automaticamente ao abrir
3. **Ativação manual**: Usuário clica no botão 📍 para ativar quando desejar
4. **Detecção silenciosa**: Sistema detecta bloqueios sem mostrar erros assustadores
5. **Mensagens amigáveis**: Apenas notificações informativas quando necessário

### Verificações Automáticas (Silenciosas)

O app verifica automaticamente **em segundo plano**:

- ✅ Se `geolocation` está disponível no navegador
- ✅ Se está em contexto seguro (HTTPS ou localhost)
- ✅ Se Permissions Policy permite geolocalização
- ✅ Tipo específico de erro ao solicitar

**Importante**: Todas as verificações são silenciosas - nenhum erro é exibido a menos que o usuário tente usar a funcionalidade.

---

## 🧪 Como Testar

### Teste 1: Verificar se funciona

1. Abra o app
2. Clique no botão de localização 📍 (círculo branco no canto superior direito)
3. Se funcionar: Ícone fica azul e mapa centraliza
4. Se não funcionar: Aparece mensagem informativa amigável

### Teste 2: Verificar console (apenas para debug)

Abra o console (F12) e execute:

```javascript
console.log('Geolocation:', 'geolocation' in navigator);
console.log('Secure Context:', window.isSecureContext);
console.log('In Iframe:', window.self !== window.top);
```

**Nota**: O app não exibe logs por padrão para manter o console limpo.

---

## 🚀 Ambientes de Deploy

### Figma Make / Preview

Se você está visualizando através do preview do Figma Make:
- O app pode estar em iframe
- **Solução**: Abra em nova aba usando o botão "Open in new tab"

### Vercel / Netlify / Deploy próprio

Configure o arquivo de cabeçalhos:

**vercel.json:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(self)"
        }
      ]
    }
  ]
}
```

**netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Permissions-Policy = "geolocation=(self)"
```

---

## 📱 Testes Mobile

### Chrome Android
1. Abra Chrome → Menu → Configurações
2. Configurações do site → Localização
3. Permita localização para o site

### Safari iOS
1. Configurações → Safari → Localização
2. Selecione "Ao usar o app"

---

## 🔒 Requisitos de Segurança

A API de Geolocalização **exige**:

1. ✅ **HTTPS** (ou localhost para desenvolvimento)
2. ✅ **Ação do usuário** (clique em botão)
3. ✅ **Permissão explícita** do navegador
4. ✅ **Permissions Policy** permitindo geolocation

---

## 🆘 Ainda não funciona?

### Checklist Final

- [ ] App está em HTTPS (ou localhost)?
- [ ] Abriu em nova aba (não iframe)?
- [ ] Clicou no botão de localização 📍?
- [ ] Permitiu quando o navegador pediu?
- [ ] Localização está ativa no sistema operacional?
- [ ] GPS está ativo no dispositivo?

### Logs para Compartilhar

Se ainda tiver problemas, compartilhe estes logs do console:

```javascript
// No console do navegador (F12), execute:
console.log('Geolocation:', 'geolocation' in navigator);
console.log('Secure Context:', window.isSecureContext);
console.log('Protocol:', window.location.protocol);
console.log('In Iframe:', window.self !== window.top);
```

---

## 📚 Referências

- [MDN: Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [MDN: Permissions Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)
- [W3C: Geolocation Specification](https://www.w3.org/TR/geolocation-API/)

---

## 💡 Dica Final

**A forma mais rápida de resolver**: Abra o app em uma **nova aba do navegador** diretamente, não através de iframe ou preview.

✅ O SoloForte foi projetado para funcionar perfeitamente quando acessado diretamente em smartphones!
