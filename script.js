const modal = document.getElementById("modal");
const bodymodal = document.getElementById("body-modal");
const fechar = document.getElementById("fechar");

const dadosChefes = {
    gwyn: {
        nome: "Gwyn, Lord of Cinder (Gwyn, Lorde das Cinzas)",
        nome2: "Gwyn, Lord of Cinder",
        img: "../../assets/images/gwyn.jpg",
        vida: "NG 4,185",
        vidaNG: "NG+ 6,745",
        almas: "NG 70k",
        almasNG: "NG+ 140k",
        desc: "Também conhecido como Gwyn, Senhor da Luz do Sol, um dos quatro Lordes originais da Era do Fogo e o principal antagonista/chefe final no Dark Souls.",
        loc: "Enfrentado na Clareira da Primeira Chama, após coletar e usar as Almas dos Lordes no Lordvessel.",
        historia1: "Unidas forças de três Lordes (Gwyn, Nito, Bruxa de Izalith), com aliados como Seath e Havel, destruíram os dragões usando relâmpagos, fogo e miasma.",
        historia2: "Gwyn governava de Anor Londo. Presenteou Seath e estabeleceu a Cidade Anelar para os Pygmy Lords (e humanos), incluindo membros como Gwynevere, Gwyndolin, Filianore e Lloyd.",
        historia3: "Criou seus cavaleiros mais leais e entregou anéis especiais a Orstein, Gough, Ciaran e Artorias.",
        historia4: "Quando a chama começou a desaparecer, Gwyn sacrificou seu próprio poder, entrou na Primeira Chama e virou o Lorde das Cinzas, enquanto seu reino e cavaleiros sucumbiam.",
        historia5: "Inspirou a profecia que guia o Chosen Undead a Lordran, com a missão de sacrificar-se ou negar a chama, gerando finais diferentes. Ele é reverenciado como pilar da Era do Fogo.",
        historia6: "Em DSII seu nome se transforma em lenda (referido como o “Deus do Sol”), e só restam poucos milagres ligados a ele. No DSIII sua essência aparece na entidade “Soul of Cinder” como desafio final.",

        
    }
};

function abrirModal(id) {
    const boss = dadosChefes[id];
    const conteudoHtml = `
    <h2 style="font-family: var(--font1); text-align: center;">${boss.nome}</h2>
    <hr>

    <div style="display: flex; gap: 20px; align-items: flex-start; margin-top: 10px;">
        <div style="flex: 1;">
            <p>${boss.desc}</p>
        </div>
        <div style="width: 250px; text-align: center; flex-shrink: 0;">
            <img src="${boss.img}" alt="Aparência de ${boss.nome}" style="width: 100%;">
            <p style="font-size: 0.9em; font-style: italic; margin-top: 5px;">${boss.nome2}</p>
        </div>
    </div>
    <hr>

    <div style="display: flex; justify-content: space-around; text-align: center; margin: 15px 0;">
        <div>
            <h4 style="text-decoration: underline; color: var(--firstcolor); margin: 0;">Vida</h4>
            <p style="margin: 5px 0;">${boss.vida} / ${boss.vidaNG}</p>
        </div>
        <div>
            <h4 style="text-decoration: underline; color: var(--firstcolor); margin: 0;">Almas</h4>
            <p style="margin: 5px 0;">${boss.almas} / ${boss.almasNG}</p>
        </div>
    </div>

    <hr>
    <h2 style="font-family: var(--font1); color: var(--firstcolor);">Localização:</h2>
    <p>${boss.loc}</p>
    <hr>
    <h2 style="font-family: var(--font1); color: var(--firstcolor);">História e Lore:</h2>
    <ol style="padding-left: 20px; margin-top: 10px; list-style: none;">
        <li>
            <strong style=" text-decoration: underline; color: var(--firstcolor);">Guerra contra os Dragões</strong>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia1}</p>
        </li>
        <li>
            <strong style=" text-decoration: underline; color: var(--firstcolor);">Era do Fogo e Anor Londo</strong>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia2}</p>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia3}</p>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia4}</p>
        </li>
        <li>
            <strong style=" text-decoration: underline; color: var(--firstcolor);">Herança e Legado</strong>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia5}</p>
        </li>
        <li>
            <strong style=" text-decoration: underline; color: var(--firstcolor);">Dark Souls II & III</strong>
            <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia6}</p>
        </li>
    </ol>
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
