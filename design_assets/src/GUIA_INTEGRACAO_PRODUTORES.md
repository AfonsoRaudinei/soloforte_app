# 🌾 Guia de Integração de Produtores - SoloForte

## 📋 Visão Geral

Sistema completo de gerenciamento de produtores com integração a sistemas externos, permitindo que consultores gerenciem seus clientes de forma eficiente.

## 🎯 Funcionalidades Implementadas

### 1. Gerenciamento de Produtores
- ✅ Listar todos os produtores do consultor
- ✅ Adicionar produtor manualmente
- ✅ Editar informações do produtor
- ✅ Excluir produtor
- ✅ Buscar/filtrar produtores
- ✅ Visualizar detalhes expandidos

### 2. Sincronização com Sistema Externo
- ✅ Conectar com API externa para importar produtores
- ✅ Suporte a autenticação via Bearer Token
- ✅ Mapeamento automático de campos
- ✅ Atualização em lote

### 3. Gerenciamento de Talhões
- ✅ Listar talhões por produtor
- ✅ Adicionar/editar talhões
- ✅ Associar coordenadas geográficas

## 🔌 API Endpoints

### Produtores

#### Listar Produtores
```http
GET /make-server-b2d55462/produtores
Authorization: Bearer {access_token}
```

**Resposta:**
```json
{
  "success": true,
  "produtores": [
    {
      "id": "uuid",
      "nome": "João Silva",
      "email": "joao@email.com",
      "whatsapp": "(11) 98765-4321",
      "fazenda": "Fazenda Boa Vista",
      "cidade": "Ribeirão Preto",
      "estado": "SP",
      "ativo": true
    }
  ]
}
```

#### Buscar Produtor Específico
```http
GET /make-server-b2d55462/produtores/{produtorId}
Authorization: Bearer {access_token}
```

#### Criar Produtor
```http
POST /make-server-b2d55462/produtores
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "whatsapp": "(16) 99876-5432",
  "fazenda": "Fazenda Esperança",
  "cidade": "Goiânia",
  "estado": "GO"
}
```

#### Atualizar Produtor
```http
PUT /make-server-b2d55462/produtores/{produtorId}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nome": "Maria Santos Silva",
  "email": "maria.nova@email.com"
}
```

#### Excluir Produtor
```http
DELETE /make-server-b2d55462/produtores/{produtorId}
Authorization: Bearer {access_token}
```

### Sincronização

#### Sincronizar do Sistema Externo
```http
POST /make-server-b2d55462/produtores/sync
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "apiUrl": "https://sistema-externo.com/api/produtores",
  "apiToken": "seu-token-aqui"  // Opcional
}
```

**Resposta:**
```json
{
  "success": true,
  "count": 15,
  "produtores": [...]
}
```

### Talhões

#### Listar Talhões de um Produtor
```http
GET /make-server-b2d55462/produtores/{produtorId}/talhoes
Authorization: Bearer {access_token}
```

#### Criar/Atualizar Talhão
```http
POST /make-server-b2d55462/produtores/{produtorId}/talhoes
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "nome": "Talhão A",
  "area": "50 ha",
  "cultura": "Soja",
  "coordenadas": {...}
}
```

## 🔧 Uso no Frontend

### Hook useProdutores

```tsx
import { useProdutores } from '../utils/hooks/useProdutores';

function MeuComponente() {
  const { 
    produtores,        // Lista de produtores
    loading,           // Estado de carregamento
    error,             // Mensagem de erro
    status,            // Status: 'idle' | 'loading' | 'success' | 'error'
    refetch,           // Recarregar lista
    syncFromExternal,  // Sincronizar com sistema externo
    createProdutor,    // Criar novo produtor
    updateProdutor,    // Atualizar produtor
    deleteProdutor,    // Excluir produtor
    getProdutor        // Buscar produtor específico com detalhes
  } = useProdutores(accessToken);

  // Exemplo: Criar produtor
  const handleCreate = async () => {
    await createProdutor({
      nome: 'José Silva',
      whatsapp: '(11) 98765-4321',
      email: 'jose@email.com',
      fazenda: 'Fazenda Nova'
    });
  };

  // Exemplo: Sincronizar
  const handleSync = async () => {
    await syncFromExternal(
      'https://api.meusistema.com/produtores',
      'meu-token-secreto'
    );
  };
}
```

## 🌐 Formato da API Externa

O sistema espera que a API externa retorne dados no seguinte formato:

### Opção 1: Array Direto
```json
[
  {
    "id": "ext-001",
    "nome": "João Silva",
    "email": "joao@email.com",
    "whatsapp": "(11) 98765-4321",
    "fazenda": "Fazenda Boa Vista",
    "cidade": "Ribeirão Preto",
    "estado": "SP"
  },
  ...
]
```

### Opção 2: Objeto com Array
```json
{
  "produtores": [...],
  // ou
  "data": [...]
}
```

### Mapeamento de Campos

O sistema faz mapeamento automático dos seguintes campos:

