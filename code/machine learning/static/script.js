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

// Persistent Guiding Arrows placed ON THE BARRIERS (Wall positions '1') adjacent to the path
const maze1Arrows = {
    "0,0": "→",
    "0,1": "↓", 
    "1,1": "→", "1,2": "→", "1,3": "→", "1,4": "→", 
    "1,5": "↓", 
    "2,5": "→", 
    "2,6": "↓","3,6": "↓","4,6": "↓" ,
    "4,7": "←",
    "5,6": "←", 
    "5,5": "←",
    "5,4":"↑","4,4":"↑",
    "3,4":"←","3,3":"←","3,2":"←",
    "3,1":"↓",
    "4,1":"→",
    "4,2":"↓",
    "5,2":"↓",
    "6,2":"→",
    "6,3":"↓",
    "7,3": "→",
    "7,4": "→","7,5": "→" ,"7,6": "→"
};

//const maze2Arrows = {
//    "0,0": "→","0,1": "→", "0,2": "→","0,3": "↓" ,"1,3": "↓", "2,3": "→", "2,4": "→",
//    "2,5": "→", "2,6": "↓", "3,6": "↓","4,6": "←","4,5": "←","4,4": "←",
//    "4,3": "↓","5,3": "↓", "6,3": "↓", "7,3": "→","7,4": "→","7,5": "→","7,6": "→"
//};

const maze2Arrows = {
    "0,0": "↓",
    "1,0": "→", 
    "1,1": "→",
    "1,2": "↑" ,
    "0,2": "→", 
    "0,3": "→", 
    "0,4": "↓",
    "1,4": "↓", 
    "2,4": "→", 
    "2,5": "→",
    "2,6": "↑",
    "1,6": "→",
    "1,7": "↓",
    "2,7": "↓","3,7": "↓", 
    "4,7": "←", 
    "4,6": "↓",
    "5,6": "←",
    "5,5": "←",
    "5,4": "↑",
    "4,4": "←",
    "4,3": "←",
    "4,2": "↑",
    "3,2": "←",
    "3,1": "←",
    "3,0": "↓",
    "4,0": "↓",
    "5,0": "→",
    "5,1": "↓",
    "6,1": "→",
    "6,2": "→",
    "6,3": "↓",
    "7,3": "→",
    "7,4": "→","7,5": "→","7,6": "→"
};

// AI Opinion Dictionary Data Matrix
const opinionStages = {
    0: { up: "Unrecognized pattern", right: "Unrecognized pattern", down: "Unrecognized pattern", left: "Unrecognized pattern" },
    1: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    2: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    3: { up: "It should have some meanning.", right: "Slightly correlates with right turn near walls", down: "Might mean: Follow barrier downwards?", left: "Seems to imply leftward opening" },
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

    //maze2Btn.disabled = true; // Ensure Maze 2 is locked until training is complete

    // Dynamically checks if Maze 2 should be unlocked
    updateMazeUnlockStatus(); 
}

