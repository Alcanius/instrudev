<?php
session_start();
if (!isset($_SESSION['admin'])) {
    http_response_code(403);
    echo 'No autorizado';
    exit;
}

$host = 'localhost';
$db   = 'instrudev';
$user = 'usuario';
$pass = 'clave';
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, $user, $pass, $options);

$titulo  = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$desc_larga  = $_POST['descripcion_larga'] ?? '';
$costo   = $_POST['costo'] ?? 0;
$imagen  = $_POST['imagen'] ?? '';
$prog    = $_POST['progreso'] ?? 0;

$stmt = $pdo->prepare('INSERT INTO cursos (titulo, descripcion, descripcion_larga, costo, imagen, progreso) VALUES (?,?,?,?,?,?)');
$stmt->execute([$titulo, $descripcion, $desc_larga, $costo, $imagen, $prog]);

header('Location: index.php');
