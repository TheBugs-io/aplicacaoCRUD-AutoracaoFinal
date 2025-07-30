import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./routes/routes.js";

const app = express();
const __dirname = path.resolve();

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use('/', userRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});