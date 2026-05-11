// NAVIGATION
function showGame(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Règles auto-disparaissantes
    const rule = document.querySelector(`#${id} .overlay`);
    if(rule) {
        rule.style.display = 'flex';
        setTimeout(() => { rule.style.display = 'none'; }, 5000);
    }

    if(id === 'game-memory') initMemory();
    if(id === 'game-catch') initCatch();
}

function goHome() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('menu').classList.add('active');
    clearInterval(window.catchInt);
}

// MEMORY - 6 cartes (3 paires)
function initMemory() {
    const board = document.getElementById('memory-board');
    board.innerHTML = '';
    const items = ['🍕', '🎬', '✈️', '🍕', '🎬', '✈️'].sort(() => Math.random() - 0.5);
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.val = item;
        div.onclick = () => {
            if(document.querySelectorAll('.flipped:not(.matched)').length < 2) {
                div.classList.add('flipped');
                div.innerText = item;
                checkMatch();
            }
        };
        board.appendChild(div);
    });
}

function checkMatch() {
    const flipped = document.querySelectorAll('.flipped:not(.matched)');
    if(flipped.length === 2) {
        if(flipped[0].dataset.val === flipped[1].dataset.val) {
            flipped.forEach(c => c.classList.add('matched'));
            if(document.querySelectorAll('.matched').length === 6) {
                document.getElementById('memory-win').innerText = "Bravo Manon ! ❤️";
            }
        } else {
            setTimeout(() => flipped.forEach(c => { c.classList.remove('flipped'); c.innerText = ''; }), 600);
        }
    }
}

// CATCH STRESS - Motivation infinie
const messages = ["T'es la meilleure Manon", "Fier de toi ❤️", "Lâche rien ✨", "Presque fini ! 💪", "Tu es si forte", "Souffle un peu 🌸"];

function initCatch() {
    const zone = document.getElementById('catch-zone');
    zone.innerHTML = '';
    window.catchInt = setInterval(() => {
        const t = document.createElement('div');
        t.className = 'target';
        t.innerText = '📚';
        t.style.left = Math.random() * 80 + '%';
        t.style.top = Math.random() * 80 + '%';
        t.onclick = (e) => {
            spawnText(e.clientX, e.clientY);
            t.remove();
        };
        zone.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }, 800);
}

function spawnText(x, y) {
    const m = document.createElement('div');
    m.className = 'pop-msg';
    m.style.left = x + 'px';
    m.style.top = y + 'px';
    m.innerText = messages[Math.floor(Math.random()*messages.length)];
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 1200);
}

// MACHINE À SOUS TRUQUÉE
let tries = 0;
function spin() {
    tries++;
    const slots = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
    const res = document.getElementById('slot-result');
    const rewards = ['🌸', '🍦', '🎁'];
    
    let spinCount = 0;
    const intv = setInterval(() => {
        slots.forEach(s => s.innerText = rewards[Math.floor(Math.random()*3)]);
        spinCount++;
        if(spinCount > 12) {
            clearInterval(intv);
            if(tries >= 3) { // Gagne au 3ème essai obligatoirement
                slots.forEach(s => s.innerText = '🌸');
                res.innerHTML = `<h2 style="color:#fb7185">JACKPOT ! 🏆</h2>
                <p>Tu gagnes un bouquet de Lys roses et blancs et une sortie glace ! ❤️<br>
                Fais moi un retour par mail pour me dire quand tu es prête !</p>`;
                document.getElementById('spin-btn').style.display = 'none';
            } else {
                res.innerText = "Retente vite !";
            }
        }
    }, 100);
}
