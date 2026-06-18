// --- 路徑動態計算函式 ---
function getNextCell(r, c, arrow) {
    if (arrow === '↑' || arrow === '⇑') return [r-1, c];
    if (arrow === '↓' || arrow === '⇓') return [r+1, c];
    if (arrow === '←' || arrow === '⇐') return [r, c-1];
    if (arrow === '→' || arrow === '⇨') return [r, c+1];
    return null;
}

function isArrowKnown(arrow) {
    if ((arrow === '↑' || arrow === '⇑') && knownDirections['UP']) return true;
    if ((arrow === '↓' || arrow === '⇓') && knownDirections['DOWN']) return true;
    if ((arrow === '←' || arrow === '⇐') && knownDirections['LEFT']) return true;
    if ((arrow === '→' || arrow === '⇨') && knownDirections['RIGHT']) return true;
    return false;
}

function calculatePathFrom(r, c) {
    let path = [[r, c]];
    let currR = r;
    let currC = c;
    
    while (true) {
        let arrow = maze1Arrows[currR + "," + currC];
        if (!arrow) break; 
        if (!isArrowKnown(arrow)) break; 
        
        let nextCell = getNextCell(currR, currC, arrow);
        if (!nextCell) break;
        
        currR = nextCell[0];
        currC = nextCell[1];
        path.push([currR, currC]);
        
        if (maze1Layout[currR][currC] === 3) break; 
    }
    return path;
}

// --- 動畫狀態全域變數 ---
let animPath = [];
let animIndex = 0;

function proceedToNextAnimStep() {
    animateSupervisedPath(animPath, animIndex + 1);
}

function handleAnimationEnd(path) {
    isMoving = false;
    toggleTeachButtons(false);
    
    const finalR = path[path.length - 1][0];
    const finalC = path[path.length - 1][1];
    ballPosRow = finalR;
    ballPosCol = finalC;

    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    if (maze1Layout[finalR][finalC] === 3) {
        document.getElementById('narrative-text').innerHTML = dict['narrative_mastered'];
        return;
    }

    const stuckArrow = maze1Arrows[finalR + "," + finalC];
    if (stuckArrow && !isArrowKnown(stuckArrow)) {
        const errorItem = document.createElement('div');
        errorItem.className = 'history-log-item';
        errorItem.style.color = '#ef4444';
        errorItem.style.fontWeight = 'bold';
        errorItem.setAttribute('data-is-error', 'true');
        errorItem.setAttribute('data-error-arrow', stuckArrow);
        updateSLLogItem(errorItem);
        
        historyLogEl.appendChild(errorItem);
        historyLogEl.scrollTop = historyLogEl.scrollHeight;
        
        document.getElementById('narrative-text').innerHTML = dict['narrative_stuck'];
    }
}

