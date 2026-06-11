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

            // Set the error flag for translation
            //errorItem.textContent = `⚠️ ERROR: Encountered unknown '←' feature. Simulation stopped.`;
            errorItem.setAttribute('data-is-error', 'true');
            updateSLLogItem(errorItem);
            
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

        // if (arrow === "⇨") {
        //     interpretedArrow = "→";
        //     generalizationText = " (Generalized to Right)";
        // } else if (arrow === "⇓") {
        //     interpretedArrow = "↓";
        //     generalizationText = " (Generalized to Down)";
        // } else if (arrow === "⇐"){
        //     interpretedArrow = "←";
        //     generalizationText = " (Generalized to Left)";
        // } else if(arrow === "⇑"){
        //     interpretedArrow = "↑";
        //     generalizationText = " (Generalized to Up)";
        // }

        // Map generalized keys instead of hardcoded text
        let genKey = "";
        if (arrow === "⇨") {
            genKey = "gen_right";
        } else if (arrow === "⇓") {
            genKey = "gen_down";
        } else if (arrow === "⇐") {
            genKey = "gen_left";
        } else if (arrow === "⇑") {
            genKey = "gen_up";
        }

        //let actionLog = "Executed Label: " + arrow;
        //Setup the Log Action Text
        //let actionLog = `Moved ${coordChangeStr}${generalizationText}`;

        // if (maze1Layout[r][c] === 3) {
        //     actionLog = `Moved ${coordChangeStr} → Goal Reached!`;
        // }

        const isGoal = (maze1Layout[r][c] === 3);

        const newLogItem = document.createElement('div');
        newLogItem.className = 'history-log-item';

        //newLogItem.textContent = `[Step ${currentStepCount}] Read '${arrow}' feature → ${actionLog}`;
        
        // Store data attributes for dynamic translation
        newLogItem.setAttribute('data-step', currentStepCount);
        newLogItem.setAttribute('data-arrow', arrow);
        newLogItem.setAttribute('data-coord', coordChangeStr);

        if (genKey) {
            newLogItem.setAttribute('data-gen-key', genKey);
        }
        if (isGoal) {
            newLogItem.setAttribute('data-is-goal', 'true');
        }

        //Initialize text matching the active language immediately
        if (typeof updateSLLogItem === 'function') {
            updateSLLogItem(newLogItem);
        }
        
        //updateSLLogItem(newLogItem);

        //Append to history log
        historyLogEl.appendChild(newLogItem);
        historyLogEl.scrollTop = historyLogEl.scrollHeight;
    }

    setTimeout(() => {
        animateSupervisedPath(path, index + 1);
    }, 400); // slightly faster than RL!
}

// Function to update individual log items based on language
function updateSLLogItem(item) {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    // Check if it's Step 0
    const step = item.getAttribute('data-step');
    if (step === '0') {
        item.textContent = dict['log_step0'];
        return;
    }
    
    // Check if it's the Step 1 Error Message
    const isError = item.getAttribute('data-is-error') === 'true';
    if (isError) {
        item.textContent = dict['log_error'];
        return;
    }


    // Retrieve data for normal steps
    const arrow = item.getAttribute('data-arrow');
    const coord = item.getAttribute('data-coord');
    const genKey = item.getAttribute('data-gen-key'); 
    const isGoal = item.getAttribute('data-is-goal') === 'true';

    // Build the generalization text (e.g., "(Generalized to Right)")
    let genText = genKey ? dict[genKey] : "";
    
    // Build the action log part
    let actionLog;
    if (isGoal) {
        actionLog = dict['log_goal'].replace('{coord}', coord);
    } else {
        actionLog = dict['log_moved'].replace('{coord}', coord).replace('{gen}', genText);
    }

    // Combine everything into the final format
    item.textContent = dict['log_format']
        .replace('{step}', step)
        .replace('{arrow}', arrow)
        .replace('{actionLog}', actionLog);
}