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
        nome: "Asylum Demon (Demônio do Asilo)",
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
    },

    caprademon: {
        nome: "Capra Demon (Demônio Cabra)",
        nome2: "Capra Demon",
        img: "../../assets/images/capra.jpg",
        vida: "NG 1,176",
        vidaNG: "NG+ 2,940",
        almas: "NG 6k",
        almasNG: "NG+ 30k",
        desc: "Grande demônio humanoide, o capra demon é um boss opcional q fica na parte de baixo de Undead Burg.",
        loc: "Encontrado como chefe opcional na parte inferior da Undead Burg, após a luta contra o Taurus Demon, por uma porta com escada longa. Mais tarde, versões mais fracas dele — os Lesser Capra Demons — aparecem como inimigos comuns nas ruínas dos demônios (Demon Ruins).",
        titulo1: "Origem",
        historia1: "Demônio originário da Bed of Chaos, criados após a falha da Bruxa de Izalith em forjar uma chama própria.",
        dropimg: "../../assets/images/esgotochave.webp",
        dropimg2: "../../assets/images/humanidade.webp",
        dropimg3: "../../assets/images/ossoregreso.png",
        dropimg4: "../../assets/images/machetecapra.webp",
        dropdesc: "Key to Depths",
        dropdesc2: "Humanity",
        dropdesc3: "Homeward Bone",
        dropdesc4: "Demon Great Machete",
        dropchance: "Garantido (Boss)",
        dropchance2: "Garantido (Boss)",
        dropchance3: "Garantido (Boss)",
        dropchance4: "5%",
        fraquezas: "Fogo <br> Dano físico",
    },

    gapingdragon: {
        nome: "Gaping Dragon (Dragão Boquiaberto)",
        nome2: "Gaping Dragon",
        img: "../../assets/images/gaping.jpg",
        vida: "NG 4,660",
        vidaNG: "NG+ 8,947",
        almas: "NG 25k",
        almasNG: "NG+ 75k",
        desc: "Enfrentado nas Profundezas (Depths), guardando a entrada para Blighttown, a batalha ocorre após descer pelas escadas até a arena subterrânea.",
        loc: "Encontrado como chefe opcional na parte inferior da Undead Burg, após a luta contra o Taurus Demon, por uma porta com escada longa. Mais tarde, versões mais fracas dele — os Lesser Capra Demons — aparecem como inimigos comuns nas ruínas dos demônios (Demon Ruins).",
        titulo1: "Descendente dos Dragões Eternos",
        titulo2: "Corrupção pela Gula",
        titulo3: "Isolamento e Solidão",
        historia1: "Ainda que distante, ele mantém conexão ancestral com os Dragões Eternos, mesmo após sua transformação grotesca.",
        historia2: "Segundo os criadores, sua fome consumiu sua forma; o surgimento da vida e emoção o corromperam, transformando-o em uma boca ambulante.",
        historia3: "É possível que tenha se escondido nas profundezas e sua solidão o levou a essa forma desesperada de sobrevivência diante do fim de sua raça.",
        dropimg: "../../assets/images/chavefavela.png",
        dropimg2: "../../assets/images/humanidade.webp",
        dropimg3: "../../assets/images/ossoregreso.png",
        dropimg4: "../../assets/images/gapingaxe.png",
        dropdesc: "Blighttown Key",
        dropdesc2: "Humanity",
        dropdesc3: "Homeward Bone",
        dropdesc4: "Dragon King Great Axe",
        dropchance: "Garantido",
        dropchance2: "Garantido",
        dropchance3: "Garantido",
        dropchance4: "Ao cortar a cauda",
        fraquezas: " Raio <br> Perfuração, especialmente em ataque direcionados à cabeça",
        resistencia: "Dano físico <br> Magia"
    },
    quelaag: {
        nome: "Chaos Witch Quelaag ( Bruxa do Caos Quelaag )",
        nome2: "Chaos Witch Quelaag",
        img: "../../assets/images/quelaag.jpg",
        vida: "NG 3,139",
        vidaNG: "NG+ 6,027",
        almas: "NG 20k",
        almasNG: "NG+ 60k",
        desc: "Enfrentado nas Profundezas (Depths), guardando a entrada para Blighttown, a batalha ocorre após descer pelas escadas até a arena subterrânea.",
        loc: "Está no Domínio da Quelaag, logo após Blighttown.",
        titulo1: "Filha da Bruxa de Izalith",
        titulo2: "Protetora sacrificada",
        historia1: "Ela, junto com a irmã, falhou ao fugir do fogo caótico que consumiu Izalith, resultando em sua transformação em uma criatura meio mulher, meio aranha.",
        historia2: "Com o corpo mesclado ao de uma aranha demoníaca, ela e sua irmã tomaram refúgio em Blighttown. Quando sua irmã adoeceu ao absorver a corrupção local, Quelaag passou a proteger e alimentar a irmã, usando humanidade coletada de Undead para aliviar seu sofrimento. Para impedir que intrusos alcançassem o sino, erigiu um casulo e dominou o território.",
        dropimg: "../../assets/images/almaboss.webp",
        dropdesc: "Soul of Quelaag",
        dropchance: "Garantido",
        fraquezas: " Poise <br> Crítico",
        resistencia: "Imune a fogo"
    },
    ironGolem: {
        nome: "Iron Golem (Golem de Ferro)",
        nome2: "Iron Golem",
        img: "../../assets/images/iron.jpg",
        vida: "NG 2.880",
        vidaNG: "NG+ 5.270",
        almas: "NG 40k",
        almasNG: "NG+ 120k",
        desc: "Encontrado no topo da Sen’s Fortress, serve de último teste antes de acessar Anor Londo.",
        loc: "No alto da Sen’s Fortress, guardando o caminho para Anor Londo.",
        titulo1: "Guardião Divino",
        titulo2: "Desafio Final da Fortaleza",
        historia1: "Construído pelos deuses como um autômato de ferro, animado por um núcleo feito de osso de dragão eterno fundido com almas.",
        historia2: "Posicionado como último desafio ritualístico após tocar os Sinos da Despertar, impedindo o Undead de chegar ao Lordvessel e prosseguir até Anor Londo.",
        dropimg: "../../assets/images/almaboss.webp",
        dropdesc: "Núcleo de um Golem de Ferro",
        dropchance: "Garantido",
        fraquezas: "Lightning <br> Strike (Golpes contundentes)",
        resistencia: "Fogo <br> Magia <br> Veneno",
      },
      ornsteinSmough: {
        nome: "Dragon Slayer Ornstein & Executioner Smough",
        nome2: "Ornstein & Smough",
        img: "../../assets/images/oAs.jpg",
        vida: "NG Ornstein: 1,772 / Smough: 2,960",
        vidaNG: "NG+ Ornstein: 4,644 / Smough: 7,768",
        almas: "NG 50k",
        almasNG: "NG+ 150k",
        desc: "Encontrados no salão da catedral de Anor Londo, são o desafio final antes de alcançar Gwynevere e prosseguir rumo ao Lordvessel.",
        loc: "No salão principal da catedral em Anor Londo.",
        titulo1: "Ornstein – O Caçador de Dragões",
        titulo2: "Smough – O Carrasco Canibal",
        historia1: "Capitão dos Quatro Cavaleiros de Gwyn, Ornstein é conhecido por caçar e exterminar dragões. Mestre no uso de ataques elétricos, foi designado para proteger Anor Londo ao lado de Smough.",
        historia2: "Carrasco oficial do reino, Smough foi rejeitado como cavaleiro devido aos seus hábitos canibais. Tornou-se parceiro de Ornstein para guardar a princesa Gwynevere e impedir intrusos.",
        dropimg: "../../assets/images/almaboss.webp",
        dropdesc: "Soul of Ornstein / Soul of Smough",
        dropchance: "Dependendo de quem for derrotado por último",
        fraquezas: "Ornstein: Fraco a Fogo / Smough: Fraco a Lightning",
        resistencia: "Ornstein: Resistente a Lightning / Smough: Resistente a Fogo"
    },
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
