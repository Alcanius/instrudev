<?php
header('Content-Type: application/json; charset=utf-8');
$host = 'localhost';
$db   = 'instrudev';
$user = 'usuario';
$pass = 'clave';
$dsn  = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    $stmt = $pdo->query('SELECT titulo, descripcion, descripcion_larga, costo, imagen, progreso FROM cursos ORDER BY id DESC');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([]);
}
