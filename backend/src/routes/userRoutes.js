import express from "express";
import { upload, uploadToCloudinary } from "../utils/uploadImage.js";
import { prisma } from "../../prisma/cliente.js";

const router = express.router();

router.post("/avatar", upload.single("imagem"), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;
        const imageUrl = await uploadToCloudinary(fileBuffer);

        const user = await prisma.usuario.update({
            where: { id: req.user.id },
            data: { avatar: imageUrl },
        });

        res.json({ msg: "Avatar atualizado com sucesso!", imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao enviar imagem." });
    }
});

export default router;