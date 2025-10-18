import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ erro: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(403).json({ erro: "Token inválido." });
    }

    req.usuario = decoded; // ✅ padronizado com o resto do backend
    next();
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
};