import express from "express"
import {
    getTodosPost,
    getPostByID,
    criarPost,
    updatePost,
    deletarPost,
    addComentario,
    getComentariosByPost,
    likePost,
    likeComentario,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getTodosPost);
router.get("/:id", getPostByID);
router.post("/", criarPost);
router.put("/:id", updatePost);
router.delete("/:id", deletarPost);

router.post("/:id/comentarios", addComentario);
router.get("/:id/comentarios", getComentariosByPost);
router.put("/comentario/:id", updateComentario);
router.delete("/comentario/:id", deletarComentario);


router.post("/:id/like", likePost);
router.post("/comentario/:id/like", likeComentario);

export default router;