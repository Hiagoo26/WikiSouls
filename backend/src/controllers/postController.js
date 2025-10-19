import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Buscar todos os posts com comentários, likes e autor
export const getTodosPost = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comentarios: {
          include: { user: true, likes: true },
        },
        likes: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar posts" });
  }
};

// Buscar post por ID
export const getPostByID = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        comentarios: {
          include: { user: true, likes: true },
        },
        likes: true,
      },
    });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar post" });
  }
};

// Criar post
export const criarPost = async (req, res) => {
  const { titulo, conteudo, userId, imagemUrl } = req.body;
  try {
    const novoPost = await prisma.post.create({
      data: {
        titulo,
        conteudo,
        imagemUrl: imagemUrl || null,
        userId: Number(userId),
      },
    });
    res.status(201).json(novoPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar post" });
  }
};

// Atualizar post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, conteudo, imagemUrl, userId } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(userId) } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    if (post.userId !== usuario.id) {
      return res.status(403).json({ error: "Sem permissão para editar este post" });
    }

    const postAtualizado = await prisma.post.update({
      where: { id: Number(id) },
      data: { titulo, conteudo, imagemUrl },
    });

    res.json(postAtualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar post" });
  }
};

// Deletar post
export const deletarPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) return res.status(404).json({ error: "Post não encontrado" });

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(userId) } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    if (post.userId !== usuario.id && usuario.role !== "ADMIN") {
      return res.status(403).json({ error: "Sem permissão para excluir este post" });
    }

    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar post" });
  }
};

// Adicionar comentário
export const addComentario = async (req, res) => {
  const { id } = req.params;
  const { conteudo, userId } = req.body;
  try {
    const comentario = await prisma.comentario.create({
      data: {
        conteudo,
        userId: Number(userId),
        postId: Number(id),
      },
    });
    res.status(201).json(comentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar comentário" });
  }
};

// Atualizar comentário
export const updateComentario = async (req, res) => {
  const { id } = req.params;
  const { conteudo, userId } = req.body;

  try {
    const comentario = await prisma.comentario.findUnique({ where: { id: Number(id) } });
    if (!comentario) return res.status(404).json({ error: "Comentário não encontrado" });

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(userId) } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    if (comentario.userId !== usuario.id) {
      return res.status(403).json({ error: "Sem permissão para editar este comentário" });
    }

    const atualizado = await prisma.comentario.update({
      where: { id: Number(id) },
      data: { conteudo },
    });

    res.json(atualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar comentário" });
  }
};

// Deletar comentário
export const deletarComentario = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const comentario = await prisma.comentario.findUnique({ where: { id: Number(id) } });
    if (!comentario) return res.status(404).json({ error: "Comentário não encontrado" });

    const usuario = await prisma.usuario.findUnique({ where: { id: Number(userId) } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    if (comentario.userId !== usuario.id && usuario.role !== "ADMIN") {
      return res.status(403).json({ error: "Sem permissão para excluir este comentário" });
    }

    await prisma.comentario.delete({ where: { id: Number(id) } });
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};

// Like / Deslike em POST
export const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const likeExistente = await prisma.like.findFirst({
      where: { userId: Number(userId), postId: Number(id) },
    });

    if (likeExistente) {
      await prisma.like.delete({ where: { id: likeExistente.id } });
      return res.json({ liked: false, message: "Like removido" });
    }

    await prisma.like.create({
      data: {
        userId: Number(userId),
        postId: Number(id),
        comentarioId: null,
      },
    });
    res.json({ liked: true, message: "Post curtido" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao curtir post" });
  }
};

// Like / Deslike em COMENTÁRIO
export const likeComentario = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const likeExistente = await prisma.like.findFirst({
      where: { userId: Number(userId), comentarioId: Number(id) },
    });

    if (likeExistente) {
      await prisma.like.delete({ where: { id: likeExistente.id } });
      return res.json({ liked: false, message: "Like removido" });
    }

    await prisma.like.create({
      data: {
        userId: Number(userId),
        comentarioId: Number(id),
        postId: null,
      },
    });
    res.json({ liked: true, message: "Comentário curtido" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao curtir comentário" });
  }
};