| Campo Sistema | Campos Aceitos da API Externa |
|---------------|-------------------------------|
| `id` | `id`, `produtor_id`, `external_id` |
| `nome` | `nome`, `name` |
| `email` | `email` |
| `whatsapp` | `whatsapp`, `telefone`, `phone` |
| `telefone` | `telefone`, `phone` |
| `cpfCnpj` | `cpf`, `cnpj`, `cpfCnpj` |
| `fazenda` | `fazenda`, `propriedade` |
| `cidade` | `cidade`, `city` |
| `estado` | `estado`, `uf`, `state` |
| `endereco` | `endereco`, `address` |
| `ativo` | `ativo` (default: true) |

## 📱 Interface de Usuário

### Tela de Produtores

A tela de produtores oferece:

1. **Header**
   - Contador de produtores
   - Botão "Adicionar" (manual)
   - Botão "Sincronizar" (sistema externo)
   - Botão "Atualizar"

2. **Busca**
   - Filtrar por nome ou fazenda
   - Busca em tempo real

3. **Lista de Produtores**
   - Avatar com inicial do nome
   - Nome e fazenda
   - Status (Ativo/Inativo)
   - Botões de editar e excluir
   - Expandir para ver detalhes

4. **Detalhes Expandidos**
   - Informações de contato (WhatsApp, Email, Localização)
   - Abas:
     - **Talhões**: Lista de áreas do produtor
     - **Estoque**: Produtos em estoque
     - **Aplicações**: Histórico de aplicações

### Dialogs

#### 1. Dialog de Sincronização
```
- URL da API
- Token de autenticação (opcional)
- Botão Sincronizar
```

#### 2. Dialog de Adicionar/Editar
```
- Nome (obrigatório)
- WhatsApp (obrigatório)
- Email
- Fazenda
- Cidade
- Estado
```

## 🔒 Segurança

### Autenticação
- Todas as rotas requerem autenticação via Bearer Token
- O token é validado em cada requisição
- Apenas o consultor pode ver seus próprios produtores

### Isolamento de Dados
- Cada consultor só acessa seus próprios produtores
- Dados armazenados com prefixo `consultor:{consultorId}:produtor:{produtorId}`
- Impossível acessar dados de outros consultores

## 🎨 Modo Demo

O sistema suporta modo demo com dados fictícios:

```tsx
const { isDemoMode } = useDemo();

// Se isDemoMode === true, mostra dados de exemplo
// Botões de sincronização ficam desabilitados
```

## 📊 Estrutura de Dados

### Produtor
```typescript
interface Produtor {
  id: string;
  consultorId: string;
  nome: string;
  email: string;
  whatsapp: string;
  telefone?: string;
  cpfCnpj?: string;
  fazenda?: string;
  cidade?: string;
  estado?: string;
  endereco?: string;
  ativo: boolean;
  syncedFrom?: 'manual' | 'external';
  externalId?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Talhão
```typescript
interface Talhao {
  id: string;
  produtorId: string;
  consultorId: string;
  nome: string;
  area: string;
  cultura?: string;
  coordenadas?: any;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Exemplos de Integração

### Sistema PHP/Laravel
```php
Route::get('/api/produtores', function () {
    return Produtor::select([
        'id',
        'nome',
        'email',
        'whatsapp',
        'fazenda',
        'cidade',
        'estado'
    ])->where('ativo', true)->get();
});
```

### Sistema Node.js/Express
```javascript
app.get('/api/produtores', async (req, res) => {
  const produtores = await db.produtores.findMany({
    where: { ativo: true },
    select: {
      id: true,
      nome: true,
      email: true,
      whatsapp: true,
      fazenda: true,
      cidade: true,
      estado: true
    }
  });
  
  res.json(produtores);
});
```

### Sistema Python/Django
```python
@api_view(['GET'])
def listar_produtores(request):
    produtores = Produtor.objects.filter(ativo=True).values(
        'id', 'nome', 'email', 'whatsapp', 
        'fazenda', 'cidade', 'estado'
    )
    return Response(list(produtores))
```

## 🐛 Troubleshooting

### Erro: "Erro ao sincronizar produtores"
- Verificar se a URL da API está correta
- Verificar se o token de autenticação é válido
- Verificar se a API retorna o formato esperado
- Verificar logs do servidor para detalhes

### Produtores não aparecem após sincronização
- Verificar se o accessToken está sendo passado corretamente
- Chamar `refetch()` após sincronização
- Verificar console do navegador para erros

### Campos vazios após sincronização
- Verificar mapeamento de campos na API externa
- Ajustar nomes dos campos no backend se necessário
- Verificar se a API retorna todos os campos

## 📝 Notas Importantes

1. **Performance**: O sistema usa cache local para evitar chamadas desnecessárias à API
2. **Logs**: Todos os eventos são logados via `logger.ts` (apenas em desenvolvimento)
3. **Toast**: Feedback visual para todas as ações (sucesso/erro)
4. **Validação**: Campos obrigatórios são validados antes de enviar ao servidor
5. **UX**: Loading states e skeletons para melhor experiência do usuário

## 🔄 Próximas Melhorias Sugeridas

- [ ] Importação via arquivo CSV
- [ ] Exportação de produtores
- [ ] Fotos de perfil dos produtores
- [ ] Sincronização automática em segundo plano
- [ ] Notificações de novos produtores
- [ ] Filtros avançados (por cidade, estado, status)
- [ ] Paginação para grandes volumes de dados
- [ ] Dashboard de estatísticas por produtor
