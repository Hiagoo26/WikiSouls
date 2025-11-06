document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  const container = document.getElementById("post-container");
  const listaComentarios = document.getElementById("lista-comentarios");
  const novoComentario = document.getElementById("novoComentario");
  const enviarComentario = document.getElementById("enviarComentario");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!postId) {
    container.innerHTML = "<p>Post não encontrado.</p>";
    return;
  }

  // Carrega post
  async function carregarPost() {
    const res = await fetch(`http://localhost:2611/api/post/${postId}`);
    const post = await res.json();

    container.innerHTML = `
      <article class="post">
        <div class="post-header">
          <img src="${post.autor.avatar}" class="avatar">
          <div>
            <h3 class="username">@${post.autor.nick}</h3>
            <span class="date">${new Date(post.criadoEm).toLocaleString()}</span>
          </div>
        </div>

        ${post.titulo ? `<h2 class="post-title">${post.titulo}</h2>` : ""}

        <p class="content">${post.conteudo}</p>

        ${post.imagemUrl ? `<img src="${post.imagemUrl}" class="post-image">` : ""}

        <div class="post-actions">
          <button id="likePostBtn"><i class="fa-regular fa-thumbs-up"></i> Curtir (${post.likes.length})</button>

          ${
            user && (user.id === post.autorId || user.role === "ADMIN")
              ? `
              <button id="editarPostBtn">Editar</button>
              <button id="deletarPostBtn">Remover</button>
            `
              : ""
          }
        </div>
      </article>
    `;

    // Like post
    document.getElementById("likePostBtn").addEventListener("click", async () => {
      await fetch(`http://localhost:2611/api/post/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      carregarPost();
    });

    // Remove Post
    if (document.getElementById("deletarPostBtn")) {
      document.getElementById("deletarPostBtn").addEventListener("click", async () => {
        if (!confirm("Tem certeza que deseja remover?")) return;

        await fetch(`http://localhost:2611/api/post/${postId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        window.location.href = "comunidade.html";
      });
    }

    // Edita Post (abre textarea)
    if (document.getElementById("editarPostBtn")) {
      document.getElementById("editarPostBtn").addEventListener("click", async () => {
        const novoTexto = prompt("Novo conteúdo:", post.conteudo);
        if (!novoTexto) return;

        await fetch(`http://localhost:2611/api/post/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ conteudo: novoTexto }),
        });

        carregarPost();
      });
    }
  }


  // Carrega Comentario
  async function carregarComentarios() {
    const res = await fetch(`http://localhost:2611/api/post/${postId}/comentarios`);
    const comentarios = await res.json();

    listaComentarios.innerHTML = comentarios
      .map(
        (c) => `
        <div class="comentario">
          <img src="${c.autor.avatar}" class="avatar-small">
          <strong>@${c.autor.nick}</strong>

          <p>${c.conteudo}</p>

          <div class="comentario-actions">
            <button onclick="curtirComentario(${c.id})">❤️ (${c.likes.length})</button>

            ${
              user && (user.id === c.autorId || user.role === "ADMIN")
                ? `<button onclick="deletarComentario(${c.id})">🗑️</button>`
                : ""
            }
          </div>
        </div>
      `
      )
      .join("");
  }


  // Funções globais
  window.curtirComentario = async (comentarioId) => {
    await fetch(`http://localhost:2611/api/post/comentario/${comentarioId}/like`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    carregarComentarios();
  };

  window.deletarComentario = async (comentarioId) => {
    await fetch(`http://localhost:2611/api/post/comentario/${comentarioId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    carregarComentarios();
  };

  // Envia Comentario
  enviarComentario.addEventListener("click", async () => {
    const texto = novoComentario.value.trim();
    if (!texto) return alert("Escreva algo!");

    await fetch(`http://localhost:2611/api/post/${postId}/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ conteudo: texto }),
    });

    novoComentario.value = "";
    carregarComentarios();
  });

  carregarPost();
  carregarComentarios();
});
