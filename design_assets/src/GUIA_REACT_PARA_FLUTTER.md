# 🔄 GUIA DE CONVERSÃO: REACT → FLUTTER

## 🎯 Objetivo
Mapear todos os componentes e padrões do SoloForte React para Flutter equivalentes.

---

## 📦 COMPONENTES UI - MAPEAMENTO 1:1

### Botões

| React (SoloForte) | Flutter Equivalente | Exemplo |
|-------------------|---------------------|---------|
| `<Button>` | `ElevatedButton` | Botão principal |
| `<Button variant="outline">` | `OutlinedButton` | Botão secundário |
| `<Button variant="ghost">` | `TextButton` | Botão discreto |
| `<Button disabled>` | `ElevatedButton(onPressed: null)` | Desabilitado |

```dart
// Flutter equivalente ao <Button>
ElevatedButton(
  onPressed: () => handleLogin(),
  style: ElevatedButton.styleFrom(
    backgroundColor: Color(0xFF0057FF),
    foregroundColor: Colors.white,
    padding: EdgeInsets.symmetric(vertical: 16, horizontal: 24),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
  child: Text('Entrar'),
)
```

---

### Inputs

| React (SoloForte) | Flutter Equivalente |
|-------------------|---------------------|
| `<Input type="email">` | `TextField(keyboardType: TextInputType.emailAddress)` |
| `<Input type="password">` | `TextField(obscureText: true)` |
| `<Textarea>` | `TextField(maxLines: 5)` |
| `<Select>` | `DropdownButton` |

```dart
// Flutter equivalente ao <Input>
TextField(
  controller: emailController,
  keyboardType: TextInputType.emailAddress,
  decoration: InputDecoration(
    labelText: 'Email',
    prefixIcon: Icon(Icons.mail),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
)
```

---

### Cards e Containers

| React (SoloForte) | Flutter Equivalente |
|-------------------|---------------------|
| `<Card>` | `Card` |
| `<CardHeader>` | `Card` com `Column` + `Padding` |
| `<CardContent>` | `Padding` |
| `<div className="...">` | `Container` |

```dart
// Flutter equivalente ao <Card>
Card(
  elevation: 2,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Título', style: Theme.of(context).textTheme.titleLarge),
        SizedBox(height: 8),
        Text('Conteúdo'),
      ],
    ),
  ),
)
```

---

### Dialogs e Modais

| React (SoloForte) | Flutter Equivalente |
|-------------------|---------------------|
| `<Dialog>` | `showDialog()` + `AlertDialog` |
| `<Sheet>` | `showModalBottomSheet()` |
| `<AlertDialog>` | `AlertDialog` |
| `<Toast>` (sonner) | `ScaffoldMessenger.showSnackBar()` |

```dart
// Flutter equivalente ao <Dialog>
showDialog(
  context: context,
  builder: (BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      title: Text('Título'),
      content: Text('Conteúdo do dialog'),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () {
            // Ação
            Navigator.of(context).pop();
          },
          child: Text('Confirmar'),
        ),
      ],
    );
  },
);
```

---

### Navegação

| React (SoloForte) | Flutter Equivalente |
|-------------------|---------------------|
| `navigate('/dashboard')` | `Navigator.pushNamed(context, '/dashboard')` |
| `navigate(-1)` | `Navigator.pop(context)` |
| `<Tabs>` | `TabBar` + `TabBarView` |
| `<ArrowLeft onClick={...}>` | `IconButton(icon: Icon(Icons.arrow_back))` |

```dart
// Flutter equivalente ao navigate()
Navigator.pushNamed(context, '/dashboard');

// Voltar
Navigator.pop(context);

// Tabs
TabBar(
  tabs: [
    Tab(icon: Icon(Icons.map), text: 'Mapa'),
    Tab(icon: Icon(Icons.list), text: 'Lista'),
  ],
)
```

---

### Badges e Labels

| React (SoloForte) | Flutter Equivalente |
|-------------------|---------------------|
| `<Badge>` | `Badge` (Material 3) ou `Chip` |
| `<Badge variant="outline">` | `Chip(side: BorderSide(...))` |
| `<Badge className="bg-red-500">` | `Chip(backgroundColor: Colors.red)` |

