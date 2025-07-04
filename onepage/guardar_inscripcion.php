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
$nombre   = $_POST['nombre'] ?? '';
$telefono = $_POST['telefono'] ?? '';
$email    = $_POST['email'] ?? '';
$genero   = $_POST['genero'] ?? '';
$edad     = $_POST['edad'] ?? '';
$curso    = $_POST['curso'] ?? '';
$stmt = $pdo->prepare('INSERT INTO inscripciones (nombre, telefono, email, genero, edad, curso) VALUES (?,?,?,?,?,?)');
try {
    $stmt->execute([$nombre, $telefono, $email, $genero, $edad, $curso]);
    echo 'ok';
} catch (PDOException $e) {
    http_response_code(500);
    echo 'Error al guardar';
}
?>
