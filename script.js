const modal = document.getElementById("modal");
const bodymodal = document.getElementById("body-modal");
const fechar = document.getElementById("fechar");

const dadosChefes = {
    gwyn: {
        nome: "Gwyn, Lord of Cinder",
        img: "../../assets/images/gwyn.jpg",
        desc: "Último chefe"
    }
};

function abrirModal(id) {
    const boss = dadosChefes[id];
    const conteudoHtml = `
    <h2 style=" font-family: var(--font1)">${boss.nome}</h2>
    <hr>
    <div style=" display: flex; gap: 20px; align-items: flex-start;">
        <div style=" display: flex; flex-direction: column;  max-width: 300px; align-items: center;">
            <img src="${boss.img}" alt="${boss.nome}" style=" width: 85%; height: 250px; display: block; margin-top: 8px;">
            <h3 style=" font-family: var(--fonttext) font-size: 0.1em;">Gwyn, Lord of Cinder</h3>
        </div>
        <div>
            <p>${boss.desc}</p>
        </div> 
    </div>
    `;
    bodymodal.innerHTML = conteudoHtml;
    modal.classList.remove("hidden");
}

fechar.addEventListener("click", () => {
    modal.classList.add("hidden");
    bodymodal.innerHTML = "";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        bodymodal.innerHTML = "";
    }
});
