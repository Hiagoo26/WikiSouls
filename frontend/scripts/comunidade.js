document.addEventListener("DOMContentLoaded", async () => {
  const postList = document.getElementById("post-list");

  // Elementos do modal
  const modal = document.getElementById("postModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const publishBtn = document.getElementById("publishPost");
  const postTitle = document.getElementById("postTitle");
  const postText = document.getElementById("postText");
  const postImage = document.getElementById("postImage");
  const imagePreviewContainer = document.getElementById("imagePreviewContainer");
  const imagePreview = document.getElementById("imagePreview");

  // 🔹 Abrir e fechar modal
  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    limparCampos();
  });

  // 🔹 Pré-visualização da imagem
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

  // 🔹 Função para limpar campos
  function limparCampos() {
    postTitle.value = "";
    postText.value = "";
    postImage.value = "";
    imagePreviewContainer.classList.add("hidden");
    imagePreview.src = "";
  }

  // 🔹 Função para carregar posts
  async function carregarPosts() {
    try {
      const res = await fetch("http://localhost:2611/api/post");
      const posts = await res.json();

      if (!Array.isArray(posts) || posts.length === 0) {
        postList.innerHTML = "<p>Nenhum post encontrado.</p>";
        return;
      }

      postList.innerHTML = posts.map(post => `
        <article class="post" onclick="window.location.href='post.html?id=${post.id}'">
          <div class="post-header">
            <img src="${post.autor.avatar}" alt="Avatar" class="avatar">
            <div>
              <h3 class="username">${post.autor.nick}</h3>
              <span class="date">${new Date(post.criadoEm).toLocaleDateString()}</span>
            </div>
          </div>

          ${post.titulo ? `<h4 class="post-title">${post.titulo}</h4>` : ""}
          <p class="content">${post.conteudo}</p>
          ${post.imagemUrl ? `<img src="${post.imagemUrl}" class="post-image">` : ""}
          <div class="post-footer">
            <span><i class="fa-regular fa-comment"></i> Comentários (${post._count.comentarios})</span>
            <span><i class="fa-regular fa-thumbs-up"></i> Likes (${post._count.likes})</span>
          </div>
        </article>
      `).join("");
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      postList.innerHTML = "<p>Erro ao carregar posts.</p>";
    }
  }

  // 🔹 Publicar novo post
  publishBtn.addEventListener("click", async () => {
    const titulo = postTitle.value.trim();
    const conteudo = postText.value.trim();
    const imagem = postImage.files[0];
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Você precisa estar logado!");
      return;
    }

    if (!conteudo && !imagem) {
      alert("Escreva algo ou adicione uma imagem!");
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
        alert("Erro ao criar post.");
        return;
      }

      console.log("Post criado:", await res.json());
      limparCampos();
      modal.classList.add("hidden");
      carregarPosts();
    } catch (error) {
      console.error("Erro ao enviar post:", error);
      alert("Erro ao enviar post.");
    }
  });

  carregarPosts();
});
