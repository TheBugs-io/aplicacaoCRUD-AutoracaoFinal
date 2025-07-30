const tabelaBody = document.querySelector("#tabelaUsuarios tbody");
const mensagem = document.createElement("div");
const tabela = document.querySelector("#tabelaUsuarios");
document.body.insertBefore(mensagem, tabela);

window.adicionarBotaoAcao = function (usuario) {
  return `<td><button onclick="removerUsuario('${usuario.id}')" class="btn-remover">Deletar</button></td>`;
};

async function carregarUsuarios() {
  try {
    const resposta = await fetch("/list-users/100");
    const usuarios = await resposta.json();

    tabelaBody.innerHTML = "";

    usuarios.forEach((usuario) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.idade}</td>
        <td>${usuario.endereco}</td>
        <td>${usuario.email}</td>
        ${window.adicionarBotaoAcao(usuario)}
      `;
      tabelaBody.appendChild(tr);
    });
  } catch (err) {
    mensagem.textContent = "Erro ao carregar usuários.";
    console.error(err);
  }
}

async function removerUsuario(id) {
  if (!confirm("Deseja realmente deletar este usuário?")) return;

  try {
    const response = await fetch(`/deletar-usuario/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.ok) {
      mensagem.textContent = data.message;
      carregarUsuarios();
    } else {
      mensagem.textContent = data.error || "Erro ao deletar usuário.";
    }
  } catch (err) {
    mensagem.textContent = "Erro na comunicação com o servidor.";
    console.error(err);
  }
}

carregarUsuarios();