// Only enable Maze 2 button when trainingTimes reaches 5, and optionally add a glow effect to highlight the moment it unlocks. Remove the glow if trainingTimes drops below 5 (in case of reset).
function updateMazeUnlockStatus() {
    if (trainingTimes >= 5) {
        maze2Btn.disabled = false;
        // Optional: Keep glow effect if it's the exact moment it unlocks
        if (trainingTimes === 5 && currentMaze === 1 && !isMoving) {
            maze2Btn.classList.add('unlocked-glow');
        }
    } else {
        maze2Btn.disabled = true;
        maze2Btn.classList.remove('unlocked-glow');
    }
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
    // Reset step counter for the Move & Reward History log
    currentStepCount = 0;

    const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    const historyLogEl = document.getElementById('move-history-log');
    if (historyLogEl) {
        historyLogEl.innerHTML = '<div style="color: #22c55e; font-weight: bold;">[Step 0] Start at (0,0) → 0 pts</div>';
    }

    let path = [];

    if (currentMaze === 1) {
        //trainingTimes++;

        //limit the maximum training times to 5, and only increment when the "Train & Run" button is clicked in Maze 1, allowing users to see the final trained result at 5 trainings without further increments on additional clicks.
        if(trainingTimes < 5) {
            trainingTimes++;
        }
        trainingCountEl.textContent = `${trainingTimes} / 5`;

        if (trainingTimes === 1) {
            // Randomly wandering near the first corner
            path = [[0,0], [0,1], [1,1], [1,2], [1,1], [0,1], [0,0], [0,1], [1,1], [1,2]];
        } else if (trainingTimes === 2) {
            //  Hit the second corner but then goes back and forth without understanding the arrows' guidance.
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [1,3], [1,2], [1,1], [0,1]];
        } else if (trainingTimes === 3) {
            // Hit the forth corner and go back
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [4,7], [4,6], [5,6], [4,6], [4,7]];
        } else if (trainingTimes === 4) {
            // Follows correctly the arrows expect the up arrow.
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6], [5,5], [5,4], [4,4], [3,4]];
        } else if (trainingTimes === 5) {
            // Decodes the layout perfectly, tracing wall direction indicators directly to goal
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6], [5,5], [5,4], [4,4], [3,4], [3,3], [3,2], [3,1], [4,1], [4,2], [5,2], [6,2], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
        }
    } else {
        // Maze 2 Advanced Path mapping
        // path = [[0,0], [0,1], [0,2], [0,3], [1,3], [2,3], [2,2], [2,1], [3,1], [4,1], [5,1], [6,1], [6,2], [6,3], [5,3], [4,3], [4,4], [4,5], [4,6], [3,6], [2,6], [2,5], [2,4], [1,4], [1,5], [1,6], [1,7], [7,7]];
        path = [[0,0], [1,0], [1,1], [1,2], [0,2], [0,3], [0,4], [1,4], [2,4], [2,5], [2,6], [1,6], [1,7], [2,7], [3,7], [4,7], [4,6], [5,6], [5,5], [5,4], [4,4], [4,3], [4,2], [3,2], [3,1], [3,0], [4,0], [5,0], [5,1], [6,1], [6,2], [6,3], [7,3],[7,4], [7,5], [7,6], [7,7]];
        
        // Accurate simplified path through structure definitions
        //path = [[0,0], [0,1], [0,2], [0,3], [1,3], [2,3], [2,4], [2,5], [2,6], [3,6], [4,6], [4,5], [4,4], [4,3], [5,3], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
    }

    animateBallPath(path, 0);
}

// Animate the ball's movement along the defined path with a tick cycle, and evaluate reward points based on the moves made in relation to the guiding arrows and the goal.
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

    //Get the current maze layout to evaluate the move's reward points.
    const layout = currentMaze === 1 ? maze1Layout : maze2Layout;

    // Default status for spaces with no rules
    let currentMoveText = "0 (Open Path)";
    let currentMoveColor = "#64748b"; // Gray

    // Evaluate Reward Points
    if (index > 0) {
        // Increment the step counter for the Move & Reward History log
        currentStepCount++;

        // Check for guiding arrows on the previous block and evaluate if the move followed them correctly
        const [prevR, prevC] = path[index - 1];
        const arrows = currentMaze === 1 ? maze1Arrows : maze2Arrows;
        const arrow = arrows[`${prevR},${prevC}`];

        // Check if there was a guiding arrow on the previous block
        if (arrow) {
            let followedCorrectly = false;
            if (arrow === "↑" && r === prevR - 1 && c === prevC) followedCorrectly = true;
            if (arrow === "→" && r === prevR && c === prevC + 1) followedCorrectly = true;
            if (arrow === "↓" && r === prevR + 1 && c === prevC) followedCorrectly = true;
            if (arrow === "←" && r === prevR && c === prevC - 1) followedCorrectly = true;

            if (followedCorrectly) {
                rewardPoints += 10;

                // Update the last move points display when the arrow was followed correctly
                currentMoveText = "+10 (Followed Arrow)";
                currentMoveColor = "#10b981";
            } else {
                rewardPoints -= 10;
                // Update the last move points display when the arrow was ignored or followed incorrectly
                currentMoveText = "-10 (Ignored Arrow)";
                currentMoveColor = "#ef4444"; // Red
            }

            // Check if the ball has arrived at the Goal (Grid value is 3)
            if (layout[r][c] === 3) {
                rewardPoints += 100;
                currentMoveText = "+100 (Goal Reached!)";
                currentMoveColor = "#3b82f6"; // Blue
            }

            //Update the total reward points display
            const rewardValEl = document.getElementById('reward-value');
            if (rewardValEl) {
                rewardValEl.textContent = rewardPoints;
                rewardValEl.style.color = rewardPoints >= 0 ? "#10b981" : "#ef4444";
            }

            //Append the current move's reward points and status to the history log with appropriate color coding
            const historyLogEl = document.getElementById('move-history-log');
            if (historyLogEl) {

                // Clear the history log on the first step of a new run to avoid confusion with previous runs' logs
                if (currentStepCount === 1) {
                    historyLogEl.innerHTML = '';
                }

                const newLogItem = document.createElement('div');
                //newLogItem.style.color = currentMoveColor;
                newLogItem.className = 'history-log-item';
                newLogItem.textContent = `[Step ${currentStepCount}] Moved to (${r},${c}) → ${currentMoveText}` + ` | Total: ${rewardPoints} pts`;
                historyLogEl.appendChild(newLogItem);
            
            //Auto-scroll the history log to the latest entry
                historyLogEl.scrollTop = historyLogEl.scrollHeight;
            }
        }
    }

    // Continue animating the next move after a short delay to create a tick cycle effect
    setTimeout(() => {
        animateBallPath(path, index + 1);
    }, 1000);
}

