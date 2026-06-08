function animateSupervisedPath(path, index) {
    if (index >= path.length) {
        isMoving = false;
        actionBtn.disabled = false;
        
        // Add a stopping message for Step 1
        if (trainingBatch === 1) {
            const errorItem = document.createElement('div');
            errorItem.className = 'history-log-item';
            errorItem.style.color = '#ef4444';
            errorItem.style.fontWeight = 'bold';
            errorItem.textContent = `⚠️ ERROR: Encountered unknown '←' feature. Simulation stopped.`;
            historyLogEl.appendChild(errorItem);
            historyLogEl.scrollTop = historyLogEl.scrollHeight;
        }
        return;
    }

    const [r, c] = path[index];
    const targetCell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
    const ball = document.getElementById('ball');
    
    if (targetCell && ball) {
        targetCell.appendChild(ball);
    }

    if (index > 0) {
        currentStepCount++;
        const [prevR, prevC] = path[index - 1];
        const arrow = maze1Arrows[`${prevR},${prevC}`];

        let actionLog = "Executed Label: " + arrow;
        if (maze1Layout[r][c] === 3) {
            actionLog = "Goal Reached!";
        }

        const newLogItem = document.createElement('div');
        newLogItem.className = 'history-log-item';
        newLogItem.textContent = `[Step ${currentStepCount}] Read '${arrow}' feature → ${actionLog}`;
        historyLogEl.appendChild(newLogItem);
        historyLogEl.scrollTop = historyLogEl.scrollHeight;
    }

    setTimeout(() => {
        animateSupervisedPath(path, index + 1);
    }, 400); // slightly faster than RL!
}