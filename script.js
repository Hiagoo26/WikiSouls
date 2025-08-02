const modal = document.getElementById("modal");
const bodymodal = document.getElementById("body-modal");
const fechar = document.getElementById("fechar");

const dadosChefes = {
    gwyn: {
        nome: "Gwyn, Lord of Cinder (Gwyn, Lorde das Cinzas)",
        img: "../../assets/images/gwyn.jpg",
        vida: "NG 4,185",
        vidaNG: "NG+ 6,745",
        almas: "NG 70k",
        almasNG: "NG+ 140k",
        desc: "Gwyn Lorde das cinzas, outrora conhecido como Lord da Luz do sol, foi um dos quatros lordes originais emergidos durante o alvorecer da Era Fogo e o Principal antagonista e chefe Final de Dark Souls. Seus Atos são marcados pela forja de uma coalizão entres os três lordes originais e a extinção dos Dragões, resultando no inicio efetivo de uma nova era. Gwyn é o primeiro lorde a se vincular a primeiro Chama e prolongar a era do Fogo , tal façanha seria sucedida por Lordes Posteriores."
    }
};

function abrirModal(id) {
    const boss = dadosChefes[id];
    const conteudoHtml = `
    <h2 style=" font-family: var(--font1)">${boss.nome}</h2>
    <hr>
    <div style=" display: flex; gap: 20px; align-items: flex-start;">
        <div style=" display: flex; flex-direction: column;  max-width: 300px; align-items: center; justify-content: flex-start;">
            <img src="${boss.img}" alt="${boss.nome}" style=" width: 80%; height: 250px; display: block; margin-top: 8px;">
            <h3 style=" font-family: var(--fonttext) font-size: 0.1em; text-align: center;">Gwyn, Lord of Cinder</h3>
            <div style=" display: flex; width: %100; gap: 8px; align-items: center; text-align: start;">
                <h4 style="text-decoration: underline; color: var(--firstcolor)">Vida:</h4>
                <p>${boss.vida} <span>/</span> ${boss.vidaNG}</p>
            </div>
            <div style=" display: flex; width: %100; gap: 8px; align-items: center; text-align: start;">
                <h4 style="text-decoration: underline; color: var(--firstcolor)">Almas:</h4>
                <p>${boss.almas} <span>/</span> ${boss.almasNG}</p>
            </div>
        </div>
        <div style=" flex: 1;">
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
