const menuBtn = document.querySelector('.menu-button');
const sideBar = document.getElementById('sideBar')
const overlay = document.getElementById('overlay')
const fecharSideBar = document.getElementById('fecharSideBar');
const btnLogin = document.getElementById('btnLogin');
const btnCadastro = document.getElementById('btnCadastro');
const sideBarTitle = sideBar.querySelector('nav h1');
const menuItems = sideBar.querySelectorAll('nav ul li');
const sideBarButtons = sideBar.querySelector('.sideBar-btns');

gsap.set(sideBar, {x: "-100%"});
gsap.set(overlay, {autoAlpha: 0});
gsap.set([sideBarTitle, menuItems, sideBarButtons], { autoAlpha: 0, x: -30 });

const sideBarTimeline = gsap.timeline({paused: true});

sideBarTimeline
    .to(overlay, {autoAlpha: 1, duration: 0.5, ease: "power3.inOut"})
    .to(sideBar, {x: 0, duration: 0.8, ease: "back.out(1.4)"}, "<")
    .to(sideBarTitle, {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
    }, "-=0.6")
    .to(menuItems, {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.1
    }, "-=0.4")
    .to(sideBarButtons, {
        autoAlpha: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
    }, "<");

function fechaSideBar() {
    sideBarTimeline.reverse();
    setTimeout(() => {
       overlay.classList.add("hidden");
    }, sideBarTimeline.duration() * 1000); 
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

if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        fechaSideBar();
        abrirLogin();
    });
}

btnCadastro.addEventListener("click", () => {
    fechaSideBar();
    abrirCadastro();
});

