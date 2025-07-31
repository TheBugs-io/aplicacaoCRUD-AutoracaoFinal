const formulario = document.getElementById("formulario");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const idade = Number(document.getElementById("idade").value);
  const endereco = document.getElementById("endereco").value.trim();
  const email = document.getElementById("email").value.trim();

  fetch("/cadastrar-usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, idade, endereco, email }),
  })
    .then((resposta) => resposta.json())
    .then((data) => {
      const mensagem = document.getElementById("mensagem");
      const novoUsuario = document.getElementById("novoUsuario");

      if (data.ok) {
        mensagem.textContent = data.message;
        novoUsuario.innerHTML = `
                <p><strong>Nome:</strong> ${data.usuario.nome}</p>
                <p><strong>Idade:</strong> ${data.usuario.idade}</p>
                <p><strong>Endereço:</strong> ${data.usuario.endereco}</p>
                <p><strong>Email:</strong> ${data.usuario.email}</p>
              `;
        formulario.reset();
      } else {
        mensagem.textContent = data.error || "Erro ao cadastrar usuário.";
        novoUsuario.innerHTML = "";
      }
    })
    .catch((error) => {
      const mensagem = document.getElementById("mensagem");
      mensagem.textContent = "Erro ao comunicar com o servidor.";
      console.error("Erro:", error);
    });
});
