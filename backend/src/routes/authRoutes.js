import express from "express";
import { userCadastrar, userLogin, getProfile, esqueciSenha, verificarCodigo, resetarSenha } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/cadastro", userCadastrar);

router.post("/login", userLogin);

router.get("/eu", authenticate, getProfile);

router.post("/esqueci-senha", esqueciSenha);

router.post("/verificar-codigo", verificarCodigo);

router.post("/resetar-senha", resetarSenha);

export default router;