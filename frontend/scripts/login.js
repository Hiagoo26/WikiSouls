function abrirLogin() {
    document.getElementById("telaLogin").style.display = "block";
    document.getElementById("telaCadastro").style.display = "none";
}

function abrirCadastro() {
    document.getElementById("telaCadastro").style.display = "block";
    document.getElementById("telaLogin").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const linkCadastro = document.getElementById("linkCadastro");
    const linkLogin = document.getElementById("linkLogin");

    if(linkCadastro) {
        linkCadastro.addEventListener("click", (e) => {
            e.preventDefault();
            abrirCadastro();
        });
    }

    if(linkLogin) {
        linkLogin.addEventListener("click", (e) => {
            e.preventDefault();
            abrirLogin();
        });
    }
})

const API_BASE = "https://wikisouls-production.up.railway.app/api/auth";

document.addEventListener("DOMContentLoaded", () => {
  // elements
  const telaLogin = document.getElementById("telaLogin");
  const telaCadastro = document.getElementById("telaCadastro");
  const linkCadastro = document.getElementById("linkCadastro");
  const linkLogin = document.getElementById("linkLogin");

  const formLogin = document.getElementById("formLogin");
  const formCadastro = document.getElementById("formCadastro");

  linkCadastro.addEventListener("click", (e) => {
    e.preventDefault();
    telaLogin.style.display = "none";
    telaCadastro.style.display = "block";
  });

  linkLogin.addEventListener("click", (e) => {
    e.preventDefault();
    telaCadastro.style.display = "none";
    telaLogin.style.display = "block";
  });

  // LOGIN
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      console.log("Resposta da API:", data);

      if (!res.ok) {
        alert(data.erro || data.message || "Erro no login");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.usuario || {}));
      localStorage.removeItem("needsSetup");

      window.location.href = "../../pages/Comunidade/comunidade.html";
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  });

  // CADASTRO
  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailCadastro").value.trim();
    const senha = document.getElementById("senhaCadastro").value;

    try {
      const res = await fetch(`${API_BASE}/cadastro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || data.message || "Erro ao cadastrar");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.usuario) {
        localStorage.setItem("user", JSON.stringify(data.usuario));
      }
      localStorage.setItem("needsSetup", "true");

      window.location.href = "../../pages/Comunidade/comunidade.html";
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com o servidor.");
    }
  });

  // ESQUECEU A SENHA (link dentro do HTML)
  const esqueceuLink = document.querySelector(".form-links a[href='#']");
  if (esqueceuLink) {
    esqueceuLink.addEventListener("click", async (e) => {
      e.preventDefault();
      const email = prompt("Informe o email associado à conta:");
      if (!email) return alert("Email é necessário.");

      try {
        const r1 = await fetch(`${API_BASE}/esqueci-senha`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const j1 = await r1.json();
        if (!r1.ok) return alert(j1.erro || j1.message || "Erro ao solicitar código.");

        alert("Código enviado ao seu email. Verifique e confirme a seguir.");

        const codigo = prompt("Insira o código que recebeu por e-mail:");
        if (!codigo) return alert("Código necessário.");

        const novaSenha = prompt("Insira a nova senha:");
        if (!novaSenha) return alert("Senha necessária.");

        const r2 = await fetch(`${API_BASE}/resetar-senha`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, codigo, novaSenha }),
        });
        const j2 = await r2.json();
        if (!r2.ok) return alert(j2.erro || j2.message || "Erro ao resetar senha.");

        alert("Senha alterada com sucesso! Faça login com a nova senha.");
      } catch (err) {
        console.error(err);
        alert("Erro ao conectar com o servidor.");
      }
    });
  }
});