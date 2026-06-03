// Reinforcement Learning playground script - RL-only with smooth animation (no drag)
const rlCanvas = document.getElementById('rlCanvas');
const ctx = rlCanvas.getContext('2d');

const GRID = 5;
let agent = { x: 0, y: 0 };
let agentPx = 0, agentPy = 0; // pixel position for smooth animation
let animating = false;
let obstacles = new Set();
const goal = { x: GRID - 1, y: GRID - 1 };
let reward = 0;
let qTable = {};
let stopRequested = false;
let runCancel = false;

function cellToPx(x, y) {
    const w = rlCanvas.width / GRID;
    const h = rlCanvas.height / GRID;
    return { px: x * w + w / 2, py: y * h + h / 2 };
}

function pxToCell(px, py) {
    const w = rlCanvas.width / GRID;
    const h = rlCanvas.height / GRID;
    const x = Math.floor(px / w);
    const y = Math.floor(py / h);
    return { x: Math.max(0, Math.min(GRID - 1, x)), y: Math.max(0, Math.min(GRID - 1, y)) };
}

function rlKey(x, y) { return `${x},${y}`; }

function drawGrid() {
    // plain background (no blanket/gradient)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rlCanvas.width, rlCanvas.height);

    const w = rlCanvas.width / GRID;
    const h = rlCanvas.height / GRID;

    // cells
    ctx.strokeStyle = 'rgba(30,50,70,0.08)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= GRID; i++) {
        ctx.beginPath(); ctx.moveTo(i * w, 0); ctx.lineTo(i * w, rlCanvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i * h); ctx.lineTo(rlCanvas.width, i * h); ctx.stroke();
    }

    // obstacles
    for (const k of obstacles) {
        const [ox, oy] = k.split(',').map(Number);
        ctx.fillStyle = '#8a8f98';
        ctx.fillRect(ox * w + 6, oy * h + 6, w - 12, h - 12);
    }

    // goal (rounded rectangle)
    ctx.fillStyle = '#5a9c8d';
    drawRoundedRect(goal.x * w + 8, goal.y * h + 8, w - 16, h - 16, 8);
    ctx.fill();
}

