document.addEventListener("DOMContentLoaded", async () => {
  const headerUser = document.querySelector(".header-user");
  const userNick = document.querySelector(".user-nick");
  const userAvatar = document.querySelector(".user-avatar");
  const authButtons = document.querySelector(".header-btn");
  const token = localStorage.getItem("token");

  // 🔹 Se não tiver token, mostra os botões e sai
  if (!token) {
    if (headerUser) headerUser.style.display = "none";
    if (authButtons) authButtons.style.display = "flex";
    return;
  }

  try {
    const res = await fetch("http://localhost:2611/api/auth/eu", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Falha ao buscar usuário.");
    const user = await res.json();

    // 🔹 Atualiza o header com dados reais
    if (userNick) userNick.textContent = user.nick || user.email || "Usuário";
    if (userAvatar) userAvatar.src = user.avatar || "https://i.imgur.com/default.png";

    // 🔹 Mostra o header e esconde os botões
    if (headerUser) headerUser.style.display = "flex";
    if (authButtons) authButtons.style.display = "none";

  } catch (err) {
    console.error("Erro ao verificar autenticação:", err);
    // Se o token for inválido, limpa e volta ao estado inicial
    localStorage.removeItem("token");
    if (headerUser) headerUser.style.display = "none";
    if (authButtons) authButtons.style.display = "flex";
  }
});
