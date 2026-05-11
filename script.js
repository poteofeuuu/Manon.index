// --- NAVIGATION ---
function showGame(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Reset et Initialisation
    if(id === 'game-memory') initMemory();
    if(id === 'game-catch') initCatch();
}

function showMenu() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('menu').classList.add('active');
    clearInterval(catchInterval); // Arrête le jeu de catch si on quitte
}

// --- JEU 1: MEMORY ---
const emojis = ['🍕','🍦','🎬','✈️','🚲','🎸','✨','🌊'];
let cards = [...emojis, ...emojis];
let flipped = [];

function initMemory() {
    const board = document.getElementById('memory-board');
    const msg = document.getElementById('memory-msg');
    board.innerHTML = '';
    msg.innerText = '';
    cards.sort(() => Math.random() - 0.5);
    
    cards.forEach((emoji, i) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.val = emoji;
        card.innerText = emoji;
        
        card.onclick = () => {
            if (flipped.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                flipped.push(card);
                
                if (flipped.length === 2) {
                    if (flipped[0].dataset.val === flipped[1].dataset.val) {
                        flipped = [];
                        if (document.querySelectorAll('.flipped').length === 16) {
                            msg.innerText = "Bravo Manon ! Tu as de la mémoire ! ❤️";
                        }
                    } else {
                        setTimeout(() => {
                            flipped.forEach(c => c.classList.remove('flipped'));
                            flipped = [];
                        }, 700);
                    }
                }
            }
        };
        board.appendChild(card);
    });
}

// --- JEU 2: CATCH THE STRESS ---
let score = 0;
let catchInterval;

function initCatch() {
    score = 0;
    document.getElementById('score').innerText = score;
    const area = document.getElementById('catch-area');
    area.innerHTML = '';
    const stressItems = ['📚', '✍️', '⏰', '📉', '😫', '🧠'];
    
    clearInterval(catchInterval);
    catchInterval = setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('target');
        item.innerText = stressItems[Math.floor(Math.random() * stressItems.length)];
        
        const maxX = area.clientWidth - 40;
        const maxY = area.clientHeight - 40;
        item.style.left = Math.random() * maxX + 'px';
        item.style.top = Math.random() * maxY + 'px';
        
        item.onclick = () => {
            score++;
            document.getElementById('score').innerText = score;
            item.style.transform = "scale(0)";
            setTimeout(() => item.remove(), 100);
            
            if(score === 15) {
                alert("Stress évacué ! T'es prête pour la suite 🚀");
                showMenu();
            }
        };
        
        area.appendChild(item);
        // L'item disparaît tout seul après 1.5s s'il n'est pas cliqué
        setTimeout(() => { if(item.parentNode) item.remove(); }, 1500);
    }, 700);
}

// --- JEU 3: MACHINE A KDO (SLOTS) ---
const gifts = ['🍫', '☕', '💆‍♀️', '🍦', '🎁', '🍿', '🌹'];

function spin() {
    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const s3 = document.getElementById('s3');
    const res = document.getElementById('slot-result');
    res.innerText = "Suspense...";
    
    let iterations = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
        s1.innerText = gifts[Math.floor(Math.random() * gifts.length)];
        s2.innerText = gifts[Math.floor(Math.random() * gifts.length)];
        s3.innerText = gifts[Math.floor(Math.random() * gifts.length)];
        iterations++;
        
        if(iterations >= maxIterations) {
            clearInterval(interval);
            checkWin(s1.innerText, s2.innerText, s3.innerText);
        }
    }, 100);
}

function checkWin(v1, v2, v3) {
    const res = document.getElementById('slot-result');
    if(v1 === v2 && v2 === v3) {
        res.innerText = "JACKPOT ! Tu as gagné un moment détente 🏆";
    } else if (v1 === v2 || v2 === v3 || v1 === v3) {
        res.innerText = "Pas mal ! Presque un combo ! 😉";
    } else {
        res.innerText = "Retente ta chance pour le cadeau ! ✨";
    }
}
