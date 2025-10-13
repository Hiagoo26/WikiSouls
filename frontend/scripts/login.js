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