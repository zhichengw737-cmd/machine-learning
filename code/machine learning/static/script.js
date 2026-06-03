// Game Configuration and State
const GRID_SIZE = 6;
let currentMaze = 1;
let trainingTimes = 0;
let isMoving = false;

// Fixed Grid Layouts (0 = Empty, 1 = Wall, 2 = Start, 3 = Goal)
const maze1Layout = [
    [2, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0, 3]
];

const maze2Layout = [
    [2, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 0],
    [3, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0],
    [1, 1, 1, 0, 0, 0]
];

// Optimal paths (directions) for visual arrows as training progresses
// Represented as arrows pointing towards the goal
const maze1Arrows = {
    "0,1": "→", "1,1": "↓", "2,1": "↓", "2,2": "→", "2,3": "↓", 
    "3,3": "↓", "4,3": "↓", "5,3": "→", "5,4": "→"
};

const maze2Arrows = {
    "0,1": "→", "0,2": "→", "0,3": "↓", "1,3": "↓", "2,3": "←",
    "2,2": "←", "2,1": "←"
};

// DOM Elements
const gridElement = document.getElementById('grid');
const actionBtn = document.getElementById('action-btn');
const resetBtn = document.getElementById('reset-btn');
const maze1Btn = document.getElementById('maze1-btn');
const maze2Btn = document.getElementById('maze2-btn');
const trainingCountEl = document.getElementById('training-count');
const narrativeTextEl = document.getElementById('narrative-text');

