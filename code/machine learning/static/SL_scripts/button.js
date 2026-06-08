// action button
actionBtn.addEventListener('click', () => {
    if (isMoving) return;
    isMoving = true;
    actionBtn.disabled = true;
    currentStepCount = 0;

    if (trainingBatch < 3) trainingBatch++;
    trainingCountEl.textContent = `${trainingBatch} / 3`;
    updateDictionary();

    historyLogEl.classList.remove('history-placeholder');
    historyLogEl.innerHTML = '';
    const stepZeroItem = document.createElement('div');
    stepZeroItem.className = 'history-log-item';
    stepZeroItem.style.fontWeight = 'bold';
    stepZeroItem.textContent = `[Step 0] Start at (0,0) → Ready to read labels`;
    historyLogEl.appendChild(stepZeroItem);

    let path = [];

    if (trainingBatch === 1) {
        // Step 1: Knows Right & Down. It traces perfectly until it encounters the first LEFT arrow at (5,6) and stops.
        narrativeTextEl.innerHTML = "📝 <strong>Batch 1:</strong> The ball is taught what Right & Down mean. It moves until it sees an unknown shape and stops.";
        actionBtn.textContent = "Provide Labels (Step 2)";
        path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6]];
    } else if (trainingBatch === 2) {
        // Step 2: Knows Left & Up. It now knows all features and can trace to the goal perfectly!
        narrativeTextEl.innerHTML = "📝 <strong>Batch 2:</strong> The ball is taught Left & Up. It now has a label for every feature and reaches the goal!";
        actionBtn.textContent = "Run Full Test (Mastered)";
        path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6], [5,5], [5,4], [4,4], [3,4], [3,3], [3,2], [3,1], [4,1], [4,2], [5,2], [6,2], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
    } else {
        narrativeTextEl.innerHTML = "🏆 <strong>Mastered:</strong> The Supervised Model perfectly follows its given labels!";
        path = [[0,0], [0,1], [1,1], [1,2], [1,3], [1,4], [1,5], [2,5], [2,6], [3,6], [4,6], [5,6], [5,5], [5,4], [4,4], [3,4], [3,3], [3,2], [3,1], [4,1], [4,2], [5,2], [6,2], [6,3], [7,3], [7,4], [7,5], [7,6], [7,7]];
    }

    animateSupervisedPath(path, 0);
});

// Reset System
resetBtn.addEventListener('click', () => {
    trainingBatch = 0;
    isMoving = false;
    currentStepCount = 0;
    trainingCountEl.textContent = "0 / 3";
    actionBtn.textContent = "Provide Labels (Step 1)";
    actionBtn.disabled = false;
    narrativeTextEl.textContent = "The ball needs a teacher. Click \"Provide Labels\" to feed it its first batch of flashcards.";
    initGrid();
});

// App Start
initGrid();