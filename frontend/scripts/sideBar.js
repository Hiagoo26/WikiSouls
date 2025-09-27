const menuBtn = document.querySelector('.menu-button');
const sideBar = document.getElementById('sideBar')
const overlay = document.getElementById('overlay')
const fecharSideBar = document.getElementById('fecharSideBar');
const btnLogin = document.getElementById('btnLogin');
const btnCadastro = document.getElementById('btnCadastro');

function fechaSideBar() {
    sideBar.classList.remove("mostra");
    overlay.classList.add("hidden");
}

function abrirSideBar() {
    sideBar.classList.add("mostra");
    overlay.classList.remove("hidden");
}

menuBtn.removeAttribute("disabled");

menuBtn.addEventListener("click", () => {
    abrirSideBar();
});

fecharSideBar.addEventListener("click", () => {
    fechaSideBar();
});

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        fechaSideBar();
    }
})

btnLogin.addEventListener("click", () => {
    fechaSideBar();
    abrirLogin();
});

btnCadastro.addEventListener("click", () => {
    fechaSideBar();
    abrirCadastro();
});
