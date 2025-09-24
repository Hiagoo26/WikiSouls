const modal = document.getElementById("videoModal");
const fechar = document.getElementById("fecharVideo");
const frame = document.getElementById("videoFrame");

const fogo = document.getElementById("linkFogo");
const trevas = document.getElementById("linkTrevas");

const linkFogo = "https://www.youtube.com/embed/kPXMR1DioZU?si=R2eqoBPeWYxp3NO0";
const linkTrevas = "https://www.youtube.com/embed/LrywuSxARcY?si=pJ5dHUfqTdA0ii26";

function abrirVideo(src){
    frame.src = src + "&autoplay=1";
    modal.classList.remove("hidden");
}

function fecharVideo() {
    modal.classList.add("hidden");
    frame.src = "";
}

fogo.addEventListener("click", (e) => {
    e.preventDefault();
    abrirVideo(linkFogo);
});

trevas.addEventListener("click", (e) => {
    e.preventDefault();
    abrirVideo(linkTrevas);
});

fechar.addEventListener("click", fecharVideo);

modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharVideo();
});

