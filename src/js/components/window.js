import Lottie from 'lottie-web';

if (window.innerWidth > 500){
    Lottie.loadAnimation({
        container: document.getElementById('nlogo'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lemon.bz/wp-content/themes/lemon/js/data/logo.json'
    })
}

const overlay = document.querySelector('.npopup_overlay');
document.querySelector('.npopup_close').addEventListener('click', () => {
    overlay.classList.remove('is_open');
});

overlay.classList.add('is_open');