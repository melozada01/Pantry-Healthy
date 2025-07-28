const novaSenhaInput = document.getElementById('novaSenha');
const confirmarSenhaInput = document.getElementById('confirmarSenha');

confirmarSenhaInput.addEventListener('blur', function() {
  const novaSenha = novaSenhaInput.value;
  const confirmarSenha = confirmarSenhaInput.value;

  if (novaSenha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }
});
