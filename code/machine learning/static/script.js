// Configuration & State - Expanded to an 8x8 Grid for more complexity
const GRID_SIZE = 8;
let currentMaze = 1;
let trainingTimes = 0;
let isMoving = false;

//Reward points variable to track the ball's progress.
let rewardPoints = 0;

// Fixed Complex Structural Mazes (0: Open Path, 1: Wall/Barrier, 2: Start, 3: Goal)
const maze1Layout = [
    [2, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 0, 3]
];

const maze2Layout = [
    [2, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 3]
];

// Persistent Guiding Arrows placed ON THE BARRIERS (Wall positions '1') adjacent to the path
const maze1Arrows = {
    "0,1": "↓", "1,1": "→", "1,2": "→", "1,3": "→", "1,4": "→", 
    "1,5": "↓", "2,5": "↓", "3,5": "→","3,6": "↓","4,6": "↓" ,
    "5,6": "↓", "6,6": "↓","6,4":"↓","5,4":"↓","5,3":"→","4,3":"↓",
    "3,3":"↓","3,2":"→","3,1":"→","4,1":"","7,4": "→","7,5": "→" ,"7,6": "→"
};

const maze2Arrows = {
    "0,1": "→", "0,2": "→","0,3": "↓" ,"1,3": "↓", "2,3": "→", "2,4": "→",
    "2,5": "→", "2,6": "↓", "3,6": "↓","4,6": "←","4,5": "←","4,4": "←",
    "4,3": "↓","5,3": "↓", "6,3": "↓", "7,3": "→","7,4": "→","7,5": "→","7,6": "→"
};

// AI Opinion Dictionary Data Matrix
const opinionStages = {
    0: { up: "Unrecognized pattern", right: "Unrecognized pattern", down: "Unrecognized pattern", left: "Unrecognized pattern" },
    1: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    2: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    3: { up: "Could mean: Steer clear upwards?", right: "Slightly correlates with right turn near walls", down: "Might mean: Follow barrier downwards?", left: "Seems to imply leftward opening" },
    4: { up: "High Probability: Navigate Up", right: "Strong correlation with corridor turning Right", down: "High Probability: Navigate Down", left: "Strong correlation with corridor turning Left" },
    5: { up: "Confirmed: Move UP ⬆️", right: "Confirmed: Move RIGHT ➡️", down: "Confirmed: Move DOWN ⬇️", left: "Confirmed: Move LEFT ⬅️" }
};

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
}

function updateOpinionTable() {
    const stage = currentMaze === 2 ? 5 : trainingTimes;
    opUp.textContent = opinionStages[stage].up;
    opRight.textContent = opinionStages[stage].right;
    opDown.textContent = opinionStages[stage].down;
    opLeft.textContent = opinionStages[stage].left;
    
    document.querySelectorAll('.opinion-text').forEach(el => {
        if (stage > 0) {
            el.classList.add('highlight-update');
            setTimeout(() => el.classList.remove('highlight-update'), 600);
        }
    });
}

function runSimulation() {
    if (isMoving) return;
    isMoving = true;
    actionBtn.disabled = true;

    // Reset reward points on new run
    rewardPoints = 0;
    const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    let path = [];

    if (currentMaze === 1) {
        trainingTimes++;
        trainingCountEl.textContent = `${trainingTimes} / 5`;

        if (trainingTimes === 1) {
            // Randomly wandering near the top left corner for exactly 10 steps
            path = [[0,0], [0,1], [1,1], [1,2], [1,1], [0,1], [0,0], [0,1], [1,1], [1,2]];
        } else if (trainingTimes === 2) {
            // Another sequence exploring the initial corridor for 10 steps
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,3], [1,2], [1,1], [0,1]];
        } else if (trainingTimes === 3) {
            // Makes it past the first deep corner, but takes a dead end path turn
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [3,5], [3,6], [4,6], [5,6], [6,6], [7,6], [7,5], [7,4], [6,4], [5,4], [5,3], [4,3], [3,3]];
        } else if (trainingTimes === 4) {
            // Follows correctly far down the corridor loop, stalling right near the lower exit
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [3,5], [3,6], [4,6], [5,6], [6,6]];
        } else if (trainingTimes === 5) {
            // Decodes the layout perfectly, tracing wall direction indicators directly to goal
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [3,5], [3,6], [4,6], [5,6], [6,6], [7,6], [7,5], [7,4], [7,7]];
        }
    } else {
        // Maze 2 Advanced Path mapping around barriers smoothly
        path = [[0,0], [0,1], [0,2], [0,3], [1,3], [2,3], [2,2], [2,1], [3,1], [4,1], [5,1], [6,1], [6,2], [6,3], [5,3], [4,3], [4,4], [4,5], [4,6], [3,6], [2,6], [2,5], [2,4], [1,4], [1,5], [1,6], [1,7], [7,7]];
        
        // Accurate simplified path through structure definitions
        path = [[0,0], [0,1], [0,2], [0,3], [1,3], [2,3], [2,4], [2,5], [2,6], [3,6], [4,6], [4,5], [4,4], [4,3], [5,3], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
    }

    animateBallPath(path, 0);
}

