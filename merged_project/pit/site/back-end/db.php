<?php
$host = "localhost";
$db = "pantry_healthy";
$user = "root";
$pass = ""; // WAMP por padrão não tem senha

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão realizada com sucesso!";
} catch(PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>