//Handle the Opinion Table updates and narrative text changes based on the training outcome after each run, reflecting the ball's learning progress and the player's training efforts in Maze 1, and the flawless performance in Maze 2 once fully trained.
function handleTrainingOutcome() {
    updateOpinionTable();

    if (currentMaze === 1) {
        if (trainingTimes === 1) {
            narrativeTextEl.textContent = "❌ Result: Doesn't know how to get to the endpoint." + " I only get " + rewardPoints + " points. How can I reach the goal and get more points?";
            actionBtn.textContent = "Train & Run (Step 2)";
        } else if (trainingTimes === 2) {
            narrativeTextEl.textContent = "❓ Result: Seems like there are some arrows for guidance." + " I get " + rewardPoints + " point! I may go to the wrong way. I should try to follow the arrows.";
            actionBtn.textContent = "Train & Run (Step 3)";
        } else if (trainingTimes === 3) {
            narrativeTextEl.textContent = "🔍 Result: The ball is beginning to observe correlations between arrows and walls. I should have more points, but I only have " + rewardPoints + " points. I must go to the wrong way.";
            actionBtn.textContent = "Train & Run (Step 4)";
        } else if (trainingTimes === 4) {
            narrativeTextEl.textContent = "💡 Result: The ball is starting to grasp arrow orientations relative to paths." + " I get " + rewardPoints + " points. I almost find the way!";
            actionBtn.textContent = "Train & Run (Final Step)";
        } else if (trainingTimes === 5) {
            narrativeTextEl.textContent = "🏆 Result: Knowing the arrows' meaning! It unlocked the map key and reached the endpoint!" + " I get " + rewardPoints + " points.";
            //actionBtn.style.display = 'inline-block';
            
            //reun maze1 with the fully trained knowledge to show the perfect path again, and also unlock maze 2 with a glow effect to highlight the moment it unlocks.
            actionBtn.textContent = "Run Maze 1 (Mastered)";
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

    // Reset reward points when switching back to Maze 1 to reflect the training progress accurately.
    rewardPoints = 0;
    const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    // Clear history log when switching mazes to avoid confusion with previous maze's logs
    const historyLogEl = document.getElementById('move-history-log');
    historyLogEl.innerHTML = ''; 

    initGrid();
});

maze2Btn.addEventListener('click', () => {
    currentMaze = 2;
    maze1Btn.classList.remove('active');
    maze2Btn.classList.add('active');
    maze2Btn.classList.remove('unlocked-glow');
    
    actionBtn.style.display = 'inline-block';
    actionBtn.textContent = "Run Maze";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "The ball already knows the meaning of arrows. No training required!";
    
    // Reset reward points when entering Maze 2 to reflect the new challenge accurately.
    rewardPoints = 0;
    const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    // Clear history log when switching mazes to avoid confusion with previous maze's logs
    const historyLogEl = document.getElementById('move-history-log');
    historyLogEl.innerHTML = ''; 

    initGrid();
});

actionBtn.addEventListener('click', runSimulation);

resetBtn.addEventListener('click', () => {
    currentMaze = 1;
    trainingTimes = 0;
    isMoving = false;

    // Reset step counter for the Move & Reward History log
    currentStepCount = 0;
    
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
