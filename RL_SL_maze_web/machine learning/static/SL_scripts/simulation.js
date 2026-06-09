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

        // Calculate Coordinate Change (x is columns, y is rows)
        const dx = c - prevC;
        const dy = r - prevR;

        // Format as (+1, 0), (0, -1), etc.
        const formatCoord = (val) => val > 0 ? `+${val}` : val;
        const coordChangeStr = `(${formatCoord(dx)}, ${formatCoord(dy)})`;

        //AI Generalization Logic (Interpreting fake arrows as standard ones)
        let interpretedArrow = arrow;
        let generalizationText = "";

        if (arrow === "⇨") {
            interpretedArrow = "→";
            generalizationText = " (Generalized to Right)";
        } else if (arrow === "⇓") {
            interpretedArrow = "↓";
            generalizationText = " (Generalized to Down)";
        } else if (arrow === "⇐"){
            interpretedArrow = "←";
            generalizationText = " (Generalized to Left)";
        } else if(arrow === "⇑"){
            interpretedArrow = "↑";
            generalizationText = " (Generalized to Up)";
        }

        //let actionLog = "Executed Label: " + arrow;
        //Setup the Log Action Text
        let actionLog = `Moved ${coordChangeStr}${generalizationText}`;

        if (maze1Layout[r][c] === 3) {
            actionLog = `Moved ${coordChangeStr} → Goal Reached!`;
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
