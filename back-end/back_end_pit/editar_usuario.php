<?php
require 'db.php';

$id = $_GET['id'];
$sql = "SELECT * FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id]);
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Exibir formulário com os dados preenchidos (exemplo omitido)
// Após envio via POST:
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $genero = $_POST['genero'];
    $peso = $_POST['peso'];
    $altura = $_POST['altura'];
    $objetivo = $_POST['objetivo'];
    $atividade_fisica = isset($_POST['atividade_fisica']) ? 1 : 0;
    $restricao_alimentar = $_POST['restricao_alimentar'];

    $sql = "UPDATE usuarios SET nome=?, email=?, genero=?, peso=?, altura=?, objetivo=?, atividade_fisica=?, restricao_alimentar=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nome, $email, $genero, $peso, $altura, $objetivo, $atividade_fisica, $restricao_alimentar, $id]);

    echo "Usuário atualizado!";
}
?>
