<?php
require 'db.php';

$sql = "SELECT * FROM usuarios";
$stmt = $conn->query($sql);
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($usuarios as $usuario) {
    echo "<p>" . $usuario['nome'] . " - " . $usuario['email'] . "</p>";
}
?>
