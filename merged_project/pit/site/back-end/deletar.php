<?php
require 'db.php';

$id = $_GET['id'];
$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);

echo "Usuário deletado com sucesso.";
?>
