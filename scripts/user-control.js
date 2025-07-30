/* Houve uma alteração significativa aqui já que com a alteração pro tipo módulo do node, e resolução da exportação das funções aqui (não estavam funcionando corretamente.*/
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { lock } from "proper-lockfile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "..", "usuarios.json");

async function comLock(fn) {
  let release;
  try {
    release = await lock(filePath, {
      retries: { retries: 5, factor: 2, minTimeout: 50, maxTimeout: 1000 },
      stale: 5000,
    });
    return await fn();
  } finally {
    if (release) {
      try {
        await release();
      } catch (err) {
        console.error("Erro ao liberar lock de usuarios.json:", err);
      }
    }
  }
}

async function lerUsuarios(num) {
  return comLock(async () => {
    try {
      const dados = await readFile(filePath, "utf-8");
      console.log("Lendo usuarios.json...");
      const texto = dados.trim();
      if (!texto) {
        console.warn("usuarios.json está vazio. Retornando array vazio.");
        return [];
      }

      const arr = JSON.parse(texto);
      if (!Array.isArray(arr) || arr.length === 0) {
        console.warn("usuarios.json está vazio ou inválido. Retornando array vazio.");
        return [];
      }

      if (num === 0 || num >= arr.length) {
        console.log(`Nenhum limite aplicado. Retornando todos os usuários.`);
        console.log(`Número total de usuários: ${arr.length}`);
        return arr;
      }

      const arr_limited = arr.slice(0, num);
      console.log(`Total de usuários lidos: ${arr_limited.length}`);
      return arr_limited;

    } catch (err) {
      console.error("Erro ao ler usuarios.json:", err);
      return [];
    }
  });
}

async function salvarUsuarios(usuarios) {
  return comLock(async () => {
    try {
      const json = JSON.stringify(usuarios, null, 2);
      await writeFile(filePath, json, "utf-8");
      console.log("usuarios.json atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao salvar usuarios.json:", err);
    }
  });
}

async function appendUsuario(novoUsuario) {
  const usuarios = await lerUsuarios(0);
  usuarios.push(novoUsuario);
  await salvarUsuarios(usuarios);
}

export { lerUsuarios, salvarUsuarios, appendUsuario };