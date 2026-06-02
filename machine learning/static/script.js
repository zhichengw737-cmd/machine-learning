const episodesInput = document.getElementById('episodes');
const alphaInput = document.getElementById('alpha');
const gammaInput = document.getElementById('gamma');
const epsilonInput = document.getElementById('epsilon');
const simulateButton = document.getElementById('simulateButton');
const summary = document.getElementById('summary');
const canvas = document.getElementById('plotCanvas');
const ctx = canvas.getContext('2d');

function drawGrid(size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cellWidth = canvas.width / size;
    const cellHeight = canvas.height / size;
    ctx.strokeStyle = '#d4dde4';
    ctx.lineWidth = 1;

    for (let i = 0; i <= size; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellWidth, 0);
        ctx.lineTo(i * cellWidth, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * cellHeight);
        ctx.lineTo(canvas.width, i * cellHeight);
        ctx.stroke();
    }
}

function drawPath(path, goal) {
    const size = path.reduce((max, p) => Math.max(max, p.x, p.y), 0) + 1;
    const cellWidth = canvas.width / size;
    const cellHeight = canvas.height / size;

    ctx.fillStyle = '#5a9c8d';
    ctx.fillRect(goal.x * cellWidth, goal.y * cellHeight, cellWidth, cellHeight);

    ctx.strokeStyle = '#e76f51';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i < path.length; i++) {
        const px = path[i].x * cellWidth + cellWidth / 2;
        const py = path[i].y * cellHeight + cellHeight / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#2a6f97';
    for (const [index, point] of path.entries()) {
        const px = point.x * cellWidth + cellWidth / 2;
        const py = point.y * cellHeight + cellHeight / 2;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
        if (index === 0) {
            ctx.fillStyle = '#f4a261';
            ctx.fillText('Start', px - 18, py - 16);
            ctx.fillStyle = '#2a6f97';
        }
    }
}

function updateSummary(data) {
    const rewards = data.reward_history;
    const lastReward = rewards[rewards.length - 1];
    const averageReward = (rewards.reduce((sum, value) => sum + value, 0) / rewards.length).toFixed(2);

    summary.innerHTML = `
        <h3>Training result</h3>
        <p><strong>Episodes:</strong> ${rewards.length}</p>
        <p><strong>Last episode reward:</strong> ${lastReward}</p>
        <p><strong>Average reward:</strong> ${averageReward}</p>
        <p>${data.explanation.agent}</p>
        <p>${data.explanation.reinforce}</p>
        <p>${data.explanation.goal}</p>
    `;
}

async function runSimulation() {
    const payload = {
        episodes: document.getElementById('episodes').value,
        alpha: document.getElementById('alpha').value,
        gamma: document.getElementById('gamma').value,
        epsilon: document.getElementById('epsilon').value
    };

    simulateButton.disabled = true;
    simulateButton.textContent = 'Training...';

    try {
        const response = await fetch('/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        drawGrid(data.grid_size);
        drawPath(data.path, data.goal);
        updateSummary(data);
    } catch (error) {
        summary.innerHTML = '<p>Sorry, something went wrong. Try refreshing the page.</p>';
        console.error(error);
    } finally {
        simulateButton.disabled = false;
        simulateButton.textContent = 'Run Simulation';
    }
}

simulateButton.addEventListener('click', runSimulation);
runSimulation();