function animateSupervisedPath(path, index) {
    animPath = path;
    animIndex = index;

    if (index >= path.length) {
        handleAnimationEnd(path);
        return;
    }

    const currentCoord = path[index];
    const targetCell = document.querySelector(`[data-row='${currentCoord[0]}'][data-col='${currentCoord[1]}']`);
    const ball = document.getElementById('ball');
    
    if (targetCell && ball) {
        targetCell.appendChild(ball);
    }

    if (index > 0) {
        currentStepCount++;
        const prevCoord = path[index - 1];
        const arrow = maze1Arrows[`${prevCoord[0]},${prevCoord[1]}`];

        const dx = currentCoord[1] - prevCoord[1];
        const dy = currentCoord[0] - prevCoord[0];

        function formatCoord(val) {
            return val > 0 ? "+" + val : val;
        }
        const coordChangeStr = `(${formatCoord(dx)}, ${formatCoord(dy)})`;

        let genKey = "";
        if (arrow === "⇨") genKey = "gen_right";
        else if (arrow === "⇓") genKey = "gen_down";
        else if (arrow === "⇐") genKey = "gen_left";
        else if (arrow === "⇑") genKey = "gen_up";

        const isGoal = (maze1Layout[currentCoord[0]][currentCoord[1]] === 3);

        const newLogItem = document.createElement('div');
        newLogItem.className = 'history-log-item';
        newLogItem.setAttribute('data-step', currentStepCount);
        newLogItem.setAttribute('data-arrow', arrow);
        newLogItem.setAttribute('data-coord', coordChangeStr);
        if (genKey) newLogItem.setAttribute('data-gen-key', genKey);
        if (isGoal) newLogItem.setAttribute('data-is-goal', 'true');

        updateSLLogItem(newLogItem);
        historyLogEl.appendChild(newLogItem);
        historyLogEl.scrollTop = historyLogEl.scrollHeight;
    }

    const currentArrow = maze1Arrows[currentCoord[0] + "," + currentCoord[1]];
    const fakeArrows = ["⇨", "⇓", "⇐", "⇑"];

    if (fakeArrows.indexOf(currentArrow) !== -1 && (index + 1) < path.length) {
        handleThinkingPause(targetCell, currentArrow);
    } else {
        setTimeout(proceedToNextAnimStep, 400);
    }
}

// --- 思考泡泡互動 ---
let thinkingTargetCell = null;
let thinkingBubble = null;
let thinkingStandardArrow = "";
let thinkingIsClicked = false;

function handleThinkingPause(targetCell, currentArrow) {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    thinkingTargetCell = targetCell;
    thinkingIsClicked = false;

    thinkingBubble = document.createElement('div');
    thinkingBubble.className = 'thought-bubble';
    thinkingBubble.textContent = dict['though_bubble_find'].replace('currentArrow', currentArrow);
    
    targetCell.appendChild(thinkingBubble);

    if (currentArrow === "⇨") thinkingStandardArrow = "→";
    else if (currentArrow === "⇓") thinkingStandardArrow = "↓";
    else if (currentArrow === "⇐") thinkingStandardArrow = "←";
    else if (currentArrow === "⇑") thinkingStandardArrow = "↑";

    thinkingBubble.addEventListener('click', handleBubbleClick);
}

function handleBubbleClick() {
    if (thinkingIsClicked) return;
    thinkingIsClicked = true;

    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    thinkingBubble.textContent = dict['though_bubble'].replace('standardArrow', thinkingStandardArrow);
    thinkingBubble.classList.add('aha-moment');

    setTimeout(cleanupBubbleAndResume, 2000); 
}

function cleanupBubbleAndResume() {
    if (thinkingTargetCell && thinkingTargetCell.contains(thinkingBubble)) {
        thinkingTargetCell.removeChild(thinkingBubble);
    }
    proceedToNextAnimStep();
}

// --- 日誌翻譯更新 ---
function updateSLLogItem(item) {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    const step = item.getAttribute('data-step');
    if (step === '0') {
        item.textContent = dict['log_step0'];
        return;
    }
    
    const isError = item.getAttribute('data-is-error') === 'true';
    if (isError) {
        const errArrow = item.getAttribute('data-error-arrow');
        item.textContent = dict['log_error_dynamic'].replace('{arrow}', errArrow);
        return;
    }

    const arrow = item.getAttribute('data-arrow');
    const coord = item.getAttribute('data-coord');
    const genKey = item.getAttribute('data-gen-key'); 
    const isGoal = item.getAttribute('data-is-goal') === 'true';

    let genText = genKey ? dict[genKey] : "";
    
    let actionLog;
    if (isGoal) {
        actionLog = dict['log_goal'].replace('{coord}', coord);
    } else {
        actionLog = dict['log_moved'].replace('{coord}', coord).replace('{gen}', genText);
    }

    item.textContent = dict['log_format']
        .replace('{step}', step)
        .replace('{arrow}', arrow)
        .replace('{actionLog}', actionLog);
}