```dart
// Flutter equivalente ao <Badge>
Chip(
  label: Text('Premium'),
  backgroundColor: Color(0xFF0057FF),
  labelStyle: TextStyle(color: Colors.white),
  padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
)
```

---

## 🎨 ESTILOS - MAPEAMENTO

### Cores

| Tailwind (React) | Flutter | Valor Hex |
|------------------|---------|-----------|
| `bg-[#0057FF]` | `Color(0xFF0057FF)` | #0057FF |
| `text-white` | `Colors.white` | #FFFFFF |
| `text-gray-600` | `Colors.grey[600]` | #757575 |
| `bg-red-500` | `Colors.red[500]` | #F44336 |

```dart
// Definir cores customizadas
class AppColors {
  static const Color primary = Color(0xFF0057FF);
  static const Color primaryHover = Color(0xFF0046CC);
  static const Color success = Color(0x FF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
}
```

---

### Spacing

| Tailwind (React) | Flutter | Pixels |
|------------------|---------|--------|
| `p-1` | `padding: 4` | 4px |
| `p-2` | `padding: 8` | 8px |
| `p-4` | `padding: 16` | 16px |
| `p-6` | `padding: 24` | 24px |
| `gap-4` | `SizedBox(height: 16)` | 16px |

```dart
// Flutter equivalente aos paddings
Padding(
  padding: EdgeInsets.all(16), // p-4
  child: Column(
    children: [
      Text('Item 1'),
      SizedBox(height: 16), // gap-4
      Text('Item 2'),
    ],
  ),
)
```

---

### Border Radius

| Tailwind (React) | Flutter |
|------------------|---------|
| `rounded` | `BorderRadius.circular(4)` |
| `rounded-lg` | `BorderRadius.circular(8)` |
| `rounded-xl` | `BorderRadius.circular(12)` |
| `rounded-2xl` | `BorderRadius.circular(16)` |
| `rounded-full` | `BorderRadius.circular(999)` |

```dart
// Flutter equivalente ao rounded-xl
Container(
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
  ),
)
```

---

### Shadow

| Tailwind (React) | Flutter |
|------------------|---------|
| `shadow` | `elevation: 1` |
| `shadow-md` | `elevation: 3` |
| `shadow-lg` | `elevation: 6` |
| `shadow-xl` | `elevation: 12` |
| `shadow-2xl` | `elevation: 24` |

```dart
// Flutter equivalente ao shadow-2xl
Card(
  elevation: 24,
  child: ...,
)
```

---

## 📱 LAYOUT - MAPEAMENTO

### Flexbox

| React (Tailwind) | Flutter |
|------------------|---------|
| `flex` | `Row` ou `Column` |
| `flex-col` | `Column` |
| `flex-row` | `Row` |
| `justify-center` | `mainAxisAlignment: MainAxisAlignment.center` |
| `items-center` | `crossAxisAlignment: CrossAxisAlignment.center` |
| `gap-4` | `SizedBox(width/height: 16)` |

```dart
// Flutter equivalente ao flex
Row(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Text('Item 1'),
    SizedBox(width: 16), // gap-4
    Text('Item 2'),
  ],
)
```

---

### Grid

| React (Tailwind) | Flutter |
|------------------|---------|
| `grid grid-cols-2` | `GridView.count(crossAxisCount: 2)` |
| `grid grid-cols-3` | `GridView.count(crossAxisCount: 3)` |
| `gap-4` | `crossAxisSpacing: 16, mainAxisSpacing: 16` |

```dart
// Flutter equivalente ao grid
GridView.count(
  crossAxisCount: 2,
  crossAxisSpacing: 16,
  mainAxisSpacing: 16,
  children: [
    Card(child: ...),
    Card(child: ...),
  ],
)
```

---

## 🔄 ESTADO - MAPEAMENTO

### React Hooks → Flutter State

| React | Flutter |
|-------|---------|
| `useState` | `State` + `setState` |
| `useEffect` | `initState` + `didChangeDependencies` |
| `useRef` | `late final` + variável |
| `useMemo` | `late final` (computado uma vez) |
| `useCallback` | Método da classe |

