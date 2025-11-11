document.addEventListener("DOMContentLoaded", () => {
  const BASE = "https://wikisouls-production.up.railway.app";
  const API = `${BASE}/api/user`;
  const params = new URLSearchParams(window.location.search);
  const profileId = params.get("id");

  // UI Elementos do Perfil
  const perfilAvatar = document.getElementById("perfilAvatar");
  const perfilNick = document.getElementById("perfilNick");
  const perfilDesc = document.getElementById("perfilDesc");
  const countSeguidores = document.getElementById("countSeguidores");
  const countSeguindo = document.getElementById("countSeguindo");
  const countPosts = document.getElementById("countPosts");
  const btnSeguir = document.getElementById("btnSeguir");
  const btnEditarPerfil = document.getElementById("btnEditarPerfil");
  const postsContainer = document.getElementById("postsContainer");
  const btnOpenAvatarModal = document.getElementById("btnOpenAvatarModal");

  // Modais e seus controles
  const modalEdit = document.getElementById("modalEditPerfil");
  const modalAvatar = document.getElementById("modalAvatar");
  const modalLoginReq = document.getElementById("modalLoginRequired");

  // Controles Modal Editar
  const inputNick = document.getElementById("inputNick");
  const inputBio = document.getElementById("inputBio");
  const selectStatus = document.getElementById("selectStatus");
  const btnCloseEdit = document.getElementById("btnCloseEdit");
  const btnSaveEdit = document.getElementById("btnSaveEdit");

  // Controles Modal Avatar
  const btnCloseAvatar = document.getElementById("btnCloseAvatar");
  const btnUploadAvatar = document.getElementById("btnUploadAvatar");
  const fileAvatar = document.getElementById("fileAvatar");
  const avatarPreviewRow = document.getElementById("avatarPreviewRow");
  const avatarPreview = document.getElementById("avatarPreview");
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  // Controles Modal Login
  const btnCloseLoginReq = document.getElementById("btnCloseLoginReq");
  const btnGoLogin = document.getElementById("btnGoLogin");

  // Dados de Auth
  const token = localStorage.getItem("token");
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")); } catch(e){ return null; }
  })();

  if (!profileId) {
    document.getElementById("postsContainer").innerHTML = "<p>Perfil inválido.</p>";
    return;
  }

  // =========================
  //      FUNÇÕES HELPERS
  // =========================
  function showModal(modal) { modal.classList.remove("hidden"); }
  function hideModal(modal) { modal.classList.add("hidden"); }
  
  function headersWithAuth() {
    const h = {};
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  }

  function resolveUrl(url) {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    return `${BASE}/${url.replace(/\\/g, "/").replace(/^\/+/, "")}`;
  }
  
  function escapeHtml(s) {
    if (!s && s !== "") return "";
    return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
  }

  // =========================
  //      LÓGICA PRINCIPAL
  // =========================

  async function carregarPerfil() {
    try {
      const res = await fetch(`${API}/${profileId}`);
      if (!res.ok) throw new Error("Erro ao carregar perfil");
      const perfil = await res.json();

      perfilAvatar.src = resolveUrl(perfil.avatar || "https://i.imgur.com/default.png");
      perfilNick.textContent = perfil.nick || "Usuário";
      perfilDesc.textContent = perfil.bio || "Nenhuma descrição definida.";
      countSeguidores.textContent = (perfil._count && perfil._count.amigosSeguidoPor) || 0;
      countSeguindo.textContent = (perfil._count && perfil._count.amigosSeguindo) || 0;
      countPosts.textContent = (perfil._count && perfil._count.posts) || (perfil.posts && perfil.posts.length) || 0;

      renderPosts(perfil.posts || []);

      if (user && user.id.toString() === profileId.toString()) {
        btnSeguir.style.display = "none";
        btnEditarPerfil.classList.remove("hidden");
        btnOpenAvatarModal.classList.remove("hidden");
      } else {
        btnEditarPerfil.classList.add("hidden");
        btnOpenAvatarModal.classList.add("hidden");
        
        if (user) {
          btnSeguir.style.display = ""; 
          checkFollowing();
        } else {
          btnSeguir.style.display = "none";
        }
      }
    } catch (err) {
      console.error(err);
      document.getElementById("postsContainer").innerHTML = "<p>Erro ao carregar perfil.</p>";
    }
  }

  // ==========================================================
  //      👇 FUNÇÃO ATUALIZADA 👇
  // ==========================================================
  function renderPosts(posts) {
    if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.innerHTML = "<p>Sem posts deste usuário.</p>";
      return;
    }

    // Usando o mesmo HTML do comunidade.js para garantir consistência
    postsContainer.innerHTML = posts.map(p => {
      const postImageUrl = p.imagemUrl ? `<img src="${resolveUrl(p.imagemUrl)}" class="post-image">` : "";

      return `
        <article class="post" onclick="window.location.href='post.html?id=${p.id}'">
          <div class="post-header">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="${perfilAvatar.src}" alt="Avatar" class="avatar">
              <h3 class="username">${perfilNick.textContent}</h3>
            </div>
            <div>
              <span class="date">${new Date(p.criadoEm).toLocaleDateString()}</span>
            </div>
          </div>
          
          ${p.titulo ? `<h4 class="post-title">${escapeHtml(p.titulo)}</h4>` : ""}
          <p class="content">${escapeHtml(p.conteudo)}</p>
          ${postImageUrl}
          
          <div class="post-footer">
            <span><i class="fa-regular fa-comment"></i> Comentários (${p._count?.comentarios || 0})</span>
            <span><i class="fa-regular fa-thumbs-up"></i> Curtidas (${p._count?.likes || 0})</span>
          </div>
        </article>
      `;
    }).join("");
  }
  // ==========================================================
  //      👆 FIM DA ATUALIZAÇÃO 👆
  // ==========================================================


  async function checkFollowing() {
    if (!token) {
      btnSeguir.textContent = "Seguir";
      return;
    }
    try {
      const res = await fetch(`${API}`, { headers: headersWithAuth() });
      if (!res.ok) throw new Error("Não autenticado");
      const eu = await res.json();
      const segue = (eu.amigosSeguindo || []).some(a => String(a.seguidoId) === String(profileId));
      btnSeguir.textContent = segue ? "Seguindo" : "Seguir";
    } catch (err) {
      btnSeguir.textContent = "Seguir";
    }
  }

  // =========================
  //      EVENT LISTENERS
  // =========================

  btnSeguir.addEventListener("click", async () => {
    if (!token) { showModalLogin(); return; }
    try {
      btnSeguir.disabled = true;
      const res = await fetch(`${API}/${profileId}/seguir`, {
        method: "POST",
        headers: headersWithAuth()
      });
      if (!res.ok) throw new Error("Erro ao seguir");
      const data = await res.json();
      btnSeguir.textContent = data.seguindo ? "Seguindo" : "Seguir";
      await carregarPerfil();
    } catch (err) {
      console.error(err);
      alert("Erro ao seguir/desseguir");
    } finally { btnSeguir.disabled = false; }
  });

  btnEditarPerfil.addEventListener("click", async () => {
    if (!token) { showModalLogin(); return; }
    try {
      const res = await fetch(`${API}/${profileId}`);
      const perfil = await res.json();
      inputNick.value = perfil.nick || "";
      inputBio.value = perfil.bio || "";
      selectStatus.value = perfil.status || "";
      showModal(modalEdit);
    } catch (err) {
      console.error(err);
      alert("Erro ao abrir edição");
    }
  });

  btnSaveEdit.addEventListener("click", async () => {
    try {
      btnSaveEdit.disabled = true;
      const body = { bio: inputBio.value, status: selectStatus.value || undefined };
      if (inputNick.value && inputNick.value.trim() !== "") body.nick = inputNick.value.trim();

      const res = await fetch(`${API}/perfil`, {
        method: "PATCH",
        headers: Object.assign({ "Content-Type": "application/json" }, headersWithAuth()),
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error("Falha ao salvar perfil");
      hideModal(modalEdit);
      await carregarPerfil();
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar perfil");
    } finally {
      btnSaveEdit.disabled = false;
    }
  });

  btnCloseEdit.addEventListener("click", () => hideModal(modalEdit));

  btnOpenAvatarModal.addEventListener("click", () => {
    if (!token) { showModalLogin(); return; }
    showModal(modalAvatar);
  });

  function resetAvatarModal() {
    fileAvatar.value = "";
    fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
    fileNameDisplay.style.fontStyle = 'italic';
    fileNameDisplay.style.color = '#aaa';
    avatarPreviewRow.style.display = "none";
    avatarPreview.src = "";
    hideModal(modalAvatar);
  }
  
  btnCloseAvatar.addEventListener("click", resetAvatarModal);

  fileAvatar.addEventListener("change", (e) => {
    if (fileAvatar.files.length > 0) {
      const file = fileAvatar.files[0];
      fileNameDisplay.textContent = file.name;
      fileNameDisplay.style.fontStyle = 'normal';
      fileNameDisplay.style.color = '#fff';

      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.src = e.target.result;
        avatarPreviewRow.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
      fileNameDisplay.style.fontStyle = 'italic';
      fileNameDisplay.style.color = '#aaa';
      avatarPreviewRow.style.display = 'none';
      avatarPreview.src = '';
    }
  });

  btnUploadAvatar.addEventListener("click", async () => {
    if (!fileAvatar.files[0]) return alert("Selecione uma imagem");
    const form = new FormData();
    form.append("imagem", fileAvatar.files[0]);

    try {
      btnUploadAvatar.disabled = true;
      let res = await fetch(`${API}/avatar`, {
        method: "POST",
        headers: headersWithAuth(),
        body: form
      });
      if (!res.ok) {
        res = await fetch(`${API}/perfil`, {
          method: "PATCH",
          headers: headersWithAuth(),
          body: form
        });
      }
      if (!res.ok) throw new Error("Erro ao enviar avatar");

      resetAvatarModal();
      await carregarPerfil();
    } catch (err) {
      console.error(err);
      alert("Erro ao enviar avatar");
    } finally {
      btnUploadAvatar.disabled = false;
    }
  });

  function showModalLogin() { showModal(modalLoginReq); }
  btnCloseLoginReq.addEventListener("click", () => hideModal(modalLoginReq));
  btnGoLogin.addEventListener("click", () => { window.location.href = "../Login/login.html"; });

  carregarPerfil();
});