<?php
header('Content-Type: text/plain; charset=utf-8');
$host = 'localhost';
$db = 'instrudev';
$user = 'usuario';
$pass = 'clave';
$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
];
try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    echo 'Error de conexion';
    exit;
}
$nombre  = $_POST['name'] ?? '';
$email   = $_POST['email'] ?? '';
$mensaje = $_POST['message'] ?? '';
$stmt = $pdo->prepare('INSERT INTO contactos (nombre, email, mensaje) VALUES (?,?,?)');
try {
    $stmt->execute([$nombre, $email, $mensaje]);
    echo 'ok';
} catch (PDOException $e) {
    http_response_code(500);
    echo 'Error al guardar';
}
?>
