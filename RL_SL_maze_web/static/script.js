// Configuration & State - Expanded to an 8x8 Grid for more complexity
const GRID_SIZE = 8;
let currentMaze = 1;
let trainingTimes = 0;

//For testing purposes, set trainingTimes to 5 to skip the training process and jump straight to Maze 2, or adjust it to any number between 0 and 5 to simulate different stages of training progress. Remember that the "Train & Run" button in Maze 1 will still increment the trainingTimes by 1 on each click until it reaches 5, allowing you to see the gradual learning process if you start with a lower number.
//let trainingTimes = 5;

let isMoving = false;

//Reward points variable to track the ball's progress.
let rewardPoints = 0;

// Step counter to display the current step number in the Move & Reward History log.
let currentStepCount = 0;


// DOM Query Selectors
const gridElement = document.getElementById('grid');
const actionBtn = document.getElementById('action-btn');
const resetBtn = document.getElementById('reset-btn');
const maze1Btn = document.getElementById('maze1-btn');
const maze2Btn = document.getElementById('maze2-btn');
const trainingCountEl = document.getElementById('training-count');
const narrativeTextEl = document.getElementById('narrative-text');

const opUp = document.getElementById('opinion-up');
const opRight = document.getElementById('opinion-right');
const opDown = document.getElementById('opinion-down');
const opLeft = document.getElementById('opinion-left');

// Reward points display element
const rewardValEl = document.getElementById('reward-value');

// Move & Reward History log element
const historyLogEl = document.getElementById('move-history-log');

// Fixed Complex Structural Mazes (0: Open Path, 1: Wall/Barrier, 2: Start, 3: Goal)
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

//const maze2Layout = [
//    [2, 0, 0, 0, 1, 1, 1, 1],
//    [1, 1, 1, 0, 1, 1, 1, 1],
//    [1, 0, 0, 0, 0, 0, 0, 1],
//    [1, 0, 1, 1, 1, 1, 0, 1],
//    [1, 0, 1, 0, 0, 0, 0, 1],
//    [1, 0, 1, 0, 1, 1, 1, 1],
//    [1, 0, 0, 0, 1, 1, 1, 1],
//    [1, 1, 1, 0, 0, 0, 0, 3]
//];

const maze2Layout = [
    [2, 1, 0, 0, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 3]
];

// Persistent Guiding Arrows placed on the path
const maze1Arrows = {
    "0,0": "→",
    "0,1": "↓", 
    //"1,1": "→", "1,2": "→", "1,3": "→", "1,4": "→", 
    //"1,5": "↓", 
    //"2,5": "→", 
    //"2,6": "↓",//"3,6": "↓","4,6": "↓" ,
    //"4,7": "←",
    "5,6": "←", 
    //"5,5": "←",
    "5,4":"↑",//"4,4":"↑",
    //"3,4":"←","3,3":"←","3,2":"←",
    //"3,1":"↓",
    //"4,1":"→",
    //"4,2":"↓",
    //"5,2":"↓",
    //"6,2":"→",
    //"6,3":"↓",
    //"7,3": "→",
    //"7,4": "→","7,5": "→" ,"7,6": "→"
};

//const maze2Arrows = {
//    "0,0": "→","0,1": "→", "0,2": "→","0,3": "↓" ,"1,3": "↓", "2,3": "→", "2,4": "→",
//    "2,5": "→", "2,6": "↓", "3,6": "↓","4,6": "←","4,5": "←","4,4": "←",
//    "4,3": "↓","5,3": "↓", "6,3": "↓", "7,3": "→","7,4": "→","7,5": "→","7,6": "→"
//};

const maze2Arrows = {
//     "0,0": "↓",
//     "1,0": "→", 
//     "1,1": "→",
//     "1,2": "↑" ,
//     "0,2": "→", 
//     "0,3": "→", 
//     "0,4": "↓",
//     "1,4": "↓", 
//     "2,4": "→", 
//     "2,5": "→",
//     "2,6": "↑",
//     "1,6": "→",
//     "1,7": "↓",
//     "2,7": "↓","3,7": "↓", 
//     "4,7": "←", 
//     "4,6": "↓",
//     "5,6": "←",
//     "5,5": "←",
//     "5,4": "↑",
//     "4,4": "←",
//     "4,3": "←",
//     "4,2": "↑",
//     "3,2": "←",
//     "3,1": "←",
//     "3,0": "↓",
//     "4,0": "↓",
//     "5,0": "→",
//     "5,1": "↓",
//     "6,1": "→",
//     "6,2": "→",
//     "6,3": "↓",
//     "7,3": "→",
//     "7,4": "→","7,5": "→","7,6": "→"
 };


// Initialize Grid Board Map
function initGrid() {
    gridElement.innerHTML = '';
    // Adapt standard element column repeat patterns to match the 8x8 layout sizes
    gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 45px)`;
    
    const layout = currentMaze === 1 ? maze1Layout : maze2Layout;
    const arrows = currentMaze === 1 ? maze1Arrows : maze2Arrows;

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (layout[r][c] === 1) cell.classList.add('wall');
            if (layout[r][c] === 2) {
                cell.classList.add('start');
                const ball = document.createElement('div');
                ball.id = 'ball';
                ball.classList.add('ball');
                cell.appendChild(ball);
            }
            if (layout[r][c] === 3) cell.classList.add('goal');

            // Render background guidance markers directly onto the barrier spaces
            const coordKey = `${r},${c}`;
            if (arrows[coordKey]) {
                const arrowSpan = document.createElement('span');
                arrowSpan.classList.add('guide-arrow');
                arrowSpan.textContent = arrows[coordKey];
                cell.appendChild(arrowSpan);
            }

            gridElement.appendChild(cell);
        }
    }
    updateOpinionTable();

    //maze2Btn.disabled = true; // Ensure Maze 2 is locked until training is complete

    // Dynamically checks if Maze 2 should be unlocked
    updateMazeUnlockStatus();

    // Reset Move & Reward History log to initial state when initializing the grid to avoid confusion with previous runs
    //historyLogEl.className = 'history-placeholder';
    historyLogEl.classList.add('history-placeholder');
    //historyLogEl.innerHTML = 'Waiting for simulation...';

    //make the history Log can change from Engish to Chinese
    const dict = window.currentLang === 'en' ? lang_en : lang_zh;
    historyLogEl.innerHTML = dict['reward_waiting'];
}


// App Start
initGrid();