// Opcional: adicionar ações no login futuramente
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault(); // impede envio real
  alert("Login efetuado com sucesso!");
  window.location.href = '../../formulario-cadastro/tela1.html';
});

