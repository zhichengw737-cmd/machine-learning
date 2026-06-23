// Simulation Logic - Run the ball through the maze based on the current training stage, and evaluate reward points based on the moves made in relation to the guiding arrows and the goal. The path taken will evolve with each training stage in Maze 1, while Maze 2 will show a flawless path on the first run once unlocked.
function runSimulation() {
    if (isMoving) return;
    isMoving = true;
    actionBtn.disabled = true;

    // Reset reward points on new run
    rewardPoints = 0;
    // Reset step counter for the Move & Reward History log
    currentStepCount = 0;

    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.classList.add('reward-positive');
        rewardValEl.classList.remove('reward-negative');
    }

    if (historyLogEl) {

        historyLogEl.innerHTML = ''; // Clear previous logs
        const stepZeroItem = document.createElement('div');
        stepZeroItem.className = 'history-log-item';
        stepZeroItem.classList.add('history-log-start');
        
        historyLogEl.appendChild(stepZeroItem);

    }

    let path = [];

    if (currentMaze === 1) {

        //limit the maximum training times to 5, and only increment when the "Train & Run" button is clicked in Maze 1, allowing users to see the final trained result at 5 trainings without further increments on additional clicks.
        if(trainingTimes < 5) {
            trainingTimes++;
        }
        trainingCountEl.textContent = `${trainingTimes} / 5`;

        if (trainingTimes === 1) {
            // Randomly wandering near the first corner

            path = [[0,0], [0,1], [1,1], [0,1],[1,1], [0,1]];
        } else if (trainingTimes === 2) {
            //  Hit the second corner but then goes back and forth without understanding the arrows' guidance.
            
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [1,5], [2,5]];
        } else if (trainingTimes === 3) {
            // Hit the forth corner and go back

            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [4,7], [4,6], [4,7]];
        } else if (trainingTimes === 4) {
            // Follows correctly the arrows expect the up arrow.

            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [4,7], [4,6], [5,6], [5,5], [5,4], [5,5],[5,6]];
        } else if (trainingTimes === 5) {
            // Decodes the layout perfectly, tracing wall direction indicators directly to goal
 
            path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6], [5,5], [5,4], [4,4], [3,4], [3,3], [3,2], [3,1], [4,1], [4,2], [5,2], [6,2], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
        }
    } else {
        // Maze 2 Advanced Path mapping
 
        path = [[0,0], [1,0], [1,1], [1,2], [0,2], [0,3], [0,4], [1,4], [2,4], [2,5], [2,6], [1,6], [1,7], [2,7], [3,7], [4,7], [4,6], [5,6], [5,5], [5,4], [4,4], [4,3], [4,2], [3,2], [3,1], [3,0], [4,0], [5,0], [5,1], [6,1], [6,2], [6,3], [7,3],[7,4], [7,5], [7,6], [7,7]];
        
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

    //Get current ball position
    const [r, c] = path[index];
    const targetCell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
    const ball = document.getElementById('ball');
    
    // Move the ball element visually on the grid layout
    if (targetCell && ball) {
        targetCell.appendChild(ball);
    }

    // Evaluate Reward Points
    if (index > 0) {
        // Increment the step counter for the Move & Reward History log
        currentStepCount++;

        // Dynamically locate where the Goal (3) is positioned in the grid layout
        let goalR = 7, goalC = 7; // Default fallback to bottom-right corner
        const currentLayout = currentMaze === 1 ? maze1Layout : maze2Layout;
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (currentLayout[i][j] === 3) {
                    goalR = i;
                    goalC = j;
                }
            }
        }

        // ======= BACKTRACKING CHECK =======
        let isBacktracking = false;
        for (let i = 0; i < index; i++) {
            if (path[i][0] === r && path[i][1] === c) {
                isBacktracking = true;
                break;
            }
        }

        // Inverse reward logic with backtracking protection
        let stepReward = 0;
        let currentMoveText = "";

        //ARROW GUIDANCE VALIDATION
        const [prevR, prevC] = path[index - 1] || [0, 0];
        const arrows = currentMaze === 1 ? maze1Arrows : maze2Arrows;
        const expectedArrow = arrows ? arrows[`${prevR},${prevC}`] : null;

        let followedArrow = true;
        if (index > 0 && expectedArrow) {
            if (expectedArrow === "↑" && (r !== prevR - 1 || c !== prevC)) followedArrow = false;
            if (expectedArrow === "→" && (r !== prevR || c !== prevC + 1)) followedArrow = false;
            if (expectedArrow === "↓" && (r !== prevR + 1 || c !== prevC)) followedArrow = false;
            if (expectedArrow === "←" && (r !== prevR || c !== prevC - 1)) followedArrow = false;
        }

        // Handle the specific layout condition when the ball reaches the goal (Distance is 0)
        const dict = window.currentLang === 'en' ? lang_en : lang_zh;

        if (currentLayout[r][c] === 3) {
            rewardPoints += 100;
            stepReward = 1;

        }else if (isBacktracking) {
            // If the ball goes back, freeze the point growth
            stepReward = -1; 

        }else if(!followedArrow){
            stepReward = -1;

        }else {
            // Regular unvisited cell logic: Longer distance = higher points
            stepReward = 1;

        }

        // Update global running score tracker
        rewardPoints += stepReward;

        if (rewardValEl) {
            rewardValEl.textContent = rewardPoints;

            if (rewardPoints >= 0) {
                rewardValEl.classList.add('reward-positive');
                rewardValEl.classList.remove('reward-negative');
            } else {
                rewardValEl.classList.add('reward-negative');
                rewardValEl.classList.remove('reward-positive');
            }
        }

        // Append the current step's status text directly into the scrollable history log panel
        if (historyLogEl) {
            const newLogItem = document.createElement('div');
            newLogItem.className = 'history-log-item';
                        
            // STORE THE DATA AS ATTRIBUTES
            newLogItem.setAttribute('data-step', currentStepCount);
            newLogItem.setAttribute('data-from', `${prevR},${prevC}`);
            newLogItem.setAttribute('data-coords', `${r},${c}`);
            newLogItem.setAttribute('data-points', rewardPoints);
            newLogItem.setAttribute('data-is-backtrack', isBacktracking ? 'true' : 'false');
            newLogItem.setAttribute('data-move-text', currentMoveText);

            const isGoalReached = false;
            if(currentLayout[r][c] === 3){
                const isGoalReached = true;
                newLogItem.setAttribute('data-is-goal', isGoalReached);
            }

            // Initial render
            updateSingleLogItem(newLogItem);
            historyLogEl.appendChild(newLogItem);
        
            // Auto-scroll the history log panel down to show the latest entry
            historyLogEl.scrollTop = historyLogEl.scrollHeight;
        }

    }

    // Continue animating the next move after a short delay to create a tick cycle effect
    setTimeout(function() {
        animateBallPath(path, index + 1);
    }, 500);
}

