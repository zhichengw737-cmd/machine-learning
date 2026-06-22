btnTeachUp.addEventListener('click', teachUpClick);
btnTeachRight.addEventListener('click', teachRightClick);
btnTeachDown.addEventListener('click', teachDownClick);
btnTeachLeft.addEventListener('click', teachLeftClick);
resetBtn.addEventListener('click', resetSimulation);

function teachUpClick() {
    executeTeach('UP', btnTeachUp, '↑'); 
}

function teachRightClick() {
    executeTeach('RIGHT', btnTeachRight, '→'); 
}

function teachDownClick() {
    executeTeach('DOWN', btnTeachDown, '↓'); 
}

function teachLeftClick() {
    executeTeach('LEFT', btnTeachLeft, '←'); 
}


function executeTeach(directionKey, btnElement, arrowSymbol) {
    if (isMoving) return;
    if (knownDirections[directionKey]) return;

    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    knownDirections[directionKey] = true;
    taughtCount++;
    
    btnElement.disabled = true;
    btnElement.style.opacity = "0.5";
    trainingCountEl.textContent = taughtCount + " / 4";
    
    updateDictionary(directionKey);
    narrativeTextEl.innerHTML = dict['narrative_learned'].replace('{arrow}', arrowSymbol);

    // 第一次點擊時初始化日誌
    if (taughtCount === 1) {
        historyLogEl.classList.remove('history-placeholder');
        historyLogEl.innerHTML = '';
        const stepZeroItem = document.createElement('div');
        stepZeroItem.className = 'history-log-item';
        stepZeroItem.style.fontWeight = 'bold';
        stepZeroItem.setAttribute('data-step', '0');
        updateSLLogItem(stepZeroItem); 
        historyLogEl.appendChild(stepZeroItem);
    }

    // 根據目前的知識，計算小球能走的路徑
    const path = calculatePathFrom(ballPosRow, ballPosCol);
    
    if (path.length > 1) {
        isMoving = true;
        toggleTeachButtons(true);
        animateSupervisedPath(path, 0);
    } else {
        // 如果教的箭頭目前還用不到（原地踏步）
        const currentArrow = maze1Arrows[ballPosRow + "," + ballPosCol];
        if (currentArrow && !isArrowKnown(currentArrow)) {
            narrativeTextEl.innerHTML = dict['narrative_stuck'];
        }
    }

    updateMemoryGraph(directionKey);
}

function toggleTeachButtons(disabledState) {
    if (!knownDirections['UP']) btnTeachUp.disabled = disabledState;
    if (!knownDirections['RIGHT']) btnTeachRight.disabled = disabledState;
    if (!knownDirections['DOWN']) btnTeachDown.disabled = disabledState;
    if (!knownDirections['LEFT']) btnTeachLeft.disabled = disabledState;
}

function resetSimulation() {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    resetMemoryGraph();
    
    knownDirections = { 'UP': false, 'RIGHT': false, 'DOWN': false, 'LEFT': false };
    taughtCount = 0;
    isMoving = false;
    currentStepCount = 0;
    ballPosRow = 0;
    ballPosCol = 0;

    trainingCountEl.textContent = "0 / 4";

    btnTeachUp.disabled = false;
    btnTeachUp.style.opacity = "1";
    btnTeachRight.disabled = false;
    btnTeachRight.style.opacity = "1";
    btnTeachDown.disabled = false;
    btnTeachDown.style.opacity = "1";
    btnTeachLeft.disabled = false;
    btnTeachLeft.style.opacity = "1";

    narrativeTextEl.innerHTML = dict['narrative_start'];

    initGrid();

    
}

// update memory slot
function updateMemoryGraph(directionKey) {
    if (!directionKey) return;
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    const slotId = "mem-" + directionKey.toLowerCase();
    const slot = document.getElementById(slotId);
    
    if (slot) {
        slot.classList.add("learned");
        const icon = slot.querySelector('.mem-icon');
        const text = slot.querySelector('.mem-text');
        
        if (directionKey === 'UP') {
            icon.textContent = '↑'; 
            text.textContent = dict['lbl_up']; 
        }
        if (directionKey === 'RIGHT') {
            icon.textContent = '→'; 
            text.textContent = dict['lbl_right']; 
        }
        if (directionKey === 'DOWN') { 
            icon.textContent = '↓'; 
            text.textContent = dict['lbl_down']; 
        }
        if (directionKey === 'LEFT') { 
            icon.textContent = '←'; 
            text.textContent = dict['lbl_left']; 
        }
    }
}

// reset memory slot
function resetMemoryGraph() {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    const slots = document.querySelectorAll('.memory-slot');
    
    for (let i = 0; i < slots.length; i++) {
        slots[i].classList.remove('learned');
        slots[i].querySelector('.mem-icon').textContent = '❔';
        slots[i].querySelector('.mem-text').textContent = dict['mem_empty'];
    }
}

// refresh memory slot when changing language
function refreshMemoryGraphLanguage() {
    if (knownDirections['UP']){
        updateMemoryGraph('UP');
    }
    if (knownDirections['RIGHT']){
        updateMemoryGraph('RIGHT');
    } 
    if (knownDirections['DOWN']){
        updateMemoryGraph('DOWN');
    }
    if (knownDirections['LEFT']){
        updateMemoryGraph('LEFT');
    }
    
    if (taughtCount === 0) {
        resetMemoryGraph();
    }
}