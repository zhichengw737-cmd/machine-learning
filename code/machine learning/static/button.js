// Buttons Actions
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
    //const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.innerHTML = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    // Clear history log when switching mazes to avoid confusion with previous maze's logs
    //const historyLogEl = document.getElementById('move-history-log');
    //historyLogEl.innerHTML = 'Waiting for simulation...'; 

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
    //const rewardValEl = document.getElementById('reward-value');
    if (rewardValEl) {
        rewardValEl.textContent = rewardPoints;
        rewardValEl.style.color = "#10b981";
    }

    // Clear history log when switching mazes to avoid confusion with previous maze's logs
    //const historyLogEl = document.getElementById('move-history-log');
    //historyLogEl.innerHTML = 'Waiting for simulation...'; 

    initGrid();
});

actionBtn.addEventListener('click', runSimulation);

resetBtn.addEventListener('click', () => {
    currentMaze = 1;
    trainingTimes = 0;
    isMoving = false;

    // Reset step counter for the Move & Reward History log
    currentStepCount = 0;
    rewardPoints = 0;
    rewardValEl.innerHTML = rewardPoints;
    //historyLogEl.innerHTML = 'Waiting for simulation...';
    
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

//initGrid();