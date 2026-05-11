// NAVIGATION
function showGame(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    target.classList.add('active');
    
    const rule = target.querySelector('.overlay');
    if(rule) {
        rule.style.display = 'flex';
        setTimeout(() => { rule.style.display = 'none'; }, 4000);
    }

    if(id === 'game-memory') initMemory();
    if(id === 'game-catch') initCatch();
}

function goHome() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('menu').classList.add('active');
    clearInterval(window.catchInt);
}

// MEMORY
function initMemory() {
    const board = document.getElementById('memory-board');
    const winMsg = document.getElementById('memory-win');
    board.innerHTML = '';
    winMsg.innerHTML = '';
    const items = ['🍕', '🎬', '✈️', '🍕', '🎬', '✈️'].sort(() => Math.random() - 0.5);
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.val = item;
        div.onclick = () => {
            if(document.querySelectorAll('.flipped:not(.matched)').length < 2 && !div.classList.contains('flipped')) {
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
                document.getElementById('memory-win').innerHTML = `
                    <div style="background:rgba(251,113,133,0.2); padding:10px; border-radius:15px; margin-top:10px;">
                        <p><strong>Récompense :</strong></p>
                        <p>On part à <strong>Édimbourg</strong> ? Va voir sur TikTok, tu vas adorer ! 🏴󠁧󠁢󠁳󠁣󠁴󠁿</p>
                    </div>`;
            }
        } else {
            setTimeout(() => flipped.forEach(c => { c.classList.remove('flipped'); c.innerText = ''; }), 600);
        }
    }
}

// CATCH STRESS
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
        setTimeout(() => { if(t) t.remove(); }, 1500);
    }, 700);
}

function spawnText(x, y) {
    const m = document.createElement('div');
    m.className = 'pop-msg';
    m.style.left = x - 50 + 'px';
    m.style.top = y + 'px';
    m.innerText = messages[Math.floor(Math.random()*messages.length)];
    document.body.appendChild(m);
    setTimeout(() => m.remove(), 1200);
}

// MACHINE À SOUS
let tries = 0;
function spin() {
    tries++;
    const slots = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
    const res = document.getElementById('slot-result');
    const items = ['🌸', '🍦', '🎁'];
    
    let spinCount = 0;
    const intv = setInterval(() => {
        slots.forEach(s => s.innerText = items[Math.floor(Math.random()*3)]);
        spinCount++;
        if(spinCount > 12) {
            clearInterval(intv);
            if(tries >= 3) {
                slots.forEach(s => s.innerText = '🌸');
                res.innerHTML = `<h2 style="color:#fb7185">JACKPOT ! 🏆</h2>
                <p>Tu gagnes un bouquet de Lys et une <strong>Soirée Pizza</strong> (même en visio) ! 🍕</p>
                <p style="font-style:italic; font-size:0.7rem;">Pourquoi les plongeurs plongent toujours en arrière ? Car sinon ils tombent dans le bateau.</p>`;
                document.getElementById('spin-btn').style.display = 'none';
            } else {
                res.innerText = "Retente vite !";
            }
        }
    }, 100);
}
