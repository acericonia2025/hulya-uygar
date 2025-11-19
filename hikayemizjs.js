function goTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Uçan kalpler animasyonu
function createHearts() {
    const floatingHearts = document.getElementById('floatingHearts');
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤';

            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 13 + 13) + 's';

            floatingHearts.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 200);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setInterval(createHearts, 3000);
});
