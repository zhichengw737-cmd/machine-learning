// Supervised Learning Configuration

const GRID_SIZE = 8;
let trainingBatch = 0;
let isMoving = false;
let currentStepCount = 0;

// DOM Selectors
const gridElement = document.getElementById('grid');
const actionBtn = document.getElementById('action-btn');
const resetBtn = document.getElementById('reset-btn');
const trainingCountEl = document.getElementById('training-count');
const narrativeTextEl = document.getElementById('narrative-text');
const historyLogEl = document.getElementById('move-history-log');

const opUp = document.getElementById('opinion-up');
const opRight = document.getElementById('opinion-right');
const opDown = document.getElementById('opinion-down');
const opLeft = document.getElementById('opinion-left');

// Standard Maze 1 Layout
const maze1Layout = [
    [2, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 3]
];

// Persistent Guiding Arrows
const maze1Arrows = {
    "0,0": "→", 
    "0,1": "↓", 
    "1,1": "→", "1,2": "→", "1,3": "→", "1,4": "⇨", "1,5": "↓", 
    "2,5": "→", 
    "2,6": "⇓","3,6": "↓", "4,6": "↓", 
    "4,7": "←", 
    "5,6": "←", "5,5": "←",
    "5,4": "↑", "4,4": "⇑", 
    "3,4": "←","3,3": "⇐", "3,2": "←", 
    "3,1": "↓", "4,1": "→",
    "4,2": "↓", "5,2": "↓", "6,2": "→", 
    "6,3": "↓", "7,3": "→", 
    "7,4": "⇨", "7,5": "→", "7,6": "→"
};


// Initialization
function initGrid() {
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 45px)`;
    
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (maze1Layout[r][c] === 1) cell.classList.add('wall');
            if (maze1Layout[r][c] === 2) {
                cell.classList.add('start');
                const ball = document.createElement('div');
                ball.id = 'ball';
                ball.classList.add('ball');
                // Make the supervised ball a different color (Blue) to distinguish from RL (Red)
                ball.style.backgroundColor = '#3b82f6';
                ball.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.4)';
                cell.appendChild(ball);
            }
            if (maze1Layout[r][c] === 3) cell.classList.add('goal');

            const coordKey = `${r},${c}`;
            if (maze1Arrows[coordKey]) {
                const arrowSpan = document.createElement('span');
                arrowSpan.classList.add('guide-arrow');
                arrowSpan.textContent = maze1Arrows[coordKey];
                cell.appendChild(arrowSpan);
            }
            gridElement.appendChild(cell);
        }
    }
    

    //Dynamically get language string
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    historyLogEl.classList.add('history-placeholder');
    //historyLogEl.innerHTML = 'Waiting for teacher\'s labels...';
    historyLogEl.innerHTML = dict ? dict['log_waiting'] : 'Waiting for teacher\'s labels...';
    updateDictionary();
}