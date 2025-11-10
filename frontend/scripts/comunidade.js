document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.getElementById("post-list");
  const rankingList = document.getElementById("ranking-list"); // 👈 NOVO: Pega a lista do ranking

  // Elementos do modal de postagem
  const modal = document.getElementById("postModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const publishBtn = document.getElementById("publishPost");
  const postTitle = document.getElementById("postTitle");
  const postText = document.getElementById("postText");
  const postImage = document.getElementById("postImage");
  const imagePreviewContainer = document.getElementById("imagePreviewContainer");
  const imagePreview = document.getElementById("imagePreview");

  // Abrir e fechar modal de postagem
  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    limparCampos();
  });

  // Pré-visualização da imagem
  postImage.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreviewContainer.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      imagePreviewContainer.classList.add("hidden");
      imagePreview.src = "";
    }
  });

  // Função para limpar campos
  function limparCampos() {
    postTitle.value = "";
    postText.value = "";
    postImage.value = "";
    imagePreviewContainer.classList.add("hidden");
    imagePreview.src = "";
  }
  
  // 👈 NOVO: Função de segurança para HTML
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function showCustomAlert(message) {
    const modalBackdrop = document.createElement("div");
    modalBackdrop.style.position = "fixed";
    modalBackdrop.style.top = "0";
    modalBackdrop.style.left = "0";
    modalBackdrop.style.width = "100vw";
    modalBackdrop.style.height = "100vh";
    modalBackdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modalBackdrop.style.display = "flex";
    modalBackdrop.style.justifyContent = "center";
    modalBackdrop.style.alignItems = "center";
    modalBackdrop.style.zIndex = "10000";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "var(--primarycolor)";
    modalContent.style.padding = "20px 30px";
    modalContent.style.borderRadius = "8px";
    modalContent.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
    modalContent.style.maxWidth = "90%";
    modalContent.style.width = "300px";
    modalContent.style.textAlign = "center";

    const modalMessage = document.createElement("p");
    modalMessage.textContent = message;
    modalMessage.style.margin = "0 0 15px 0";
    modalMessage.style.fontSize = "16px";
    modalMessage.style.color = "white";

    const closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.style.padding = "8px 16px";
    closeButton.style.backgroundColor = "var(--firstcolor)";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "14px";

    modalContent.appendChild(modalMessage);
    modalContent.appendChild(closeButton);
    modalBackdrop.appendChild(modalContent);

    document.body.appendChild(modalBackdrop);

    function closeModal() {
      document.body.removeChild(modalBackdrop);
    }

    closeButton.addEventListener("click", closeModal);
    modalBackdrop.addEventListener("click", (event) => {
      if (event.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Função para carregar posts e o ranking
  async function carregarConteudo() {
    try {
      const res = await fetch("http://localhost:2611/api/post");
      const posts = await res.json();

      if (!Array.isArray(posts) || posts.length === 0) {
        postList.innerHTML = "<p>Nenhum post encontrado.</p>";
        rankingList.innerHTML = "<li>Nenhum post para classificar.</li>"; // 👈 NOVO
        return;
      }

      const rankedPosts = [...posts].sort((a, b) => b._count.likes - a._count.likes);
      const top10 = rankedPosts.slice(0, 10);

      rankingList.innerHTML = top10.map(post => {
        const titulo = escapeHtml(post.titulo) || "Post sem título";
        return `<li><a href="post.html?id=${post.id}">${titulo}</a></li>`;
      }).join('');

      postList.innerHTML = posts.map(post => `
        <article class="post" onclick="window.location.href='post.html?id=${post.id}'">
          <div class="post-header">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="${post.autor.avatar}" alt="Avatar" class="avatar">
              <a href="perfil.html?id=${post.autor.id}" onclick="event.stopPropagation()" style="text-decoration: none; color: inherit;">
                <h3 class="username">${post.autor.nick}</h3>
              </a>
            </div>
            <div>
              <span class="date">${new Date(post.criadoEm).toLocaleDateString()}</span>
            </div>
          </div>
          ${post.titulo ? `<h4 class="post-title">${escapeHtml(post.titulo)}</h4>` : ""}
          <p class="content">${escapeHtml(post.conteudo)}</p>
          ${post.imagemUrl ? `<img src="${post.imagemUrl}" class="post-image">` : ""}
          <div class="post-footer">
            <span><i class="fa-regular fa-comment"></i> Comentários (${post._count.comentarios})</span>
            <span><i class="fa-regular fa-thumbs-up"></i> Curtidas (${post._count.likes})</span>
          </div>
        </article>
      `).join("");

    } catch (err) {
      console.error("Erro ao carregar conteúdo:", err);
      postList.innerHTML = "<p>Erro ao carregar posts.</p>";
      rankingList.innerHTML = "<li>Erro ao carregar ranking.</li>";
    }
  }

  // Publicar novo post
  publishBtn.addEventListener("click", async () => {
    const titulo = postTitle.value.trim();
    const conteudo = postText.value.trim();
    const imagem = postImage.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      showCustomAlert("Você precisa estar logado!");
      return;
    }

    if (!conteudo && !imagem) {
      showCustomAlert("Escreva algo ou adicione uma imagem!");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("conteudo", conteudo);
    formData.append("autorId", user.id);
    if (imagem) formData.append("imagem", imagem);

    try {
      const res = await fetch("http://localhost:2611/api/post", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Erro ao postar:", err);
        showCustomAlert("Erro ao criar post.");
        return;
      }

      limparCampos();
      modal.classList.add("hidden");
      carregarConteudo(); // Recarrega os posts e o ranking
    } catch (error) {
      console.error("Erro ao enviar post:", error);
      showCustomAlert("Erro ao enviar post.");
    }
  });

  carregarConteudo(); // Chama a função principal que carrega tudo
});