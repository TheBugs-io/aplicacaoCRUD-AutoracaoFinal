// Evitando SQL injection nesse arquivo

const palavrasSQLProibidas = [
  "SELECT", "UPDATE", "DELETE", "ORDER BY", "FROM", "WHERE", "CREATE", "TABLE", "DATABASE"
];

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

export const sanitizeInput = (texto) => {
  if (typeof texto !== "string") return texto;

  let sanitizado = texto.trim();

  palavrasSQLProibidas.forEach(palavra => {
    const regex = new RegExp(palavra, "gi");
    sanitizado = sanitizado.replace(regex, "");
  });

  sanitizado = sanitizado.replace(/["'?=:]/g, "");

  return escapeHtml(sanitizado);
};
