import { v4 as uuidv4, validate as uuidValidate } from "uuid";
import * as userControlFunctions from "../scripts/user-control.js";

// Sanitiza strings para evitar caracteres especiais
const escapeHtml = (text) => {
  if (typeof text !== "string") return text;
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Valida dados de usuário para cadastro/atualização
const validarUsuario = (data, atualizar = false) => {
  const { nome, idade, endereco, email } = data;

  if (!atualizar || nome !== undefined) {
    if (typeof nome !== "string" || nome.trim().length === 0) return "Nome inválido";
  }

  if (!atualizar || idade !== undefined) {
    if (typeof idade !== "number" || !Number.isInteger(idade) || idade < 0) return "Idade inválida";
  }

  if (!atualizar || endereco !== undefined) {
    if (typeof endereco !== "string" || endereco.trim().length === 0) return "Endereço inválido";
  }

  if (!atualizar || email !== undefined) {
    if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email.trim())) return "Email inválido";
  }

  return null;
};

// Sanitiza campos de usuário
const sanitizeUsuario = (usuario) => ({
  ...usuario,
  nome: escapeHtml(usuario.nome),
  endereco: escapeHtml(usuario.endereco),
  email: escapeHtml(usuario.email),
});

//Valida e sanitiza UUID de parâmetro
const validarUUID = (id) => id && uuidValidate(id.trim()) ? id.trim() : null;


export const listUsers = async (req, res) => {
  let num = parseInt(req.params.count, 10);
  if (isNaN(num)) num = 100;
  if (num === 0) num = 10000;
  else if (num < 0) num = 100;
  else if (num > 10000) num = 10000;

  try {
    const usuarios = await userControlFunctions.lerUsuarios(num);
    res.json(usuarios.map(sanitizeUsuario));
  } catch (err) {
    console.error("Erro ao ler usuários:", err);
    res.status(500).json({ error: "Não foi possível ler usuários." });
  }
};

export const deleteUser = async (req, res) => {
  const id = validarUUID(req.params.id);
  if (!id) return res.status(400).json({ error: "ID inválido." });

  try {
    let usuarios = await userControlFunctions.lerUsuarios(0);
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Usuário não encontrado." });

    const [removido] = usuarios.splice(index, 1);
    await userControlFunctions.salvarUsuarios(usuarios);

    res.json({ ok: true, message: "Usuário removido com sucesso!", usuario: sanitizeUsuario(removido) });
  } catch (err) {
    console.error("Erro ao remover usuário:", err);
    res.status(500).json({ error: "Não foi possível remover usuário." });
  }
};

export const cadastrarUsuario = async (req, res) => {
  const erro = validarUsuario(req.body);
  if (erro) return res.status(400).json({ error: erro });

  try {
    const novoUsuario = {
      id: uuidv4(),
      nome: req.body.nome.trim(),
      idade: req.body.idade,
      endereco: req.body.endereco.trim(),
      email: req.body.email.trim(),
    };

    await userControlFunctions.appendUsuario(novoUsuario);
    res.status(201).json({ ok: true, message: "Usuário cadastrado com sucesso!", usuario: sanitizeUsuario(novoUsuario) });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ error: "Não foi possível cadastrar usuário." });
  }
};

export const atualizarUsuario = async (req, res) => {
  const id = validarUUID(req.params.id);
  if (!id) return res.status(400).json({ error: "ID inválido." });

  const erro = validarUsuario(req.body, true);
  if (erro) return res.status(400).json({ error: erro });

  try {
    const usuarios = await userControlFunctions.lerUsuarios(0);
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Usuário não encontrado." });

    const usuario = usuarios[index];
    if (req.body.nome) usuario.nome = req.body.nome.trim();
    if (req.body.idade !== undefined) usuario.idade = req.body.idade;
    if (req.body.endereco) usuario.endereco = req.body.endereco.trim();
    if (req.body.email) usuario.email = req.body.email.trim();

    await userControlFunctions.salvarUsuarios(usuarios);
    res.json({ ok: true, message: "Usuário atualizado com sucesso!", usuario: sanitizeUsuario(usuario) });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ error: "Não foi possível atualizar usuário." });
  }
};

export const getUserById = async (req, res) => {
  const id = validarUUID(req.params.uuid);
  if (!id) return res.status(400).json({ error: "ID inválido." });

  try {
    const usuarios = await userControlFunctions.lerUsuarios(0);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado." });

    res.json(sanitizeUsuario(usuario));
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({ error: "Não foi possível buscar usuário." });
  }
};