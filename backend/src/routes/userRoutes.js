import express from "express";
import { upload, uploadCloudinary } from "../utils/uploadImage.js";
import { prisma } from "../../prisma/cliente.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ============================================================
   ✅ 1. UPLOAD DE AVATAR (já existia — mantido COMO ESTÁ)
============================================================ */
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

/* ============================================================
   ✅ 2. ATUALIZAR NICK (já existia — mantido COMO ESTÁ)
============================================================ */
router.patch("/nick", authenticate, async (req, res) => {
  try {
    const { nick } = req.body;
    const userId = req.usuario?.id;

    if (!nick) return res.status(400).json({ erro: "Nick é obrigatório." });
    if (!userId) return res.status(401).json({ erro: "Usuário não autenticado." });

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

/* ============================================================
   ✅ 3. ATUALIZAR BIO OU STATUS (NOVO)
============================================================ */
router.patch("/perfil", authenticate, async (req, res) => {
  try {
    const { bio, status } = req.body;
    const userId = req.usuario.id;

    const updated = await prisma.usuario.update({
      where: { id: userId },
      data: {
        bio: bio ?? undefined,
        status: status ?? undefined,
      },
    });

    res.json({ msg: "Perfil atualizado!", updated });
  } catch (err) {
    console.error("Erro ao atualizar perfil:", err);
    res.status(500).json({ erro: "Erro ao atualizar perfil." });
  }
});

/* ============================================================
   ✅ 4. SEGUIR / DEIXAR DE SEGUIR (NOVO)
============================================================ */
router.post("/:id/seguir", authenticate, async (req, res) => {
  try {
    const seguidorId = req.usuario.id;
    const seguidoId = Number(req.params.id);

    if (seguidorId === seguidoId)
      return res.status(400).json({ erro: "Você não pode seguir a si mesmo!" });

    const existe = await prisma.amizade.findUnique({
      where: { seguidorId_seguidoId: { seguidorId, seguidoId } }
    });

    // ✅ deixar de seguir
    if (existe) {
      await prisma.amizade.delete({
        where: { seguidorId_seguidoId: { seguidorId, seguidoId } },
      });
      return res.json({ seguindo: false });
    }

    // ✅ seguir
    await prisma.amizade.create({
      data: { seguidorId, seguidoId },
    });

    res.json({ seguindo: true });
  } catch (err) {
    console.error("Erro seguir:", err);
    res.status(500).json({ erro: "Erro ao seguir usuário." });
  }
});

/* ============================================================
   ✅ 5. PEGAR PERFIL DE QUALQUER USUÁRIO (NOVO)
============================================================ */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const perfil = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        nick: true,
        avatar: true,
        bio: true,
        status: true,
        criadoEm: true,
        posts: {
          orderBy: { criadoEm: "desc" },
          select: {
            id: true,
            titulo: true,
            conteudo: true,
            imagemUrl: true,
            criadoEm: true,
            likes: true,
            comentarios: true,
          }
        },
        _count: {
          select: {
            amigosSeguidoPor: true, // seguidores
            amigosSeguindo: true,   // seguindo
            posts: true
          },
        },
      },
    });

    if (!perfil) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(perfil);
  } catch (err) {
    console.error("Erro ao carregar perfil:", err);
    res.status(500).json({ erro: "Erro ao carregar perfil." });
  }
});

/* ============================================================
   ✅ 6. PEGAR PERFIL DO PRÓPRIO USUÁRIO (NOVO)
============================================================ */
router.get("/", authenticate, async (req, res) => {
  try {
    const id = req.usuario.id;

    const eu = await prisma.usuario.findUnique({
      where: { id },
      include: {
        amigosSeguindo: true,
        amigosSeguidoPor: true,
      }
    });

    res.json(eu);
  } catch (err) {
    console.error("Erro ao carregar perfil próprio:", err);
    res.status(500).json({ erro: "Erro ao carregar usuário." });
  }
});

export default router;
