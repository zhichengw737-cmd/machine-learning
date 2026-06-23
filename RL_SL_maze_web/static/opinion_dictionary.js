function updateOpinionTable() {
    const stage = currentMaze === 2 ? 5 : trainingTimes;

    // Fetch active language dictionary object from memory
    const dict = window.currentLang === 'en' ? lang_en : lang_zh;

    // Construct lookup key prefix cleanly (collapsing stages 1 and 2 seamlessly)
    let prefix = `opinion_${stage}`;

    // Update DOM entries from localized keys
    opUp.textContent = dict[`${prefix}_up`] || "";
    opRight.textContent = dict[`${prefix}_right`] || "";
    opDown.textContent = dict[`${prefix}_down`] || "";
    opLeft.textContent = dict[`${prefix}_left`] || "";

    document.querySelectorAll('.opinion-text').forEach(el => {
        if (stage > 0) {
            el.classList.add('highlight-update');
            setTimeout(() => el.classList.remove('highlight-update'), 600);
        }
    });

    if (actionBtn && !isMoving) {
        actionBtn.disabled = false;
    }
}

//Handle the Opinion Table updates and narrative text changes based on the training outcome after each run, reflecting the ball's learning progress and the player's training efforts in Maze 1, and the flawless performance in Maze 2 once fully trained.
function handleTrainingOutcome() {
    updateOpinionTable();

    // Fetch active language dictionary object from memory
    const dict = window.currentLang === 'en' ? lang_en : lang_zh;

    if (currentMaze === 1) {
        // Increment occurs at the start or end of the training tick cycle depending on your simulation flow
        const stageKey = `narrative_step${trainingTimes}`;
        
        if (dict[stageKey]) {
            // Replace the template placeholder dynamically with live state variables
            narrativeTextEl.textContent = dict[stageKey].replace('{points}', rewardPoints);
        }

        // Advance action button label cleanly for the subsequent step
        if (trainingTimes < 5) {
            actionBtn.textContent = dict[`btn_train_step${trainingTimes + 1}`] || dict['btn_train_final'];
        } else {
            actionBtn.textContent = dict['btn_run_mastered'];
            maze2Btn.disabled = false;
            maze2Btn.classList.add('unlocked-glow');
        }
    } else if (currentMaze === 2) {
        narrativeTextEl.textContent = dict['narrative_maze2'];
        actionBtn.textContent = dict['btn_run_maze2'];
    }
        
}