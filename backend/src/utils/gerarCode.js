import crypto from "crypto"

export function gerarCodigoNumerico(digits = 6) {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
}

export function gerarTokenLongo() {
    return crypto.randomBytes(32).toString("hex");
}

export function hashToken(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}