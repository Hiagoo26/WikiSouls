import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/cliente.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Cadastro
export const userCadastrar = async (req, res) => {
    try{
        const { email, senha, nick } = req.body;
        if (!email || !senha || !nick) {
            return res.status(400).json({ erro: "Preencha todos os campos!"})
        }

        const usuarioExistente = await prisma.usuario
        .findUnique({ where : {email} });
        if (usuarioExistente) {
            return res.status(400).json({ erro: "Email já cadastrado!" });
        }

        const nickExistente = await prisma.usuario
        .findUnique({ where : {nick} });
        if (nickExistente) {
            return res.status(400).json({ erro: "Esse nick já existe." });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create ({
            data: {
                email,
                senha: hashedPassword,
                nick },
            });
        
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar usuário."});
    }
};

//Login
export const userLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado!"});
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(400).json({ erro: "Senha incorreta!"});
        }

        const token = jwt.sign({ id: usuario.id, nick: usuario.nick}, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            mensagem: "Login efetuado!",
            usuario: { id: usuario.id, nick: usuario.nick, email: usuario.email },
            token,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao efetuar o login."});
    }
};

// Proteção

export const  getProfile = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: { id: req.usuario.id },
            select: {
                id: true,
                nick: true,
                email: true,
                bio: true,
                avatar: true 
            },
        });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao carregar perfil. "});
    }
};