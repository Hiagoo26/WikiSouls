function criaModal() {
    const modalHTML = `
        <div id="loginModal" class="hidden" style=" position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1001;">
            <div style="background: #1c1c1c; padding: 50px; border-radius: 10px; width: 300px; text-align: center; color: white; position: relative;">
                <i class="fa-solid fa-xmark close" id="fecharLogin" style="position: absolute; top: 15px; right: 15px; font-size: 22px; cursor: pointer; color: var(--firstcolor);"></i>
                <h2 style="margin-bottom: 15px; font-family: var(--font1)"> LOGIN </h2>
                <form id="formLogin">
                    <input type="email" id="email" placeholder="E-mail" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor);">
                    <input type="password" id="senha" placeholder="Senha" required style="width: 100%; padding: 8px; margin: 8px 0; border-radius: 5px; border: 1px solid var(--firstcolor);">
                    <button type="submit" style="width: 100%; padding: 5px; margin: 8px 0; border-radius: 5px; background-color: var(--firstcolor); color: white; font-family: var(--font1);"> ENTRAR </button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.getElementById("loginModal");
    const fechar = document.getElementById("fecharLogin");
    const form = document.getElementById("formLogin");

    fechar.addEventListener("click", () => modal.classList.add("hidden"));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        alert(`Login realizado com sucesso! \nE-mail: ${email} \nSenha: ${senha}`);
        modal.classList.add("hidden");
    });
}

function abrirLogin() {
    const modal = document.getElementById("loginModal");
    if(!modal) criaModal();
    document.getElementById("loginModal").classList.remove("hidden");
}

// Ajustar o fechar, e sair ao clicar fora, ajustar tambem o style do btn ENTRAR