function drawAgent() {
    const r = Math.min(rlCanvas.width, rlCanvas.height) / (GRID * 6);
    // shadow
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.ellipse(agentPx, agentPy + r * 1.4, r * 1.4, r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // ball
    const grad = ctx.createRadialGradient(agentPx - r/2, agentPy - r/2, r/6, agentPx, agentPy, r * 1.6);
    grad.addColorStop(0, '#fff8f0');
    grad.addColorStop(1, '#2a6f97');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(agentPx, agentPy, r, 0, Math.PI * 2);
    ctx.fill();

    // glossy highlight
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.beginPath();
    ctx.ellipse(agentPx - r/2, agentPy - r/2, r/2, r/3, -0.6, 0, Math.PI * 2);
    ctx.fill();
}

function render() {
    ctx.clearRect(0, 0, rlCanvas.width, rlCanvas.height);
    drawGrid();
    drawAgent();
}

function animateTo(px, py, duration = 220) {
    animating = true;
    const startX = agentPx, startY = agentPy;
    const dx = px - startX, dy = py - startY;
    const start = performance.now();
    return new Promise(resolve => {
        function step(now) {
            if (stopRequested || runCancel) { animating = false; resolve(); return; }
            const t = Math.min(1, (now - start) / duration);
            // easeOutCubic
            const e = 1 - Math.pow(1 - t, 3);
            agentPx = startX + dx * e;
            agentPy = startY + dy * e;
            render();
            if (t < 1) requestAnimationFrame(step);
            else { animating = false; resolve(); }
        }
        requestAnimationFrame(step);
    });
}

async function moveAgentToCell(nx, ny) {
    // check obstacle
    if (obstacles.has(rlKey(nx, ny))) return; // can't move into obstacle
    agent.x = nx; agent.y = ny;
    const { px, py } = cellToPx(agent.x, agent.y);
    await animateTo(px, py);
    // update reward
    if (agent.x === goal.x && agent.y === goal.y) reward += 10; else reward -= 1;
    document.getElementById('rl-reward').textContent = reward;
}

// responsive canvas
function resizeCanvasToFit() {
    const wrap = document.querySelector('.rl-canvas-wrap');
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const size = Math.min(rect.width, 520); // cap at 520
    rlCanvas.width = Math.floor(size);
    rlCanvas.height = Math.floor(size);
    // recalc agent pixel pos
    const p = cellToPx(agent.x, agent.y);
    agentPx = p.px; agentPy = p.py;
    render();
}
window.addEventListener('resize', () => resizeCanvasToFit());

// initialize pixel pos
(function init() {
    resizeCanvasToFit();
})();

// click to toggle obstacle (no drag)
rlCanvas.addEventListener('click', (e) => {
    const rect = rlCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const cell = pxToCell(x, y);
    if (cell.x === goal.x && cell.y === goal.y) return;
    if (cell.x === agent.x && cell.y === agent.y) return;
    const k = rlKey(cell.x, cell.y);
    if (obstacles.has(k)) obstacles.delete(k); else obstacles.add(k);
    render();
});

function chooseAction(stateKey, epsilon) {
    if (!qTable[stateKey] || Math.random() < epsilon) {
        return ['up','down','left','right'][Math.floor(Math.random()*4)];
    }
    const actions = qTable[stateKey];
    return Object.keys(actions).reduce((a,b)=> actions[a] >= actions[b] ? a : b);
}

function nextStateFrom(x, y, action) {
    let nx = x, ny = y;
    if (action === 'up') ny = Math.max(0, ny - 1);
    if (action === 'down') ny = Math.min(GRID-1, ny + 1);
    if (action === 'left') nx = Math.max(0, nx - 1);
    if (action === 'right') nx = Math.min(GRID-1, nx + 1);
    if (obstacles.has(rlKey(nx, ny))) return { x, y }; // blocked
    return { x: nx, y: ny };
}

async function rlTrainAsync(episodes, alpha, gamma, epsilon) {
    qTable = {};
    const history = [];
    stopRequested = false;
    for (let e = 0; e < episodes; e++) {
        if (stopRequested) break;
        let state = { x: 0, y: 0 };
        let total = 0;
        let steps = 0;
        while (!(state.x === goal.x && state.y === goal.y) && steps < 200) {
            if (stopRequested) break;
            const key = rlKey(state.x, state.y);
            qTable[key] = qTable[key] || { up:0, down:0, left:0, right:0 };
            const action = chooseAction(key, epsilon);
            const ns = nextStateFrom(state.x, state.y, action);
            const rewardStep = (ns.x === goal.x && ns.y === goal.y) ? 10 : -1;
            total += rewardStep;
            const nextKey = rlKey(ns.x, ns.y);
            qTable[nextKey] = qTable[nextKey] || { up:0, down:0, left:0, right:0 };
            const bestNext = Math.max(...Object.values(qTable[nextKey]));
            qTable[key][action] += alpha * (rewardStep + gamma * bestNext - qTable[key][action]);
            state = ns;
            steps += 1;
        }
        history.push(total);
        // yield to UI every few episodes
        if (e % 10 === 0) await new Promise(r => setTimeout(r, 0));
    }
    return history;
}

// UI buttons - ensure DOM is ready
function attachListeners() {
    const resetBtn = document.getElementById('rl-reset');
    const trainBtn = document.getElementById('rl-train');
    const runBtn = document.getElementById('rl-run');
    const stopBtn = document.getElementById('rl-stop');
    
    console.log('Attaching listeners...', { resetBtn, trainBtn, runBtn, stopBtn });
    
    if (!resetBtn || !trainBtn || !runBtn || !stopBtn) {
        console.error('Some buttons are missing!');
        setTimeout(attachListeners, 100); // retry
        return;
    }
    
    resetBtn.onclick = async (e) => {
        e.preventDefault();
        console.log('Reset clicked');
        stopRequested = true;
        runCancel = true;
        // wait a bit for animation to stop
        await new Promise(r => setTimeout(r, 50));
        agent = { x: 0, y: 0 };
        obstacles = new Set();
        reward = 0;
        document.getElementById('rl-reward').textContent = reward;
        const p = cellToPx(agent.x, agent.y);
        agentPx = p.px;
        agentPy = p.py;
        render();
        stopRequested = false;
        runCancel = false;
    };

    trainBtn.onclick = async (e) => {
        e.preventDefault();
        console.log('Train clicked');
        const episodes = Number(document.getElementById('rl-episodes').value);
        const alpha = Number(document.getElementById('rl-alpha').value);
        const gamma = Number(document.getElementById('rl-gamma').value);
        const epsilon = Number(document.getElementById('rl-epsilon').value);
        stopRequested = false;
        runCancel = true;
        trainBtn.disabled = true;
        runBtn.disabled = true;
        stopBtn.disabled = false;
        const hist = await rlTrainAsync(episodes, alpha, gamma, epsilon);
        document.getElementById('rl-reward').textContent = hist.slice(-1)[0] || 0;
        trainBtn.disabled = false;
        runBtn.disabled = false;
        stopBtn.disabled = true;
        runCancel = false;
        if (stopRequested) alert('Training stopped early.');
        else alert('Training finished. Click "Show Learned Path" to watch the agent.');
    };

    stopBtn.onclick = (e) => {
        e.preventDefault();
        console.log('Stop clicked');
        stopRequested = true;
        runCancel = true;
        stopBtn.disabled = true;
        trainBtn.disabled = false;
        runBtn.disabled = false;
    };

    runBtn.onclick = async (e) => {
        e.preventDefault();
        console.log('Run clicked');
        runCancel = false;
        stopRequested = false;
        trainBtn.disabled = true;
        stopBtn.disabled = false;
        // follow greedy policy
        let sim = { x: 0, y: 0 };
        const path = [ { ...sim } ];
        for (let i=0;i<100;i++){
            if (runCancel) break;
            if (sim.x===goal.x && sim.y===goal.y) break;
            const key = rlKey(sim.x, sim.y);
            const action = qTable[key] ? Object.keys(qTable[key]).reduce((a,b)=> qTable[key][a] >= qTable[key][b] ? a : b) : ['up','down','left','right'][Math.floor(Math.random()*4)];
            const ns = nextStateFrom(sim.x, sim.y, action);
            sim = ns;
            path.push({ ...sim });
        }
        // animate path
        for (const stepCell of path) {
            if (runCancel) break;
            await moveAgentToCell(stepCell.x, stepCell.y);
            await new Promise(r => setTimeout(r, 120));
        }
        trainBtn.disabled = false;
        stopBtn.disabled = true;
    };
    
    console.log('Listeners attached successfully');
}

// Call after short delay to ensure DOM is ready
setTimeout(attachListeners, 10);

// helper: draw rounded rectangle path
function drawRoundedRect(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}
