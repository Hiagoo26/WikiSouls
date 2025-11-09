// scripts/post.js
document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  const container = document.getElementById("post-container");
  const listaComentarios = document.getElementById("lista-comentarios");
  const novoComentario = document.getElementById("novoComentario");
  const enviarComentario = document.getElementById("enviarComentario");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const API = "http://localhost:2611/api/post";

  if (!postId) {
    container.innerHTML = "<p>Post não encontrado.</p>";
    return;
  }

  // Helper: faz fetch com token e JSON/body opcional
  async function apiFetch(url, options = {}) {
    const headers = options.headers || {};
    if (token) headers.Authorization = `Bearer ${token}`;
    options.headers = headers;

    // se options.body é objeto (não FormData), transforma em JSON
    if (options.body && typeof options.body === "object" && !(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(options.body);
    }

    const res = await fetch(url, options);
    // tenta parsear json com segurança
    let data;
    try { data = await res.json(); } catch (e) { data = null; }
    if (!res.ok) {
      const msg = (data && data.error) ? data.error : `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  }

  // Converte imagemUrl do post em src completo (se necessário)
  function resolveImageUrl(url) {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;

    // Corrige barras invertidas do Windows e monta o caminho certo
    const cleanUrl = url.replace(/\\/g, "/").replace(/^\/+/, "");
    return `http://localhost:2611/${cleanUrl}`;
  }

  // CARREGA POST
  async function carregarPost() {
    try {
      const post = await apiFetch(`${API}/${postId}`);

      const imgSrc = resolveImageUrl(post.imagemUrl);

      container.innerHTML = `
        <article class="post">
          <div class="post-header">
            <div style="display:flex; gap:10px; align-items:center;">
              <img src="${post.autor?.avatar || 'https://i.imgur.com/default.png'}" class="avatar" alt="avatar">
              <h3 class="username">${post.autor?.nick || "Usuário"}</h3>
            </div>
            <div>
              <span class="date">${new Date(post.criadoEm).toLocaleString()}</span>
            </div>
          </div>

          ${post.titulo ? `<h2 class="post-title">${escapeHtml(post.titulo)}</h2>` : ""}
          <p class="content">${escapeHtml(post.conteudo)}</p>

          ${imgSrc ? `<img src="${imgSrc}" class="post-image" alt="imagem do post">` : ""}

          <div class="post-actions">
            <button id="likePostBtn"><i class="fa-regular fa-thumbs-up"></i> Curtir (${(post.likes || []).length})</button>

            ${
              user && (user.id === post.autorId || user.role === "ADMIN")
                ? `<button id="editarPostBtn"><i class="fa-solid fa-pencil"></i> Editar</button>
                   <button id="deletarPostBtn"><i class="fa-solid fa-trash"></i> Remover</button>`
                : ""
            }
          </div>
        </article>
      `;

      // Like do post
      const likeBtn = document.getElementById("likePostBtn");
      if (likeBtn) {
        likeBtn.addEventListener("click", async (e) => {
          try {
            if (!user) return showCustomAlert("Faça login para curtir."); // ❗️ SUBSTITUÍDO
            await apiFetch(`${API}/${postId}/like`, {
              method: "POST",
              body: { autorId: user.id },
            });
            await carregarPost();
          } catch (err) {
            console.error("Erro like post:", err);
            showCustomAlert("Erro ao curtir post: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      }

      // Deletar post
      const deletarBtn = document.getElementById("deletarPostBtn");
      if (deletarBtn) {
        deletarBtn.addEventListener("click", async () => {
          // ❗️ SUBSTITUÍDO (confirm)
          const confirmed = await showCustomConfirm("Tem certeza que deseja remover este post?");
          if (!confirmed) return;
          try {
            await apiFetch(`${API}/${postId}`, {
              method: "DELETE",
              body: { autorId: user.id },
            });
            window.location.href = "comunidade.html";
          } catch (err) {
            console.error("Erro deletar post:", err);
            showCustomAlert("Erro ao deletar post: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      }

      // Editar post
      const editarBtn = document.getElementById("editarPostBtn");
      if (editarBtn) {
        editarBtn.addEventListener("click", async () => {
          // ❗️ SUBSTITUÍDO (prompt)
          const novoTitulo = await showCustomPrompt("Novo título:", post.titulo || "");
          if (novoTitulo === null) return; // cancelou

          // ❗️ SUBSTITUÍDO (prompt)
          const novoConteudo = await showCustomPrompt("Novo conteúdo:", post.conteudo || "");
          if (novoConteudo === null) return; // cancelou

          try {
            await apiFetch(`${API}/${postId}`, {
              method: "PUT",
              body: { titulo: novoTitulo, conteudo: novoConteudo, autorId: user.id },
            });
            carregarPost();
          } catch (err) {
            console.error("Erro editar post:", err);
            showCustomAlert("Erro ao editar post: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      }
    } catch (err) {
      console.error("Erro ao carregar post:", err);
      container.innerHTML = "<p>Erro ao carregar post.</p>";
    }
  }

  // CARREGA COMENTÁRIOS
  async function carregarComentarios() {
    try {
      const comentarios = await apiFetch(`${API}/${postId}/comentarios`);
      if (!Array.isArray(comentarios) || comentarios.length === 0) {
        listaComentarios.innerHTML = "<p>Sem comentários.</p>";
        return;
      }

      listaComentarios.innerHTML = comentarios
        .map((c) => {
          const img = c.autor?.avatar || "https://i.imgur.com/default.png";
          const likesCount = c.likes ? c.likes.length : 0;
          // botões de ação (editar/deletar) só pro dono ou admin
          const ownerBtns = (user && (user.id === c.autorId || user.role === "ADMIN"))
            ? `<button class="edit-comment" data-id="${c.id}"><i class="fa-solid fa-pencil"></i></button>
               <button class="delete-comment" data-id="${c.id}"><i class="fa-solid fa-trash"></i></button>`
            : "";

          // retorna markup do comentário
          return `
            <div class="comentario" data-id="${c.id}">
              <div style="display:flex; gap:10px; align-items:center;">
                <img src="${img}" class="avatar-small" alt="avatar">
                <strong>@${c.autor?.nick || "Usuário"}</strong>
                <span style="margin-left:auto; color:#a1a1a1; font-size:.9rem;">${new Date(c.criadoEm).toLocaleString()}</span>
              </div>

              <p class="comentario-text">${escapeHtml(c.conteudo)}</p>

              <div class="comentario-actions">
                <button class="like-comment" data-id="${c.id}"><i class="fa-regular fa-thumbs-up"></i> (${likesCount})</button>
                ${ownerBtns}
              </div>
            </div>
          `;
        })
        .join("");

      // delegação de eventos: like comentario, deletar, editar
      listaComentarios.querySelectorAll(".like-comment").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.dataset.id;
          if (!user) return showCustomAlert("Faça login para curtir."); // ❗️ SUBSTITUÍDO
          try {
            await apiFetch(`${API}/comentario/${id}/like`, {
              method: "POST",
              body: { autorId: user.id },
            });
            carregarComentarios();
          } catch (err) {
            console.error("Erro curtir comentário:", err);
            showCustomAlert("Erro ao curtir comentário: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      });

      listaComentarios.querySelectorAll(".delete-comment").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.dataset.id;
          // ❗️ SUBSTITUÍDO (confirm)
          const confirmed = await showCustomConfirm("Remover comentário?");
          if (!confirmed) return;
          try {
            await apiFetch(`${API}/comentario/${id}`, {
              method: "DELETE",
              body: { autorId: user.id },
            });
            carregarComentarios();
          } catch (err) {
            console.error("Erro deletar comentário:", err);
            showCustomAlert("Erro ao deletar comentário: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      });

      listaComentarios.querySelectorAll(".edit-comment").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.currentTarget.dataset.id;
          const atual = comentarios.find((x) => x.id == id);
          // ❗️ SUBSTITUÍDO (prompt)
          const novo = await showCustomPrompt("Editar comentário:", atual ? actualEscapeToPlain(atual.conteudo) : "");
          if (novo === null) return;
          try {
            await apiFetch(`${API}/comentario/${id}`, {
              method: "PUT",
              body: { conteudo: novo, autorId: user.id },
            });
            carregarComentarios();
          } catch (err)
 {
            console.error("Erro editar comentário:", err);
            showCustomAlert("Erro ao editar comentário: " + err.message); // ❗️ SUBSTITUÍDO
          }
        });
      });
    } catch (err) {
      console.error("Erro ao carregar comentários:", err);
      listaComentarios.innerHTML = "<p>Erro ao carregar comentários.</p>";
    }
  }

  // ENVIAR COMENTÁRIO
  enviarComentario.addEventListener("click", async () => {
    try {
      if (!user) return showCustomAlert("Faça login para comentar.");
      const texto = novoComentario.value.trim();
      if (!texto) return showCustomAlert("Escreva algo!");

      await apiFetch(`${API}/${postId}/comentarios`, {
        method: "POST",
        body: { conteudo: texto, autorId: user.id },
      });

      novoComentario.value = "";
      carregarComentarios();
    } catch (err) {
      console.error("Erro ao enviar comentário:", err);
      showCustomAlert("Erro ao enviar comentário: " + err.message);
    }
  });

  // util: escape básico pra evitar XSS em textos exibidos
  function escapeHtml(str) {
    if (!str && str !== "") return "";
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // util: transforma texto com entidades em plain (usado no prompt)
  function actualEscapeToPlain(s) {
    if (!s) return "";
    return s
      .replaceAll("&amp;", "&")
      .replaceAll("&lt;", "<")
      .replaceAll("&gt;", ">")
      .replaceAll("&quot;", '"')
      .replaceAll("&#039;", "'");
  }

  function createModalBase() {
    const backdrop = document.createElement("div");
    backdrop.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:1000;";

    const modalBox = document.createElement("div");
    modalBox.style.cssText = "background: var(--primarycolor); padding:20px; border: 1px solid var(--firstcolor); border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.2); max-width:400px; width:90%;";

    backdrop.appendChild(modalBox);
    
    return { backdrop, modalBox };
  }

  /**
   * Exibe um alerta customizado.
   * @param {string} message - A mensagem para exibir.
   */
  function showCustomAlert(message) {
    return new Promise((resolve) => {
      const { backdrop, modalBox } = createModalBase();

      const msgEl = document.createElement("p");
      msgEl.textContent = message;
      msgEl.style.cssText = "margin:0 0 15px 0; color: white; font-size:16px;";
      
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "OK";
      closeBtn.style.cssText = "padding:8px 16px; background: var(--firstcolor); color:white; border:none; border-radius:5px; cursor:pointer; width:100%;";

      modalBox.appendChild(msgEl);
      modalBox.appendChild(closeBtn);
      document.body.appendChild(backdrop);

      const closeModal = () => {
        document.body.removeChild(backdrop);
        resolve();
      };

      closeBtn.addEventListener("click", closeModal);
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal();
      });
    });
  }

  /**
   * Exibe um modal de confirmação (OK/Cancelar).
   * @param {string} message 
   * @returns {Promise<boolean>} 
   */
  function showCustomConfirm(message) {
    return new Promise((resolve) => {
      const { backdrop, modalBox } = createModalBase();

      const msgEl = document.createElement("p");
      msgEl.textContent = message;
      msgEl.style.cssText = "margin:0 0 15px 0; color: white; font-size:16px;";

      const btnGroup = document.createElement("div");
      btnGroup.style.cssText = "display:flex; justify-content:flex-end; gap:10px;";
      
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancelar";
      cancelBtn.style.cssText = "padding:8px 16px; background:#6c757d; color:white; border:none; border-radius:5px; cursor:pointer;";

      const okBtn = document.createElement("button");
      okBtn.textContent = "Confirmar";
      okBtn.style.cssText = "padding:8px 16px; background:#dc3545; color:white; border:none; border-radius:5px; cursor:pointer;"; // Vermelho para perigo

      btnGroup.appendChild(cancelBtn);
      btnGroup.appendChild(okBtn);
      modalBox.appendChild(msgEl);
      modalBox.appendChild(btnGroup);
      document.body.appendChild(backdrop);

      const closeModal = (result) => {
        document.body.removeChild(backdrop);
        resolve(result);
      };

      okBtn.addEventListener("click", () => closeModal(true));
      cancelBtn.addEventListener("click", () => closeModal(false));
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal(false);
      });
    });
  }

  /**
   * Exibe um prompt customizado com <textarea>.
   * @param {string} message - A mensagem/label para o input.
   * @param {string} defaultValue - O valor inicial do campo.
   * @returns {Promise<string|null>} - Resolve com o texto ou `null` (se cancelado).
   */
  function showCustomPrompt(message, defaultValue = "") {
    return new Promise((resolve) => {
      const { backdrop, modalBox } = createModalBase();

      const msgEl = document.createElement("p");
      msgEl.textContent = message;
      msgEl.style.cssText = "margin:0 0 10px 0; color: white; font-size:16px;";
      
      const inputEl = document.createElement("textarea");
      inputEl.value = defaultValue;
      inputEl.rows = 4;
      inputEl.style.cssText = "width:100%; padding:8px; border: 2px solid var(--firstcolor); border-radius:5px; box-sizing:border-box; font-family:inherit; font-size:14px; margin-bottom:15px;";

      const btnGroup = document.createElement("div");
      btnGroup.style.cssText = "display:flex; justify-content:flex-end; gap:10px;";
      
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancelar";
      cancelBtn.style.cssText = "padding:8px 16px; background:#6c757d; color:white; border:none; border-radius:5px; cursor:pointer;";

      const okBtn = document.createElement("button");
      okBtn.textContent = "OK";
      okBtn.style.cssText = "padding:8px 16px; background: var(--firstcolor); color:white; border:none; border-radius:5px; cursor:pointer;";

      btnGroup.appendChild(cancelBtn);
      btnGroup.appendChild(okBtn);
      modalBox.appendChild(msgEl);
      modalBox.appendChild(inputEl);
      modalBox.appendChild(btnGroup);
      document.body.appendChild(backdrop);

      inputEl.focus(); // Foca no campo de texto

      const closeModal = (result) => {
        document.body.removeChild(backdrop);
        resolve(result);
      };

      okBtn.addEventListener("click", () => closeModal(inputEl.value));
      cancelBtn.addEventListener("click", () => closeModal(null));
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) closeModal(null);
      });
    });
  }


  // inicializa
  carregarPost();
  carregarComentarios();
});