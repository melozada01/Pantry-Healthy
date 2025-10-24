<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Cadastro - Pantry Healthy</title>
  <link rel="stylesheet" href="../css/cadastro.css" />
</head>
<body>
  <div class="container">
    <div class="title">
      <span>Pantry</span>
      <span>healthy</span>
    </div>

    <form id="formCadastro">
      <label for="nome">Nome Completo:</label>
      <input type="text" id="nome" placeholder="Digite seu nome completo" required>

      <label for="email">Email:</label>
      <input type="email" id="email" placeholder="Digite seu email" required>

      <label for="senha">Escolha a senha:</label>
      <input type="password" id="senha" placeholder="Crie uma senha" required>

      <label for="confirmar">Confirme a senha:</label>
      <input type="password" id="confirmar" placeholder="Confirme sua senha" required>

      <button type="submit"><a class="btn-entrar" href="../../formulario-cadastro/tela1.html">Acessar</a></button>
    </form>
  </div>

  <script src="../javascript/cadastro.js"></script>
</body>
</html>
