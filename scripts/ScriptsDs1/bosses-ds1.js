const modal = document.getElementById("modal");
const bodymodal = document.getElementById("body-modal");
const fechar = document.getElementById("fechar");

let dadosChefes = {};

fetch('../../data/bosses_ds1.json')
    .then(res => res.json())
    .then(nome => {
        dadosChefes = nome;
        console.log('Carregou!')
    })
    .catch( error => {
        console.error("Erro:", error)
    });
    
function abrirModal(id) {
    const boss = dadosChefes[id];
    let conteudoHtml = `
        <h2 style="font-family: var(--font1); text-align: center;">${boss.nome}</h2>
        <hr>

        <div style="display: flex; gap: 20px; align-items: flex-start; margin-top: 10px;">
            <div style="flex: 1;">
                ${boss.desc ? `<p>${boss.desc}</p>` : ""}
            </div>
            <div style="width: 250px; text-align: center; flex-shrink: 0;">
                <img src="${boss.img}" alt="Aparência de ${boss.nome}" style="width: 100%;">
                ${boss.nome2 ? `<p style="font-size: 0.9em; font-style: italic; margin-top: 5px;">${boss.nome2}</p>` : ""}
            </div>
        </div>
        <hr>
    `;

    if (boss.vida || boss.vidaNG || boss.almas || boss.almasNG) {
        conteudoHtml += `
            <div style="display: flex; justify-content: space-around; text-align: center; margin: 15px 0;">
                <div>
                    <h4 style="text-decoration: underline; color: var(--firstcolor); margin: 0;">Vida</h4>
                    <p style="margin: 5px 0;">${boss.vida ?? ""} ${boss.vidaNG ? `/ ${boss.vidaNG}` : ""}</p>
                </div>
                <div>
                    <h4 style="text-decoration: underline; color: var(--firstcolor); margin: 0;">Almas</h4>
                    <p style="margin: 5px 0;">${boss.almas ?? ""} ${boss.almasNG ? `/ ${boss.almasNG}` : ""}</p>
                </div>
            </div>
            <hr>
        `;
    }

    if (boss.loc) {
        conteudoHtml += `
            <h2 style="font-family: var(--font1); color: var(--firstcolor);">Localização:</h2>
            <p>${boss.loc}</p>
            <hr>
        `;
    }

    if (boss.historias && boss.historias.length > 0){
        conteudoHtml += `
            <h2 style="font-family: var(--font1); color: var(--firstcolor);">História e Lore:</h2>
            <ol style="padding-left: 20px; margin-top: 10px; list-style: none;">
        `;

        boss.historias.forEach(tituloEhistoria => {
            conteudoHtml += `
                <li>
                    <strong style=" text-decoration: underline; color: var(--firstcolor);">${tituloEhistoria.titulo}</strong>
                    <p style="margin-top: 5px; margin-bottom: 10px;">${tituloEhistoria.historia ?? ""}</p>
                </li>
            `;
        });
        conteudoHtml += `</ol>`;
    }

   if (boss.drops && boss.drops.length > 0){
        conteudoHtml += `
            <hr>
            <h2 style="font-family: var(--font1); color: var(--firstcolor); margin-top: 20px;">Drop</h2>            
        `;

        boss.drops.forEach(drop => {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${drop.img}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${drop.desc}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${drop.chance}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        });

    }

    if(boss.resistencia){
        conteudoHtml += `
            <hr> 
            <h2 style="font-family: var(--font1); color: var(--firstcolor); margin-top: 20px;">Resistências</h2>
            <p>${boss.resistencia}</p>
        `;
    }

    if(boss.fraquezas){
        conteudoHtml += `
            <hr> 
            <h2 style="font-family: var(--font1); color: var(--firstcolor); margin-top: 20px;">Fraquezas</h2>
            <p>${boss.fraquezas}</p> 
        `;
    }

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
