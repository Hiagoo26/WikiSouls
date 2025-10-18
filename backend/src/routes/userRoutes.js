import express from "express";
import { upload, uploadCloudinary } from "../utils/uploadImage.js";
import { prisma } from "../../prisma/cliente.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/avatar", authenticate, upload.single("imagem"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const imageUrl = await uploadCloudinary(fileBuffer);

    const user = await prisma.usuario.update({
      where: { id: req.usuario.id },
      data: { avatar: imageUrl },
    });

    res.json({ msg: "Avatar atualizado com sucesso!", imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao enviar imagem." });
  }
});

router.patch("/nick", authenticate, async (req, res) => {
  try {
    const { nick } = req.body;
    const userId = req.usuario?.id;

    console.log("Atualizando nick:", nick, "para usuário ID:", userId);

    if (!nick) return res.status(400).json({ erro: "Nick é obrigatório." });
    if (!userId) return res.status(401).json({ erro: "Usuário não autenticado." });

    // Verifica se o nick já existe
    const existente = await prisma.usuario.findUnique({ where: { nick } });
    if (existente) return res.status(400).json({ erro: "Nick já está em uso." });

    const user = await prisma.usuario.update({
      where: { id: userId },
      data: { nick },
    });

    res.status(200).json({ msg: "Nick atualizado com sucesso!", user });
  } catch (err) {
    console.error("Erro ao atualizar nick:", err);
    res.status(500).json({ erro: "Erro ao atualizar nick." });
  }
});

export default router;
