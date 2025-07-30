import express from "express";
import * as userController from "../controllers/usersController.js";
const router = express.Router();

router.get('/list-users/:count?', userController.listUsers);
router.post('/cadastrar-usuario', userController.cadastrarUsuario);
router.put('/atualizar-usuario/:id', userController.atualizarUsuario);
router.delete('/deletar-usuario/:id', userController.deleteUser);
router.get('/buscar-usuario/:uuid', userController.getUserById);

export default router;