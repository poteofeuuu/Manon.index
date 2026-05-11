const motivationMessages = [
    "Tu es incroyable Manon ✨",
    "Fier de toi ❤️",
    "Lâche rien, t'es la meilleure 🌸",
    "Respire, tu gères 🌿",
    "Une vraie championne 🏆",
    "Ton sourire me manque 😊",
    "Tu es si forte 💪"
];

const rewards = [
    { emoji: '🍦', title: "SORTIE GLACE ILLIMITÉE", desc: "On va dévaliser le glacier, rdv avec moi ! Dis moi quand tu es dispo par mail." },
    { emoji: '🌸', title: "BOUQUET DE LYS", desc: "Un magnifique bouquet de Lys roses et blancs pour décorer ton appart' post-exam !" },
    { emoji: '🍿', title: "SOIRÉE CINÉ DÉTENTE", desc: "Le film de ton choix, pop-corn format géant, c'est pour moi !" }
];

let slotAttempts = 0;

function showGame(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(id);
    screen.classList.add('active');
    
    // Affichage des règles
    const rules = screen.querySelector('.rules-overlay');
    if (rules) {
        rules.style.display = 'flex';
        rules.style.opacity = '1';
        setTimeout(() => {
            rules.style.opacity = '0';
            setTimeout(() => rules.style.display = 'none', 500);
        }, 8000); // 8 secondes pour lire
    }

    if(id === 'game-memory') initMemory();
    if(id === 'game-catch') initCatch();
}

function showMenu() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('menu').classList.add('active');
    clearInterval(window.catchInterval);
}

// MEMORY (6 cartes = 3 paires seulement pour que ce soit rapide)
function initMemory() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    const miniEmojis = ['✨', '❤️', '🌸'];
    let cards = [...miniEmojis, ...miniEmojis].sort(() => Math.random() - 0.5);
    
    cards.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.val = emoji;
        card.innerText = emoji;
        card.onclick = () => {
            card.classList.add('flipped');
            const flipped = document.querySelectorAll('.flipped:not(.matched)');
            if(flipped.length === 2) {
                if(flipped[0].dataset.val === flipped[1].dataset.val) {
                    flipped.forEach(c => c.classList.add('matched'));
                } else {
                    setTimeout(() => flipped.forEach(c => c.classList.remove('flipped')), 500);
                }
            }
        };
        board.appendChild(card);
    });
}

// CATCH (Avec messages d'attention)
function initCatch() {
    const area = document.getElementById('catch-area');
    area.innerHTML = '';
    window.catchInterval = setInterval(() => {
        const item = document.createElement('div');
        item.className = 'target';
        item.innerText = '📚';
        item.style.left = Math.random() * 80 + '%';
        item.style.top = Math.random() * 80 + '%';
        
        item.onclick = (e) => {
            spawnMotivation(e.clientX, e.clientY);
            item.remove();
        };
        area.appendChild(item);
        setTimeout(() => item.remove(), 2000);
    }, 1000);
}

function spawnMotivation(x, y) {
    const pop = document.createElement('div');
    pop.className = 'motivation-pop';
    pop.style.left = x + 'px';
    pop.style.top = y + 'px';
    pop.innerText = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
    document.body.appendChild(pop);
    setTimeout(() => pop.remove(), 1000);
}

// SLOTS TRUQUÉS
function spin() {
    slotAttempts++;
    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const s3 = document.getElementById('s3');
    const res = document.getElementById('slot-result');
    
    let count = 0;
    const intv = setInterval(() => {
        s1.innerText = rewards[Math.floor(Math.random()*3)].emoji;
        s2.innerText = rewards[Math.floor(Math.random()*3)].emoji;
        s3.innerText = rewards[Math.floor(Math.random()*3)].emoji;
        count++;
        
        if(count > 15) {
            clearInterval(intv);
            // Gagne obligatoirement au bout de 1 à 5 coups
            if(slotAttempts >= Math.floor(Math.random() * 3) + 1) {
                const win = rewards[Math.floor(Math.random()*2)]; // Soit glace soit Lys
                s1.innerText = s2.innerText = s3.innerText = win.emoji;
                res.innerHTML = `<div style="animation: fadeIn 1s"><strong>${win.title} !</strong><br><small>${win.desc}</small></div>`;
                slotAttempts = -100; // Bloque pour qu'elle ne regagne pas de suite
            } else {
                res.innerText = "Presque ! Retente vite !";
            }
        }
    }, 100);
}
