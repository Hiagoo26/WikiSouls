function criaModal() {
    const modalHTML = `
        <div id="loginModal" class="hidden" style=" position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1001;">
            <div style="background: #1c1c1c; padding: 50px; border-radius: 10px; width: 300px; text-align: center; color: white; position: relative;">
                <i class="fa-solid fa-xmark close" id="fecharLogin" style="position: absolute; top: 15px; right: 15px; font-size: 22px; cursor: pointer; color: var(--firstcolor);"></i>
                <!-- Tela Login -->
                <div id="telaLogin">
                    <h2 style="margin-bottom: 15px; font-family: var(--font1)"> LOGIN </h2>
                    <form id="formLogin">
                        <input type="email" id="email" placeholder="E-mail" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor); background: var(--primarycolor); color: var(--firstcolor);">
                        <input type="password" id="senha" placeholder="Senha" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor); background: var(--primarycolor); color: var(--firstcolor);">
                        <button type="submit" style=" width: 50%; padding: 10px; margin-top: 12px;border: 1px solid var(--firstcolor); border-radius: 6px; background-color: var(--firstcolor); color: white;font-family: var(--font1); font-size: 1rem; cursor: pointer; transition: background 0.3s ease;"> ENTRAR </button>
                    </form>
                    <div style="margin-top: 15px; text-align: center;">
                        <a href="#"style="color: var(--firstcolor); text-decoration: none; font-size: 0.9rem; cursos: pointer;"> Esqueceu a Senha? </a>
                    </div>
                    <div style="margin-top: 20px; text-align: center;">
                        <a href="#" id="linkCadastro" style="color: var(--firstcolor); text-decoration: none; font-size: 0.9rem; cursos: pointer;"> Ainda não tem uma  conta? Cadastre-se já </a>
                    </div>
                    
                </div>

                <!-- Tela Cadastro -->
                <div id="telaCadastro" style="display: none;">
                    <h2 style="margin-bottom: 15px; font-family: var(--font1)"> CADASTRO </h2>
                    <form id="formCadastro">
                        <input type="text" id="nomeCadastro" placeholder="Nome" required style="width:100%; padding:8px; margin:8px 0; border-radius:5px; border:1px solid var(--firstcolor); background: var(--primarycolor); color: var(--firstcolor);">
                        <input type="email" id="email" placeholder="E-mail" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor); background: var(--primarycolor); color: var(--firstcolor);">
                        <input type="password" id="senha" placeholder="Senha" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor); background: var(--primarycolor); color: var(--firstcolor);">
                        <button type="submit" style=" width: 50%; padding: 10px; margin-top: 12px;border: 1px solid var(--firstcolor); border-radius: 6px; background-color: var(--firstcolor); color: white;font-family: var(--font1); font-size: 1rem; cursor: pointer; transition: background 0.3s ease;"> ENTRAR </button>
                    </form>
                     <div style="margin-top: 15px; text-align: center;">
                        <a href="#" id="linkLogin" style="color: var(--firstcolor); text-decoration: none; font-size: 0.9rem; cursos: pointer;"> Ja tem um conta? Faça login</a>
                    </div>
                <div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("loginModal");
    const fechar = document.getElementById("fecharLogin");

    fechar.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    document.getElementById("linkCadastro").addEventListener("click", (e) => {
        e.preventDefault();
        abrirCadastro();
    });

    document.getElementById("linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        abrirLogin();
    });

}

function abrirLogin() {
    let modal = document.getElementById("loginModal");
    if (!modal) criaModal();
    modal = document.getElementById("loginModal");
    modal.classList.remove("hidden");
    document.getElementById("telaLogin").style.display="block";
    document.getElementById("telaCadastro").style.display="none";
    modal.classList.remove("hidden");
}

function abrirCadastro() {
    let modal = document.getElementById("loginModal");
    if (!modal) criaModal();
    modal = document.getElementById("loginModal");
    document.getElementById("telaLogin").style.display = "none";
    document.getElementById("telaCadastro").style.display = "block";
    modal.classList.remove("hidden");
}

window.abrirLogin = abrirLogin;
window.abrirCadastro = abrirCadastro;

//Arumar a parte de fechar