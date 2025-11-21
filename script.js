const messages = [
    "Seni görmek günümün temposunu bir anda değiştiriyor. 🙂✨",
    "Sabah seni görebilme ihtimali bile güzel hissettiriyor. ☀️",
    "Konuşmalarımız rahatlatıyor, iyi geliyor. 🌿",
    "Her karşılaşmada içimde hafif bir heyecan oluyor, hoşuma gidiyor. 💫",
    "Sende sakin ve güzel bir enerji var. 🌼",
    "Seni tanımaya devam etmek güzel olacak gibi. 🙂🌟",
    "Kısacık bir selam bile modumu toparlıyor. ☺️",
    "Sohbetin doğal, bu da insanı rahat hissettiriyor. 🌸",
    "Sana denk gelmek günün güzel anlarından biri oluyor. 🎈"
];


    let currentIndex = 0;

    function showMessage() {
        const msg = document.getElementById("message");
        const counter = document.getElementById("counter");

        msg.classList.remove("visible");

        setTimeout(() => {
            msg.innerHTML = messages[currentIndex];
            msg.classList.add("visible");

            let remaining = messages.length - currentIndex - 1;
            counter.innerHTML = remaining > 0 ?
                `Daha ${remaining} mesaj kaldı 💖` :
                "Tüm mesajları gördün!";

            currentIndex = (currentIndex + 1) % messages.length;
        }, 300);
    }

    /* ------------------------------------- */
    /*   11.11.2025 → BUGÜNE GÜN HESAPLAMA   */
    /* ------------------------------------- */

    function showDateBox() {
        const box = document.getElementById("dateBox");
        box.style.display = "block";

        const start = new Date("2025-11-11");
        const now = new Date();

        const diffTime = now - start;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        box.innerHTML = `
    💞 Tanıştığımız gün: <b>11 Kasım 2025</b><br><br>
    Hikâyemizin başladığı o günden bugüne<br>
    <span style="font-size:1.6em; color:#fff;">${diffDays} gün</span><br>
    geçmiş 💖
`;

    }
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

            // Daha yavaş animasyon için süre aralığı artırıldı
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 13 + 13) + 's'; 
            // 5 ile 10 saniye arasında

            floatingHearts.appendChild(heart);

            // Kalp yok olma süresi uzatıldı
            setTimeout(() => {
                heart.remove();
            }, 10000); // 10 saniye sonra kaldır
        }, i * 300); // Kalpler arası çıkma hızı da biraz yavaşlatıldı
    }
}

window.addEventListener('DOMContentLoaded', () => {
    createHearts();
    setInterval(createHearts, 5000); // yeni kalp grubu daha seyrek gelsin
});

