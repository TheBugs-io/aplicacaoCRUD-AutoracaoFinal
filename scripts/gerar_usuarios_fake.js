const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

const LOTE = 100;
const ARQUIVO = "usuarios.json";

const TOTAL_USUARIOS = parseInt(process.argv[2], 10) || 100;
if (process.argv.length < 3) {
  console.error(
    `O argumento 'users' é necessário para gerar usuários. Foi adotado o tamanho: ${TOTAL_USUARIOS}`
  );
}

function gerarUsuario() {
  return {
    id: uuidv4(),
    nome: faker.person.fullName(),
    idade: faker.number.int({ min: 18, max: 90 }),
    endereco: faker.location.streetAddress(),
    email: faker.internet.email(),
  };
}

async function gerarEGravarUsuarios() {
  console.log(
    `Iniciando geração de ${TOTAL_USUARIOS} usuários em lotes de ${LOTE}...`
  );

  fs.writeFileSync(ARQUIVO, "[\n");

  let primeiro = true;
  for (let i = 0; i < TOTAL_USUARIOS; i += LOTE) {
    const usuarios = [];
    for (let j = 0; j < LOTE && i + j < TOTAL_USUARIOS; j++) {
      usuarios.push(gerarUsuario());
    }
    const jsonLote = JSON.stringify(usuarios, null, 2).slice(1, -1);
    if (!primeiro) fs.appendFileSync(ARQUIVO, ",\n");
    fs.appendFileSync(ARQUIVO, jsonLote);
    primeiro = false;
  }

  fs.appendFileSync(ARQUIVO, "\n]");
  console.log(`✅ Arquivo "${ARQUIVO}" gerado com sucesso!`);
}

gerarEGravarUsuarios();
