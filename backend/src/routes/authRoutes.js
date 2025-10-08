import express from "express";
import { userCadastrar, userLogin, getProfile} from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/cadastro", userCadastrar);

router.post("/login", userLogin);

router.get("/eu", authenticate, getProfile);

export default router;