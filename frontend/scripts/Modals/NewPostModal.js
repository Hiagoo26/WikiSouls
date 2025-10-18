const modal = document.getElementById('postModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');
const postForm = document.querySelector('.post-form');
const postTextarea = document.getElementById('postText');

// --- FUNÇÃO PARA REDIMENSIONAR O TEXTAREA ---
const autoResizeTextarea = () => {
    postTextarea.style.height = 'auto';
    postTextarea.style.height = `${postTextarea.scrollHeight}px`;
};

// --- ABRIR O MODAL ---
const openModal = () => {
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 10);
};

// --- FECHAR O MODAL ---
const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
        modal.classList.add('hidden');
        postTextarea.value = '';
        autoResizeTextarea();
    }, 300);
};


// --- EVENT LISTENERS ---

postTextarea.addEventListener('input', autoResizeTextarea);

openBtn.addEventListener('click', openModal);

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) {
        closeModal();
    }
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

postForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Post publicado!');
    closeModal();
});