// Initialize the Game
function initGrid() {
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 50px)`;
    
    const layout = currentMaze === 1 ? maze1Layout : maze2Layout;

    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;

            if (layout[r][c] === 1) cell.classList.add('wall');
            if (layout[r][c] === 2) {
                cell.classList.add('start');
                // Spawn Ball
                const ball = document.createElement('div');
                ball.id = 'ball';
                ball.classList.add('ball');
                cell.appendChild(ball);
            }
            if (layout[r][c] === 3) cell.classList.add('goal');

            // Render partial hints or full arrows based on Maze & Training status
            if (currentMaze === 1) {
                const key = `${r},${c}`;
                if (maze1Arrows[key]) {
                    if (trainingTimes === 2 || trainingTimes === 3) {
                        // Hint at arrows vaguely
                        if ((r + c) % 2 === 0) cell.innerHTML = `<span class="arrow-hint">${maze1Arrows[key]}</span>`;
                    } else if (trainingTimes >= 4) {
                        // Show clear guiding arrows
                        cell.innerHTML = `<span class="arrow-fixed">${maze1Arrows[key]}</span>`;
                    }
                }
            } else if (currentMaze === 2) {
                // Maze 2 always shows arrows because it already "knows"
                const key = `${r},${c}`;
                if (maze2Arrows[key]) {
                    cell.innerHTML = `<span class="arrow-fixed">${maze2Arrows[key]}</span>`;
                }
            }

            gridElement.appendChild(cell);
        }
    }
}

// Move Ball function with simulation paths
function runSimulation() {
    if (isMoving) return;
    isMoving = true;
    actionBtn.disabled = true;

    let path = [];
    
    if (currentMaze === 1) {
        trainingTimes++;
        trainingCountEl.textContent = `${trainingTimes} / 5`;

        // Define hardcoded paths to simulate learning milestones
        if (trainingTimes === 1) {
            path = [[0,0], [1,0], [2,0], [2,1], [1,1], [0,1]]; // Stays lost, random walking
        } else if (trainingTimes === 2) {
            path = [[0,0], [1,0], [2,0], [2,1], [2,2], [1,2]]; // Hits a wall and stops
        } else if (trainingTimes === 3) {
            path = [[0,0], [0,1], [1,1], [2,1], [2,2], [2,3], [1,3]]; // Gets closer, still fails
        } else if (trainingTimes === 4) {
            path = [[0,0], [0,1], [1,1], [2,1], [2,2], [2,3], [3,3], [4,3]]; // Almost there
        } else if (trainingTimes === 5) {
            path = [[0,0], [0,1], [1,1], [2,1], [2,2], [2,3], [3,3], [4,3], [5,3], [5,4], [5,5]]; // Success!
        }
    } else {
        // Maze 2 path: smooth run straight to the finish
        path = [[0,0], [0,1], [0,2], [0,3], [1,3], [2,3], [2,2], [2,1], [2,0]];
    }

    animatePath(path, 0);
}

// Animate ball moving through cells sequentially
function animatePath(path, index) {
    if (index >= path.length) {
        isMoving = false;
        handleTrainingOutcome();
        return;
    }

    const [r, c] = path[index];
    const targetCell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
    const ball = document.getElementById('ball');
    
    if (targetCell && ball) {
        targetCell.appendChild(ball);
    }

    setTimeout(() => {
        animatePath(path, index + 1);
    }, 400); // Speed of ball movement
}

// Update dialogue results based on training level
function handleTrainingOutcome() {
    if (currentMaze === 1) {
        if (trainingTimes === 1) {
            narrativeTextEl.textContent = "❌ Result: Doesn't know how to get to the endpoint.";
            actionBtn.textContent = "Train & Run (Step 2)";
        } else if (trainingTimes === 2) {
            narrativeTextEl.textContent = "❓ Result: Seems like there are some arrows for guidance...";
            actionBtn.textContent = "Train & Run (Step 3)";
        } else if (trainingTimes === 3) {
            narrativeTextEl.textContent = "🔍 Result: The paths are starting to make sense to the ball.";
            actionBtn.textContent = "Train & Run (Step 4)";
        } else if (trainingTimes === 4) {
            narrativeTextEl.textContent = "💡 Result: The ball almost understands the system fully.";
            actionBtn.textContent = "Train & Run (Final Step)";
        } else if (trainingTimes === 5) {
            narrativeTextEl.textContent = "🏆 Result: Success! The ball fully knows the arrows' meaning and completed the maze!";
            actionBtn.style.display = 'none';
            maze2Btn.disabled = false; // Unlock Maze 2
            maze2Btn.classList.add('unlocked-flash');
        }
        initGrid(); // Refresh grid to reveal progressive arrows
    } else {
        narrativeTextEl.textContent = "🚀 Flawless victory! The ball used its existing knowledge of arrows to clear Maze 2 instantly!";
    }
    actionBtn.disabled = isMoving;
}

// Switch to Maze 1
maze1Btn.addEventListener('click', () => {
    currentMaze = 1;
    maze1Btn.classList.add('active');
    maze2Btn.classList.remove('active');
    if (trainingTimes < 5) {
        actionBtn.style.display = 'inline-block';
        actionBtn.textContent = `Train & Run (Step ${trainingTimes + 1})`;
    }
    initGrid();
});

// Switch to Maze 2
maze2Btn.addEventListener('click', () => {
    currentMaze = 2;
    maze1Btn.classList.remove('active');
    maze2Btn.classList.add('active');
    maze2Btn.classList.remove('unlocked-flash');
    
    // Setup dashboard for Maze 2 rules
    actionBtn.style.display = 'inline-block';
    actionBtn.textContent = "Run Maze 2";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "The ball already knows the meaning of arrows! No extra training needed here.";
    initGrid();
});

// Trigger Single Step Training Simulation
actionBtn.addEventListener('click', runSimulation);

// Reset Complete Simulation back to Square One
resetBtn.addEventListener('click', () => {
    currentMaze = 1;
    trainingTimes = 0;
    isMoving = false;
    
    trainingCountEl.textContent = "0 / 5";
    actionBtn.style.display = 'inline-block';
    actionBtn.textContent = "Train & Run (Step 1)";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "Simulation Reset. The ball forgot everything! Click Train to start again.";
    
    maze1Btn.classList.add('active');
    maze2Btn.classList.remove('active');
    maze2Btn.disabled = true;

    initGrid();
});

// Initial Load
initGrid();