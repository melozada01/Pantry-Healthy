<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
    $genero = $_POST['genero'];
    $peso = $_POST['peso'];
    $altura = $_POST['altura'];
    $data_nascimento = $_POST['data_nascimento'];
    $objetivo = $_POST['objetivo'];
    $atividade_fisica = isset($_POST['atividade_fisica']) ? 1 : 0;
    $restricao_alimentar = $_POST['restricao_alimentar'];

    $sql = "INSERT INTO usuarios (nome, email, senha, genero, peso, altura, data_nascimento, objetivo, atividade_fisica, restricao_alimentar)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$nome, $email, $senha, $genero, $peso, $altura, $data_nascimento, $objetivo, $atividade_fisica, $restricao_alimentar]);

    echo "Usuário criado com sucesso!";
}
?>
