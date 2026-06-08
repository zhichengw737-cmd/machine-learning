// Simulation Logic - Run the ball through the maze based on the current training stage, and evaluate reward points based on the moves made in relation to the guiding arrows and the goal. The path taken will evolve with each training stage in Maze 1, while Maze 2 will show a flawless path on the first run once unlocked.
function runSimulation() {
    if (isMoving) return;
    isMoving = true;
    actionBtn.disabled = true;

    // Reset reward points on new run
    rewardPoints = 0;
    // Reset step counter for the Move & Reward History log
    currentStepCount = 0;

    //const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    //const historyLogEl = document.getElementById('move-history-log');
    if (historyLogEl) {
        //historyLogEl.innerHTML = '<div style="color: #22c55e; font-weight: bold;">[Step 0] Start at (0,0) → 0 pts</div>';

        historyLogEl.innerHTML = ''; // Clear previous logs
        const stepZeroItem = document.createElement('div');
        stepZeroItem.className = 'history-log-item';
        stepZeroItem.style.fontWeight = 'bold'; // Optional highlight for the starting position
        stepZeroItem.textContent = `[Step 0] Start at (0,0) → 0 pts`;
        
        historyLogEl.appendChild(stepZeroItem);

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
            //const rewardValEl = document.getElementById('reward-value');
            if (rewardValEl) {
                rewardValEl.textContent = rewardPoints;
                rewardValEl.style.color = rewardPoints >= 0 ? "#10b981" : "#ef4444";
            }

            //Append the current move's reward points and status to the history log with appropriate color coding
            //const historyLogEl = document.getElementById('move-history-log');
            if (historyLogEl) {

                // Clear the history log on the first step of a new run to avoid confusion with previous runs' logs
                //if (currentStepCount === 1) {
                //    historyLogEl.innerHTML = '';
                //}

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
    }, 500); // Adjust the delay time as needed for faster or slower animation
}