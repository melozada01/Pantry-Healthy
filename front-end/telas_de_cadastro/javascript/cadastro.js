document.getElementById('formCadastro').addEventListener('submit', function(event) {
  event.preventDefault(); // impede o envio do formulário padrão

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmar = document.getElementById('confirmar').value;

  if (senha !== confirmar) {
    alert('As senhas não coincidem.');
    return;
  }

  // Aqui você pode salvar os dados ou redirecionar
  alert(`Bem-vindo, ${nome}! Cadastro realizado com sucesso.`);

  // Redirecionar para a tela de login (login.html)
  window.location.href = "login.html";
});
