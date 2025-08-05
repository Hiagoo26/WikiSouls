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
        titulo1: "Guerra contra os Dragões",
        titulo2: "Era do Fogo e Anor Londo",
        titulo3: "Herança e Legado",
        titulo4: "Dark Souls II & III",
        historia1: "Unidas forças de três Lordes (Gwyn, Nito, Bruxa de Izalith), com aliados como Seath e Havel, destruíram os dragões usando relâmpagos, fogo e miasma.",
        historia2: "Gwyn governava de Anor Londo. Presenteou Seath e estabeleceu a Cidade Anelar para os Pygmy Lords (e humanos), incluindo membros como Gwynevere, Gwyndolin, Filianore e Lloyd. <br> Criou seus cavaleiros mais leais e entregou anéis especiais a Orstein, Gough, Ciaran e Artorias. <br> Quando a chama começou a desaparecer, Gwyn sacrificou seu próprio poder, entrou na Primeira Chama e virou o Lorde das Cinzas, enquanto seu reino e cavaleiros sucumbiam.",
        historia3: "Inspirou a profecia que guia o Chosen Undead a Lordran, com a missão de sacrificar-se ou negar a chama, gerando finais diferentes. Ele é reverenciado como pilar da Era do Fogo.",
        historia4: "Em DSII seu nome se transforma em lenda (referido como o “Deus do Sol”), e só restam poucos milagres ligados a ele. No DSIII sua essência aparece na entidade “Soul of Cinder” como desafio final.", 
        dropimg: "../../assets/images/almagywn.webp",
        dropdesc: "Alma de Gwyn, Lorde das Cinzas",
        dropchance: "Garantido",
        fraquezas: "Parry(Contra-ataque) <br> Mágia <br> Status(Veneno e Toxina)",
        resistencia: "Fogo <br> Eletricidade(Lightning)"
    },
    asylumdemon: {
        nome: "Asylum Demon (Demonio do Asilo)",
        nome2: "Asylum Demon",
        img: "../../assets/images/asylumdemon.jpg",
        vida: "NG 813",
        vidaNG: "NG+ 2,195",
        almas: "NG 2k",
        almasNG: "NG+ 10k",
        desc: "O Asylum Demon é o primeiro chefe encontrado em Dark Souls. Ele representa o início da jornada do Escolhido, enfrentado ainda no Refúgio dos Mortos-Vivos. Apesar de ser um dos inimigos mais simples, é importante para apresentar as mecânicas do jogo.",
        loc: "Refúgio dos Mortos-Vivos (Undead Asylum). Ele é encontrado logo no início do jogo. O primeiro encontro é opcional (você pode fugir), e o confronto real acontece logo depois de recuperar suas armas.",
        titulo1: "Origem",
        titulo2: "Ligação com os outros demônios",
        titulo3: "Função no jogo",
        titulo4: "Extras",
        historia1: "O Asylum Demon é uma das criaturas demoníacas criadas a partir da alma do Demônio Estrangeiro (Stray Demon). Ele guarda o Refúgio dos Mortos-Vivos, onde os não-mortos são aprisionados até o fim dos tempos.",
        historia2: "Faz parte de uma linhagem de demônios que inclui o Stray Demon (versão mais forte) e o Demon Firesage. Todos compartilham características físicas parecidas e provêm de uma mesma alma corrompida.",
        historia3: "Ele é o teste inicial do jogador e introduz o conceito de chefes poderosos e arenas fechadas. A luta reforça o uso da estratégia e observação, elementos centrais da série.",
        historia4: "Se derrotado no primeiro encontro (antes de recuperar as armas), ele deixa cair o Grande Martelo do Demônio. Mais tarde, você enfrenta o Stray Demon no mesmo local, acessando uma parte secreta do Asylum.",
        dropimg: "../../assets/images/demongreathammer.webp",
        dropimg2: "../../assets/images/BigPilgrimKey.webp",
        dropimg3: "../../assets/images/humanidade.webp",
        dropdesc: "Demon's Great Hammer",
        dropdesc2: "Big Pilgrim's Key",
        dropdesc3: "Humanity",
        dropchance: "Garantido (Somente no primeiro encontro)",
        dropchance2: "Garantido (Somente depois de falar com Oscar)",
        dropchance3: "Garantido",
        fraquezas: "Fogo <br> Magia <br> Bleed(Sangramento)",
        resistencia: "Dano Físico <br> Poise alto"
    },
    
    bellgargoyles: {
        nome: "Bell Gargoyles (Gárgolas do Sino)",
        nome2: "Bell Gargoyles",
        img: "../../assets/images/gargolas.jpg",
        vida: "NG 1000 & 480",
        vidaNG: "NG+ 1500 & 1000",
        almas: "NG 10k",
        almasNG: "NG+ 50k",
        desc: "As Bell Gargoyles ou Belfry Gargoyles são chefe e mini-chefe de Dark Souls, eles protegem o primeiro Sino.",
        loc: "Oponente principal nos telhados da Undead Parish, Anor Londo, protegendo o primeiro Bell of Awakening. Também aparecem como mini-chefes dentro de Anor Londo.",
        titulo1: "Criação",
        titulo2: "Fim da era do fogo",
        historia1: "Criados por magia divina para patrulhar e proteger locais importantes como Anor Londo.",
        historia2: "Após o sacrifício de Gwyn para prolongar a Era do Fogo, os Gargoyles foram posicionados como teste ritualmente obrigatório para qualquer escolhido que tocasse o sino da igreja.",
        dropimg: "../../assets/images/gargoyleaxe.webp",  
        dropimg2: "../../assets/images/gargoylealabarda.webp",    
        dropimg3: "../../assets/images/escudogargula.webp",    
        dropimg4: "../../assets/images/helmogargula.webp",    
        dropimg5: "../../assets/images/humanidadeg.webp",    
        dropimg6: "../../assets/images/ossoregreso.png",
        dropdesc: "Gargoyle Tail Axe",
        dropdesc2: "Gargoyle's Halberd",
        dropdesc3: "Gargoyle's Shield",
        dropdesc4: "Gargoyle Helm",
        dropdesc5: "Twin Humanities",
        dropdesc6: "Homeward Bone",
        dropchance: "Cortando o rabo da gárgula",
        dropchance2: "3% (Garantido na última gárgula de Anor Londo)",
        dropchance3: "3% (Garantido na última gárgula de Anor Londo)",
        dropchance4: "3% (Garantido na última gárgula de Anor Londo)",
        dropchance5: "Garantido",
        dropchance6: "Garantido",
        fraquezas: "Fogo <br> Raio(As de Anor Londo)",
        resistencia: "Dano Físico <br> Mágia"

    }


};

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

    if (boss.titulo1 || boss.titulo2 || boss.titulo3 || boss.titulo4) {
        conteudoHtml += `
            <h2 style="font-family: var(--font1); color: var(--firstcolor);">História e Lore:</h2>
            <ol style="padding-left: 20px; margin-top: 10px; list-style: none;">
        `;

        if (boss.titulo1) {
            conteudoHtml += `
                <li>
                    <strong style=" text-decoration: underline; color: var(--firstcolor);">${boss.titulo1}</strong>
                    <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia1 ?? ""}</p>
                </li>
            `;
        }

        if (boss.titulo2) {
            conteudoHtml += `
                <li>
                    <strong style=" text-decoration: underline; color: var(--firstcolor);">${boss.titulo2}</strong>
                    <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia2 ?? ""}</p>
                </li>
            `;
        }

        if (boss.titulo3) {
            conteudoHtml += `
                <li>
                    <strong style=" text-decoration: underline; color: var(--firstcolor);">${boss.titulo3}</strong>
                    <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia3 ?? ""}</p>
                </li>
            `;
        }

        if (boss.titulo4) {
            conteudoHtml += `
                <li>
                    <strong style=" text-decoration: underline; color: var(--firstcolor);">${boss.titulo4}</strong>
                    <p style="margin-top: 5px; margin-bottom: 10px;">${boss.historia4 ?? ""}</p>
                </li>
            `;
        }

        conteudoHtml += `</ol>`;

    }

   if (boss.dropimg || boss.dropdesc || boss.dropchance) {
        conteudoHtml += `
            <hr>
            <h2 style="font-family: var(--font1); color: var(--firstcolor); margin-top: 20px;">Drop</h2>            
        `;

        if (boss.dropimg && boss.dropdesc && boss.dropchance) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${boss.dropdesc}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }

        if (boss.dropimg2 && boss.dropdesc2 && boss.dropchance2) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg2}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                <p style="margin: 0; font-size: 1em;">${boss.dropdesc2}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance2}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }

        if(boss.dropimg3 && boss.dropdesc3 && boss.dropchance3) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg3}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${boss.dropdesc3}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance3}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }

        if(boss.dropimg4 && boss.dropdesc4 && boss.dropchance4) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg4}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${boss.dropdesc4}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance4}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }

        if(boss.dropimg5 && boss.dropdesc5 && boss.dropchance5) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg5}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${boss.dropdesc5}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance5}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }

        if(boss.dropimg6 && boss.dropdesc6 && boss.dropchance6) {
            conteudoHtml += `
                <table style="width: 100%; border-collapse: separate; border-spacing: 20px 10px; margin: 15px 0; background-color: #1e1e1e; border: 2px solid var(--firstcolor); border-radius: 10px; padding: 10px;">
                    <tr>
                        <td style="width: 70%; padding: 10px; vertical-align: middle;">
                            <div style="display: flex; align-items: center; gap: 20px;">
                                <div style="width: 80px; height: 80px; display: flex; justify-content: center; align-items: center;">
                                    <img src="${boss.dropimg6}" alt="Drop do ${boss.nome}" style="max-width: 100%; max-height: 100%; border-radius: 6px; box-shadow: 0 0 10px rgba(0,0,0,0.5);">
                                </div>
                                    <p style="margin: 0; font-size: 1em;">${boss.dropdesc6}</p>
                            </div>
                        </td>
                        <td style="text-align: center; vertical-align: middle; padding: 10px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: var(--firstcolor); font-family: var(--font1);">Chance</h4>
                                <p style="margin: 0; font-size: 1.1em;"><strong>${boss.dropchance6}</strong></p>
                            </div>
                        </td>
                    </tr>
                </table>
            `;
        }
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
