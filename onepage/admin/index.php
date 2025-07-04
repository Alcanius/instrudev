<?php
session_start();
$logged = isset($_SESSION['admin']);

$host = 'localhost';
$db   = 'instrudev';
$user = 'usuario';
$pass = 'clave';
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, $user, $pass, $options);

if (!$logged && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $u = $_POST['user'] ?? '';
    $p = $_POST['pass'] ?? '';
    if ($u === 'admin' && $p === 'password') {
        $_SESSION['admin'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Credenciales inválidas';
    }
}

if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: index.php');
    exit;
}

if ($logged) {
    $cursos = $pdo->query('SELECT * FROM cursos ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
    $ins = $pdo->query('SELECT * FROM inscripciones ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
    $msgs = $pdo->query('SELECT * FROM contactos ORDER BY id DESC')->fetchAll(PDO::FETCH_ASSOC);
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Instrudev</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            electric: '#1e90ff',
            magenta: '#ff2d95',
            accentyellow: '#FFC107'
          },
          fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            inter: ['Inter', 'sans-serif']
          }
        }
      }
    }
  </script>
  <style>body{font-family:'Inter',sans-serif;}</style>
</head>
<body class="bg-[#0F172A] text-white">
<div class="container mx-auto py-10">
<?php if (!$logged): ?>
  <h1 class="text-3xl font-poppins font-bold mb-6 text-center">Admin Login</h1>
  <?php if (!empty($error)) echo '<p class="text-red-500 text-center">'.$error.'</p>'; ?>
  <form method="POST" class="max-w-sm mx-auto bg-[#111827] p-6 rounded space-y-4">
    <label class="block">
      <span class="text-sm">Usuario</span>
      <input type="text" name="user" class="w-full p-2 text-black" required>
    </label>
    <label class="block">
      <span class="text-sm">Contraseña</span>
      <input type="password" name="pass" class="w-full p-2 text-black" required>
    </label>
    <button type="submit" class="bg-accentyellow text-black px-4 py-2 rounded w-full font-semibold">Ingresar</button>
  </form>
<?php else: ?>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-poppins font-bold">Panel de Administración</h1>
    <a href="?logout=1" class="text-magenta font-semibold">Cerrar sesión</a>
  </div>

  <section class="mb-10">
    <h2 class="text-xl font-bold mb-4">Crear Curso</h2>
    <form action="crear_curso.php" method="POST" class="grid sm:grid-cols-2 gap-4 bg-[#111827] p-4 rounded">
      <input type="text" name="titulo" placeholder="Título" required class="p-2 text-black">
      <input type="text" name="imagen" placeholder="URL de imagen" required class="p-2 text-black">
      <input type="number" step="0.01" name="costo" placeholder="Costo" required class="p-2 text-black">
      <input type="number" name="progreso" placeholder="% popularidad" class="p-2 text-black">
      <textarea name="descripcion" placeholder="Descripción corta" required class="p-2 text-black sm:col-span-2"></textarea>
      <textarea name="descripcion_larga" placeholder="Descripción larga" class="p-2 text-black sm:col-span-2"></textarea>
      <button type="submit" class="bg-accentyellow text-black px-4 py-2 rounded font-semibold sm:col-span-2">Guardar</button>
    </form>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-bold mb-4">Cursos existentes</h2>
    <div class="overflow-x-auto">
    <table class="min-w-full text-sm text-left">
      <thead><tr><th class="p-2">ID</th><th class="p-2">Título</th><th class="p-2">Costo</th></tr></thead>
      <tbody>
      <?php foreach($cursos as $c): ?>
        <tr class="border-t border-gray-700">
          <td class="p-2"><?= $c['id'] ?></td>
          <td class="p-2"><?= htmlspecialchars($c['titulo']) ?></td>
          <td class="p-2">$<?= htmlspecialchars($c['costo']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
  </section>

  <section class="mb-10">
    <h2 class="text-xl font-bold mb-4">Inscripciones</h2>
    <div class="overflow-x-auto">
    <table class="min-w-full text-sm text-left">
      <thead><tr><th class="p-2">Nombre</th><th class="p-2">Teléfono</th><th class="p-2">Email</th><th class="p-2">Curso</th></tr></thead>
      <tbody>
      <?php foreach($ins as $i): ?>
        <tr class="border-t border-gray-700">
          <td class="p-2"><?= htmlspecialchars($i['nombre']) ?></td>
          <td class="p-2"><?= htmlspecialchars($i['telefono']) ?></td>
          <td class="p-2"><?= htmlspecialchars($i['email']) ?></td>
          <td class="p-2"><?= htmlspecialchars($i['curso']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
  </section>

  <section>
    <h2 class="text-xl font-bold mb-4">Mensajes de Contacto</h2>
    <div class="overflow-x-auto">
    <table class="min-w-full text-sm text-left">
      <thead><tr><th class="p-2">Nombre</th><th class="p-2">Email</th><th class="p-2">Mensaje</th></tr></thead>
      <tbody>
      <?php foreach($msgs as $m): ?>
        <tr class="border-t border-gray-700">
          <td class="p-2"><?= htmlspecialchars($m['nombre']) ?></td>
          <td class="p-2"><?= htmlspecialchars($m['email']) ?></td>
          <td class="p-2"><?= htmlspecialchars($m['mensaje']) ?></td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
    </div>
  </section>
<?php endif; ?>
</div>
</body>
</html>
