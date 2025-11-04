document.addEventListener("DOMContentLoaded", async () => {
  const headerUser = document.querySelector(".header-user");
  const userNick = document.querySelector(".user-nick");
  const userAvatar = document.querySelector(".user-avatar");
  const authButtons =
    document.querySelector(".auth-buttons") ||
    document.querySelector(".header-btn");

  const sidebarButtons = document.querySelector(".sideBar-btns");
  const sideUser = document.querySelector(".sideBar-user");
  const sideNick = document.querySelector(".side-nick");
  const sideAvatar = document.querySelector(".side-avatar");

  const token = localStorage.getItem("token");

  if (!token) {
    if (headerUser) headerUser.style.display = "none";
    if (sideUser) sideUser.style.display = "none";

    if (window.innerWidth > 768) {
      if (authButtons) authButtons.style.display = "flex";
    } else {
      if (sidebarButtons) sidebarButtons.style.display = "flex";
    }

    return;
  }

  try {
    const res = await fetch("http://localhost:2611/api/auth/eu", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Falha ao buscar usuário.");
    const user = await res.json();

    if (userNick) userNick.textContent = user.nick || user.email || "Usuário";
    if (userAvatar)
      userAvatar.src = user.avatar || "https://i.imgur.com/default.png";

    if (sideNick) sideNick.textContent = user.nick || user.email || "Usuário";
    if (sideAvatar)
      sideAvatar.src = user.avatar || "https://i.imgur.com/default.png";

    if (window.innerWidth > 768) {
      // Desktop
      if (headerUser) headerUser.style.display = "flex";
      if (authButtons) authButtons.style.display = "none";
      if (sidebarButtons) sidebarButtons.style.display = "flex";
      if (sideUser) sideUser.style.display = "none";
    } else {
      if (headerUser) headerUser.style.display = "none";
      if (sidebarButtons) sidebarButtons.style.display = "none";
      if (sideUser) sideUser.style.display = "flex";
    }
  } catch (err) {
    console.error("Erro ao verificar autenticação:", err);
    localStorage.removeItem("token");

    if (headerUser) headerUser.style.display = "none";
    if (sideUser) sideUser.style.display = "none";

    if (window.innerWidth > 768) {
      if (authButtons) authButtons.style.display = "flex";
    } else {
      if (sidebarButtons) sidebarButtons.style.display = "flex";
    }
  }
});
