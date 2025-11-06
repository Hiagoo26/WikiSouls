import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🔹 Buscar todos os posts
export const getTodosPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        autor: { select: { id: true, nick: true, avatar: true } },
        _count: { select: { comentarios: true, likes: true } },
      },
      orderBy: { criadoEm: "desc" },
    });

    res.json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};

// Buscar post por ID
export const getPostByID = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        autor: {
          select: { id: true, nick: true, avatar: true }
        },
        comentarios: {
          include: {
            autor: { select: { id: true, nick: true, avatar: true } },
            likes: true
          },
          orderBy: { criadoEm: "asc" }
        },
        likes: true
      }
    });

    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    res.json(post);
  } catch (error) {
    console.error("Erro getPostByID:", error);
    res.status(500).json({ error: "Erro ao buscar post" });
  }
};

// Criar novo post
export const criarPost = async (req, res) => {
  try {
    const { titulo, conteudo, autorId } = req.body;
    const imagemUrl = req.file ? req.file.path : req.body.imagemUrl || null;

    const novoPost = await prisma.post.create({
      data: {
        titulo,
        conteudo,
        imagemUrl,
        autorId: Number(autorId),
      },
      include: {
        autor: { select: { id: true, nick: true, avatar: true } },
      },
    });

    res.status(201).json(novoPost);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(500).json({ error: "Erro ao criar post" });
  }
};

// Atualizar post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, autorId } = req.body;
  const imagemUrl = req.file ? req.file.path : req.body.imagemUrl || null;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    if (post.autorId !== Number(autorId))
      return res.status(403).json({ error: "Sem permissão para editar este post" });

    const atualizado = await prisma.post.update({
      where: { id: Number(id) },
      data: { titulo, conteudo, imagemUrl },
    });

    res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
};

// 🔹 Deletar post
export const deletarPost = async (req, res) => {
  const { id } = req.params;
  const { autorId } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    if (post.autorId !== Number(autorId))
      return res.status(403).json({ error: "Sem permissão para deletar este post" });

    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    res.status(500).json({ error: "Erro ao deletar post" });
  }
};

// 🔹 Buscar comentários de um post
export const getComentariosByPost = async (req, res) => {
  const { id } = req.params;
  try {
    const comentarios = await prisma.comentario.findMany({
      where: { postId: Number(id) },
      include: {
        autor: { select: { id: true, nick: true, avatar: true } },
        likes: true,
      },
      orderBy: { criadoEm: "asc" },
    });

    res.json(comentarios);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
};

// 🔹 Adicionar comentário
export const addComentario = async (req, res) => {
  const { id } = req.params;
  const { conteudo, autorId } = req.body;

  try {
    const comentario = await prisma.comentario.create({
      data: {
        conteudo,
        autorId: Number(autorId),
        postId: Number(id),
      },
      include: {
        autor: { select: { id: true, nick: true, avatar: true } },
      },
    });

    res.status(201).json(comentario);
  } catch (error) {
    console.error("Erro ao adicionar comentário:", error);
    res.status(500).json({ error: "Erro ao adicionar comentário" });
  }
};

// 🔹 Atualizar comentário
export const updateComentario = async (req, res) => {
  const { id } = req.params;
  const { conteudo, autorId } = req.body;

  try {
    const comentario = await prisma.comentario.findUnique({ where: { id: Number(id) } });
    if (!comentario) return res.status(404).json({ error: "Comentário não encontrado" });

    if (comentario.autorId !== Number(autorId))
      return res.status(403).json({ error: "Sem permissão para editar este comentário" });

    const atualizado = await prisma.comentario.update({
      where: { id: Number(id) },
      data: { conteudo },
    });

    res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar comentário:", error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};

// 🔹 Deletar comentário
export const deletarComentario = async (req, res) => {
  const { id } = req.params;
  const { autorId } = req.body;

  try {
    const comentario = await prisma.comentario.findUnique({ where: { id: Number(id) } });
    if (!comentario) return res.status(404).json({ error: "Comentário não encontrado" });

    if (comentario.autorId !== Number(autorId))
      return res.status(403).json({ error: "Sem permissão para deletar este comentário" });

    await prisma.comentario.delete({ where: { id: Number(id) } });
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar comentário:", error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

// 🔹 Like em post
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { autorId } = req.body;

  try {
    const likeExistente = await prisma.like.findFirst({
      where: { usuarioId: Number(autorId), postId: Number(id) },
    });

    if (likeExistente) {
      await prisma.like.delete({ where: { id: likeExistente.id } });
      return res.json({ liked: false, message: "Like removido" });
    }

    await prisma.like.create({
      data: { usuarioId: Number(autorId), postId: Number(id) },
    });

    res.json({ liked: true, message: "Post curtido" });
  } catch (error) {
    console.error("Erro ao curtir post:", error);
    res.status(500).json({ error: "Erro ao curtir post" });
  }
};

// 🔹 Like em comentário
export const likeComentario = async (req, res) => {
  const { id } = req.params;
  const { autorId } = req.body;

  try {
    const likeExistente = await prisma.like.findFirst({
      where: { usuarioId: Number(autorId), comentarioId: Number(id) },
    });

    if (likeExistente) {
      await prisma.like.delete({ where: { id: likeExistente.id } });
      return res.json({ liked: false, message: "Like removido" });
    }

    await prisma.like.create({
      data: { usuarioId: Number(autorId), comentarioId: Number(id) },
    });

    res.json({ liked: true, message: "Comentário curtido" });
  } catch (error) {
    console.error("Erro ao curtir comentário:", error);
    res.status(500).json({ error: "Erro ao curtir comentário" });
  }
};
