
document.addEventListener("DOMContentLoaded", () => {
  // Selecionar botões do tipo .option
  const options = document.querySelectorAll(".option");

  options.forEach(button => {
    button.addEventListener("click", () => {
      // Remove a classe 'selected' de todos os botões irmãos
      const group = button.parentElement.querySelectorAll(".option");
      group.forEach(btn => btn.classList.remove("selected"));
      // Adiciona a classe ao botão clicado
      button.classList.add("selected");

      // Armazena o valor selecionado no localStorage (opcional)
      const key = document.querySelector("h2")?.innerText || "resposta";
      localStorage.setItem(key, button.innerText);
    });
  });

  // Salvar inputs (peso, altura, data, restrição alimentar)
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const label = document.querySelector("h2")?.innerText || "resposta";
      localStorage.setItem(label, input.value);
    });

    // Recarregar valor salvo (opcional)
    const saved = localStorage.getItem(document.querySelector("h2")?.innerText);
    if (saved && input.tagName !== "SELECT") {
      input.value = saved;
    }
  });
});

