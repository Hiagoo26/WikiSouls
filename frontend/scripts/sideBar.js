const menuBtn = document.querySelector('.menu-button');
const sideBar = document.getElementById('sideBar')
const overlay = document.getElementById('overlay')
const fecharSideBar = document.getElementById('fecharSideBar');
const btnLogin = document.getElementById('btnLogin');
const btnCadastro = document.getElementById('btnCadastro');

gsap.set(sideBar, {x: "-100%"});
gsap.set(overlay, {autoAlpha: 0});

const sideBarTimeline = gsap.timeline({paused: true});
sideBarTimeline
    .to(overlay, {autoAlpha: 1, duration: 0.5, ease: "power3.inOut"})
    .to(sideBar, {x: 0, duration: 0.5, ease: "power3.out"}, "<")

function fechaSideBar() {
    sideBarTimeline.reverse();
    overlay.classList.add("hidden");
}

function abrirSideBar() {
    sideBarTimeline.play();
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


//Arrumar a animação quando fecha