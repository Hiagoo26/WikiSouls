document.addEventListener("DOMContentLoaded", async () => {
  const headerUser = document.querySelector(".header-user");
  const userNick = document.querySelector(".user-nick");
  const userAvatar = document.querySelector(".user-avatar");
  const authButtons =
    document.querySelector(".auth-buttons") ||
    document.querySelector("#auth-buttons") ||
    document.querySelector(".header-btn");

  const sidebarButtons = document.querySelector(".sideBar-btns");
  const token = localStorage.getItem("token");

  // 🧠 Se não tiver token, mostra botões (somente se não for mobile)
  if (!token) {
    if (headerUser) headerUser.style.display = "none";

    if (window.innerWidth > 768) {
      if (authButtons) authButtons.style.display = "flex";
    }

    if (sidebarButtons) sidebarButtons.style.display = "flex";
    return;
  }

  try {
    const res = await fetch("http://localhost:2611/api/auth/eu", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Falha ao buscar usuário.");
    const user = await res.json();

    // Atualiza nick e avatar
    if (userNick) userNick.textContent = user.nick || user.email || "Usuário";
    if (userAvatar)
      userAvatar.src = user.avatar || "https://i.imgur.com/default.png";

    // 🔹 Mostra header do usuário
    if (headerUser) headerUser.style.display = "flex";

    // 🔹 Esconde os botões de login/cadastro no desktop
    if (window.innerWidth > 768) {
      if (authButtons) authButtons.style.display = "none";
    }

    // 🔹 Esconde botões da sidebar no mobile
    if (sidebarButtons) sidebarButtons.style.display = "none";
  } catch (err) {
    console.error("Erro ao verificar autenticação:", err);

    // 🔹 Token inválido — reseta interface
    localStorage.removeItem("token");
    if (headerUser) headerUser.style.display = "none";

    if (window.innerWidth > 768) {
      if (authButtons) authButtons.style.display = "flex";
    }

    if (sidebarButtons) sidebarButtons.style.display = "flex";
  }
});