import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/cliente.js";
import { gerarCodigoNumerico, gerarTokenLongo, hashToken } from "../utils/gerarCode.js"
import { enviarEmail } from "../util/sendEmail.js";
import bcrypt from "bcrypt"
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

const RESET_EXPIRATION_MIN = 15;

export const esqueciSenha = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email) return res.status(400).json({ erro: "É precisso do Email"});

        const user = await prisma.usuario.findUnique({ where: { email } });
        if(!user) {
            return res.status(200).json({ mensagem: "Email enviado com sucesso!"})
        }

        const code = gerarCodigoNumerico(6);
        const tokenHash = hashToken(code);
        const expiresAt = new Date(Date.now() + RESET_EXPIRATION_MIN * 60 * 1000);

        await prisma.passwordReset.create({
            data: {
                email,
                tokenHash,
                expiresAt,
            },
        });
        const subject = "WikiSouls — Código para reset de senha";
        const text = `Seu código para redefinir a senha é: ${code}. Ele expira em ${RESET_EXPIRATION_MIN} minutos.`;
        const html = `<p>Seu código para redefinir a senha é: <strong>${code}</strong></p>
                  <p>Validade: ${RESET_EXPIRATION_MIN} minutos.</p>`;

        await enviarEmail({ to: email, subject, text, html });

        return res.status(200).json({ mensagem: "Se o email existir, enviamos instruções." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: "Erro ao processar recuperação de senha." });
    }
}

export const verificarCodigo = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ erro: "Email e código obrigatórios." });

    const tokenHash = hashToken(code);
    const reset = await prisma.passwordReset.findFirst({
      where: {
        email,
        tokenHash,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!reset) return res.status(400).json({ erro: "Código inválido ou expirado." });

    const tempToken = jwt.sign({ email, resetId: reset.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    return res.status(200).json({ mensagem: "Código válido.", tempToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao verificar código." });
  }
};

export const resetarSenha = async (req, res) => {
  try {
    const { tempToken, novaSenha } = req.body;
    if (!tempToken || !novaSenha) return res.status(400).json({ erro: "Token temporário e nova senha obrigatórios." });

    let payload;
    try {
      payload = jwt.verify(tempToken, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ erro: "Token temporário inválido ou expirado." });
    }

    const reset = await prisma.passwordReset.findUnique({ where: { id: payload.resetId } });
    if (!reset || reset.used || reset.expiresAt < new Date()) {
      return res.status(400).json({ erro: "Solicitação inválida ou expirada." });
    }

    const usuario = await prisma.usuario.findUnique({ where: { email: reset.email }});
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const hashed = await bcrypt.hash(novaSenha, 10);
    await prisma.usuario.update({ where: { id: usuario.id }, data: { senha: hashed } });

    await prisma.passwordReset.update({ where: { id: reset.id }, data: { used: true } });

    return res.status(200).json({ mensagem: "Senha atualizada com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: "Erro ao redefinir senha." });
  }
};