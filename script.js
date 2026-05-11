const memories = [
    { text: "Ton sourire", img: "😊" },
    { text: "Marrakech", img: "🇲🇦" },
    { text: "Nos rires", img: "😂" }
];

const punchlines = [
    "T'es la plus forte Manon",
    "Fier de ce que tu es",
    "Bientôt fini ces exams !",
    "La plus belle, c'est toi",
    "Respire, je suis là",
    "Écrase ce stress !"
];

let attempts = 0;

function showGame(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Auto-hide rules
    const rules = document.querySelector(`#${id} .rules-popup`);
    if(rules) {
        setTimeout(() => rules.style.display = 'none', 5000);
    }

    if(id === 'game-memory') startMemory();
}

function startMemory() {
    const grid = document.querySelector('.memory-grid');
    grid.innerHTML = '';
    let cards = ['❤️', '✨', '🔥', '❤️', '✨', '🔥'].sort(() => Math.random() - 0.5);
    cards.forEach(emoji => {
        const div = document.createElement('div');
        div.className = 'memory-card';
        div.dataset.val = emoji;
        div.onclick = () => {
            div.innerText = emoji;
            div.classList.add('flipped');
            checkMemory();
        };
        grid.appendChild(div);
    });
}

function checkMemory() {
    const flipped = document.querySelectorAll('.flipped:not(.matched)');
    if(flipped.length === 2) {
        if(flipped[0].dataset.val === flipped[1].dataset.val) {
            flipped.forEach(c => c.classList.add('matched'));
            if(document.querySelectorAll('.matched').length === 6) {
                alert("Bravo ! T'as une mémoire de dingue (surtout pour nous) ❤️");
            }
        } else {
            setTimeout(() => flipped.forEach(c => { c.classList.remove('flipped'); c.innerText = ''; }), 500);
        }
    }
}

// Jeu Stress : Messages à chaque clic
document.getElementById('game-catch').onclick = (e) => {
    const notif = document.createElement('div');
    notif.className = 'notif';
    notif.style.left = e.clientX - 50 + 'px';
    notif.style.top = e.clientY - 20 + 'px';
    notif.innerText = punchlines[Math.floor(Math.random() * punchlines.length)];
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 1000);
};

// Machine Truquée (Gagne entre 2 et 4 coups)
function spin() {
    attempts++;
    const slots = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
    const res = document.getElementById('slot-res');
    const items = ['🌸', '🍦', '🎁', '💎'];

    let count = 0;
    const timer = setInterval(() => {
        slots.forEach(s => s.innerText = items[Math.floor(Math.random()*items.length)]);
        count++;
        if(count > 10) {
            clearInterval(timer);
            if(attempts >= 3) { // VICTOIRE FORCÉE
                slots.forEach(s => s.innerText = '🌸');
                res.innerHTML = `
                    <h2 style="color:var(--accent)">GAGNÉ ! 🏆</h2>
                    <p>Bravo Manon ! Tu as gagné un bouquet de Lys blancs et roses pour fêter la fin de tes exams. On va aussi se faire cette sortie glace ! <br><br> 
                    Fais moi un retour par mail pour me dire quand tu es libre. ❤️</p>
                `;
            } else {
                res.innerText = "Pas loin... Retente !";
            }
        }
    }, 100);
}
