<?php
$host = "localhost";
$db = "pantry_healthy";
$user = "root"; // ou o usuário que você configurou no WAMP
$pass = "";     // a senha do MySQL, se houver

try {
    $conn = new PDO("Server=localhost;Port=3306;User Id=root;Password=;Database=pantry_healthy;");
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}
?>