function animateBallPath(path, index) {
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

    // Evaluate Reward Points
    if (index > 0) {
        const [prevR, prevC] = path[index - 1];
        const arrows = currentMaze === 1 ? maze1Arrows : maze2Arrows;
        const arrow = arrows[`${prevR},${prevC}`];

        if (arrow) {
            let followedCorrectly = false;
            if (arrow === "↑" && r === prevR - 1 && c === prevC) followedCorrectly = true;
            if (arrow === "→" && r === prevR && c === prevC + 1) followedCorrectly = true;
            if (arrow === "↓" && r === prevR + 1 && c === prevC) followedCorrectly = true;
            if (arrow === "←" && r === prevR && c === prevC - 1) followedCorrectly = true;

            if (followedCorrectly) {
                rewardPoints += 10;
            } else {
                rewardPoints -= 10;
            }

            const rewardValEl = document.getElementById('reward-value');
            if (rewardValEl) {
                rewardValEl.textContent = rewardPoints;
                rewardValEl.style.color = rewardPoints >= 0 ? "#10b981" : "#ef4444";
            }
        }
    }

    setTimeout(() => {
        animateBallPath(path, index + 1);
    }, 300); // Accelerated tick cycle slightly for comfortable viewing over 8 units
}

function handleTrainingOutcome() {
    updateOpinionTable();

    if (currentMaze === 1) {
        if (trainingTimes === 1) {
            narrativeTextEl.textContent = "❌ Result: Doesn't know how to get to the endpoint.";
            actionBtn.textContent = "Train & Run (Step 2)";
        } else if (trainingTimes === 2) {
            narrativeTextEl.textContent = "❓ Result: Seems like there are some arrows for guidance.";
            actionBtn.textContent = "Train & Run (Step 3)";
        } else if (trainingTimes === 3) {
            narrativeTextEl.textContent = "🔍 Result: The ball is beginning to observe correlations between arrows and walls. I have gotten 100 points but now I only have " + rewardPoints + " points. I must go to the wrong way.";
            actionBtn.textContent = "Train & Run (Step 4)";
        } else if (trainingTimes === 4) {
            narrativeTextEl.textContent = "💡 Result: The ball is starting to grasp arrow orientations relative to paths.";
            actionBtn.textContent = "Train & Run (Final Step)";
        } else if (trainingTimes === 5) {
            narrativeTextEl.textContent = "🏆 Result: Knowing the arrows' meaning! It unlocked the map key and reached the endpoint!";
            actionBtn.style.display = 'none';
            maze2Btn.disabled = false;
            maze2Btn.classList.add('unlocked-glow');
        }
    } else {
        narrativeTextEl.textContent = "🚀 Flawless! Because the ball already knows the meaning of arrows, it clears Maze 2 smoothly on its first attempt!";
    }
    actionBtn.disabled = isMoving;
}

// Navigation Actions
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

maze2Btn.addEventListener('click', () => {
    currentMaze = 2;
    maze1Btn.classList.remove('active');
    maze2Btn.classList.add('active');
    maze2Btn.classList.remove('unlocked-glow');
    
    actionBtn.style.display = 'inline-block';
    actionBtn.textContent = "Run Maze 2";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "The ball already knows the meaning of arrows. No training required!";
    initGrid();
});

actionBtn.addEventListener('click', runSimulation);

resetBtn.addEventListener('click', () => {
    currentMaze = 1;
    trainingTimes = 0;
    isMoving = false;
    
    trainingCountEl.textContent = "0 / 5";
    actionBtn.style.display = 'inline-block';
    actionBtn.textContent = "Train & Run (Step 1)";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "The ball forgot everything! The whole simulation has been reset.";
    
    maze1Btn.classList.add('active');
    maze2Btn.classList.remove('active');
    maze2Btn.disabled = true;

    initGrid();
});

// App Start
initGrid();
