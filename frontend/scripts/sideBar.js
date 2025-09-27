const menuBtn = document.querySelector('.menu-button');
const sideBar = document.getElementById('sideBar')
const overlay = document.getElementById('overlay')
const fecharSideBar = document.getElementById('fecharSideBar');

menuBtn.removeAttribute("disabled");

menuBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    sideBar.classList.add("mostra");
});

fecharSideBar.addEventListener("click", () => {
    overlay.classList.add("hidden");
    sideBar.classList.remove("mostra");
});

overlay.addEventListener("click", (e) => {
    if(e.target === overlay) {
        overlay.classList.add("hidden");
        sideBar.classList.remove("mostra");
    }
})