```dart
// React useState → Flutter State
class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String email = '';
  String password = '';
  bool loading = false;

  void handleLogin() {
    setState(() {
      loading = true;
    });
    
    // Lógica de login
    
    setState(() {
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          TextField(
            onChanged: (value) => setState(() => email = value),
          ),
          ElevatedButton(
            onPressed: loading ? null : handleLogin,
            child: Text('Entrar'),
          ),
        ],
      ),
    );
  }
}
```

---

## 🎯 COMPONENTES ESPECÍFICOS SOLOFORTE

### Dashboard Card

**React:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Total de Visitas</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">127</div>
    <p className="text-sm text-gray-500">+12% vs mês anterior</p>
  </CardContent>
</Card>
```

**Flutter:**
```dart
Card(
  elevation: 2,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(16),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Total de Visitas',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 12),
        Text(
          '127',
          style: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 4),
        Text(
          '+12% vs mês anterior',
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
          ),
        ),
      ],
    ),
  ),
)
```

---

### FAB (Floating Action Button)

**React:**
```tsx
<button
  className="fixed bottom-4 right-4 w-16 h-16 bg-[#0057FF] rounded-full"
  onClick={handleAdd}
>
  <Plus className="h-7 w-7" />
</button>
```

**Flutter:**
```dart
FloatingActionButton(
  onPressed: handleAdd,
  backgroundColor: Color(0xFF0057FF),
  child: Icon(Icons.add, size: 28),
)
```

---

## 📊 PERSISTÊNCIA - MAPEAMENTO

### localStorage → SharedPreferences

**React:**
```typescript
localStorage.setItem('session', JSON.stringify(user));
const session = JSON.parse(localStorage.getItem('session') || '{}');
```

**Flutter:**
```dart
// Adicionar dependência: shared_preferences

final prefs = await SharedPreferences.getInstance();

// Salvar
await prefs.setString('session', jsonEncode(user));

// Ler
final sessionStr = prefs.getString('session') ?? '{}';
final session = jsonDecode(sessionStr);
```

---

## 🎨 DESIGN SYSTEM COMPLETO EM FLUTTER

```dart
// lib/core/theme/app_theme.dart

class AppTheme {
  // Cores
  static const Color primary = Color(0xFF0057FF);
  static const Color primaryHover = Color(0xFF0046CC);
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  
  // Spacing
  static const double space1 = 4.0;
  static const double space2 = 8.0;
  static const double space3 = 12.0;
  static const double space4 = 16.0;
  static const double space6 = 24.0;
  static const double space8 = 32.0;
  
  // Border Radius
  static const double radiusSm = 8.0;
  static const double radiusMd = 12.0;
  static const double radiusLg = 16.0;
  static const double radiusXl = 24.0;
  
  // Theme
  static ThemeData get theme => ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primary,
      primary: primary,
    ),
    scaffoldBackgroundColor: Colors.grey[50],
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: Colors.black,
      elevation: 0,
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(radiusLg),
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primary,
        foregroundColor: Colors.white,
        padding: EdgeInsets.symmetric(
          vertical: space4,
          horizontal: space6,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(radiusMd),
        ),
      ),
    ),
  );
}
```

---

## ✅ CHECKLIST DE CONVERSÃO

### Para cada tela React:
- [ ] Identificar componentes usados
- [ ] Mapear para widgets Flutter
- [ ] Converter estilos Tailwind para Theme
- [ ] Implementar gerenciamento de estado
- [ ] Replicar lógica de negócio (se houver)
- [ ] Testar visual pixel-perfect

### Ferramentas úteis:
- **Figma**: Inspecionar design original
- **DevTools**: Medir espaçamentos/cores
- **Flutter Inspector**: Validar hierarquia de widgets
- **Hot Reload**: Ajustes visuais rápidos

---

## 🎯 PRÓXIMO PASSO

Converter primeira tela: **Login**
1. Criar `lib/presentation/pages/login_page.dart`
2. Implementar UI usando widgets mapeados
3. Adicionar lógica mock (aceitar qualquer email/senha)
4. Salvar sessão em SharedPreferences
5. Navegar para Dashboard

**Pronto para começar? 🚀**
