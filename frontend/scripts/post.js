document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const container = document.getElementById("post-container");
  const comentariosDiv = document.getElementById("lista-comentarios");
  const novoComentario = document.getElementById("novoComentario");
  const enviarBtn = document.getElementById("enviarComentario");
  const token = localStorage.getItem("token");

  if (!postId) {
    container.innerHTML = "<p>Post não encontrado.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:2611/api/post/${postId}`);
    const post = await res.json();

    container.innerHTML = `
      <article class="post">
        <div class="post-header">
          <img src="${post.usuario.avatar}" alt="Avatar" class="avatar">
          <div>
            <h3 class="username">${post.usuario.nick}</h3>
            <span class="date">${new Date(post.criadoEm).toLocaleDateString()}</span>
          </div>
        </div>
        <p class="content">${post.conteudo}</p>
        ${post.imagem ? `<img src="${post.imagem}" class="post-image">` : ""}
      </article>
    `;

    const resComentarios = await fetch(`http://localhost:2611/api/post/${postId}/comentarios`);
    const comentarios = await resComentarios.json();

    comentariosDiv.innerHTML = comentarios.length
      ? comentarios
          .map(
            (c) => `
          <div class="comentario">
            <strong>${c.usuario.nick}</strong>
            <p>${c.conteudo}</p>
          </div>`
          )
          .join("")
      : "<p>Sem comentários ainda.</p>";

    enviarBtn.addEventListener("click", async () => {
      const texto = novoComentario.value.trim();
      if (!texto) return alert("Digite algo!");

      const resAdd = await fetch(`http://localhost:2611/api/post/${postId}/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conteudo: texto }),
      });

      if (resAdd.ok) {
        novoComentario.value = "";
        location.reload();
      } else {
        alert("Erro ao comentar!");
      }
    });
  } catch (err) {
    console.error("Erro ao carregar post:", err);
  }
});