function updateSingleLogItem(item) {
    const dict = window.currentLang === 'en' ? lang_en : lang_zh;
    
    const step = item.getAttribute('data-step');
    const from = item.getAttribute('data-from');
    const coords = item.getAttribute('data-coords');
    const points = item.getAttribute('data-points');
    const isBacktrack = item.getAttribute('data-is-backtrack') === 'true';
    const moveText = item.getAttribute('data-move-text');

    const isGoal = item.getAttribute('data-is-goal') === 'true';
    
    // Use a format string from dictionary to keep it clean
    let formatKey = 'log_standard';
    if(isGoal){
        formatKey = 'log_goal';
    } else if(isBacktrack){
        formatKey = 'log_backtrack';
    }
    
    const format = dict[formatKey];

    if(!item.getAttribute('data-step')){
        return;
    }

    let displayFrom = from;
    let displayCoords = coords;
    if (isBacktrack) {
        displayFrom = coords;
        displayCoords = from;
    }
    
    item.textContent = format
        .replace(/{step}/g, step)
        .replace(/{from}/g, `(${displayFrom})`)
        .replace(/{coords}/g, `(${displayCoords})`) // Formats it as (0,1)
        .replace(/{points}/g, points)
        .replace(/{text}/g, moveText);
}

function refreshAllHistoryLogs() {
    const logItems = document.querySelectorAll('.history-log-item');
    logItems.forEach(function(item) {
        updateSingleLogItem(item);
    });
}