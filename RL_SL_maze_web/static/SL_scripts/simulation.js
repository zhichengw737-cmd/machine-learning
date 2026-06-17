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
        const formatCoord = function(val){
            if(val > 0){
                return `+${val}`;
            }else{
                return val;
            }
        }
        
        const coordChangeStr = `(${formatCoord(dx)}, ${formatCoord(dy)})`;

        //AI Generalization Logic (Interpreting fake arrows as standard ones)
        let interpretedArrow = arrow;
        let generalizationText = "";

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

        const isGoal = (maze1Layout[r][c] === 3);

        const newLogItem = document.createElement('div');
        newLogItem.className = 'history-log-item';

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

    // The "Scanning and Thinking" Pause evaluation
    var currentArrow = maze1Arrows[r + "," + c];
    var fakeArrows = ["⇨", "⇓", "⇐", "⇑"];

    // If ball landed on a fake arrow AND the simulation has further steps to go
    if (fakeArrows.indexOf(currentArrow) !== -1 && (index + 1) < path.length) {
        
        // Pause the loop and wait for the user to help it generalize
        handleThinkingPause(targetCell, currentArrow, function() {
            // This callback fires ONLY after the user clicks the bubble
            animateSupervisedPath(path, index + 1);
        });

    } else {
        // Standard behavior: wait a moment, then move to next cell
        setTimeout(function() {
            animateSupervisedPath(path, index + 1);
        }, 400);
    }
}

// Interactive Bubble Generation Logic

function handleThinkingPause(targetCell, currentArrow, resumeCallback) {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    // 1. Create the interactive thinking bubble
    var bubble = document.createElement('div');
    bubble.className = 'thought-bubble';
    //bubble.innerHTML = '🤔';
    bubble.textContent = dict['though_bubble_find'].replace('currentArrow',currentArrow);
    
    // Append it to the cell the ball is currently sitting on
    targetCell.appendChild(bubble);

    // 2. Determine what the standard label is supposed to be
    var standardArrow = "";
    if(currentArrow === "⇨"){
        standardArrow = "→";
    }else if(currentArrow === "⇓"){
        standardArrow = "↓";
    }else if(currentArrow === "⇐"){
        standardArrow = "←";
    }else if(currentArrow === "⇑"){
        standardArrow = "↑";
    }

    // Prevent multiple clicks from firing the callback multiple times
    var isClicked = false;

    // 3. Wait for the user to click it
    bubble.addEventListener('click', function() {
        if (isClicked) {
            return;
        }
        isClicked = true;

        // Change from "thinking" to "Aha! Generalized!"
        

        //bubble.innerHTML = '💡 ' + standardArrow;
        bubble.textContent = dict['though_bubble'].replace('standardArrow', standardArrow);

        bubble.classList.add('aha-moment');

        // Give the student 800 milliseconds to see the newly discovered shape, 
        // then remove the bubble and resume the path animation
        setTimeout(function() {
            if (targetCell.contains(bubble)) {
                targetCell.removeChild(bubble);
            }
            resumeCallback();
        }, 2000); 
    });
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