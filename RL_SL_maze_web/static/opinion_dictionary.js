
// AI Opinion Dictionary Data Matrix
const opinionStages = {
    0: { up: "Unrecognized pattern", right: "Unrecognized pattern", down: "Unrecognized pattern", left: "Unrecognized pattern" },
    1: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    2: { up: "Just a wall pattern?", right: "Environmental static noise", down: "Meaningless barrier shape", left: "Ignoring wall icons" },
    3: { up: "It should have some meanning.", right: "Slightly correlates with right turn near walls", down: "Might mean: Follow barrier downwards?", left: "Seems to imply leftward opening" },
    4: { up: "High Probability: Navigate Up", right: "Strong correlation with corridor turning Right", down: "High Probability: Navigate Down", left: "Strong correlation with corridor turning Left" },
    5: { up: "Confirmed: Move UP ⬆️", right: "Confirmed: Move RIGHT ➡️", down: "Confirmed: Move DOWN ⬇️", left: "Confirmed: Move LEFT ⬅️" }
};

function updateOpinionTable() {
    const stage = currentMaze === 2 ? 5 : trainingTimes;
    opUp.textContent = opinionStages[stage].up;
    opRight.textContent = opinionStages[stage].right;
    opDown.textContent = opinionStages[stage].down;
    opLeft.textContent = opinionStages[stage].left;
    
    document.querySelectorAll('.opinion-text').forEach(el => {
        if (stage > 0) {
            el.classList.add('highlight-update');
            setTimeout(() => el.classList.remove('highlight-update'), 600);
        }
    });
}

//Handle the Opinion Table updates and narrative text changes based on the training outcome after each run, reflecting the ball's learning progress and the player's training efforts in Maze 1, and the flawless performance in Maze 2 once fully trained.
function handleTrainingOutcome() {
    updateOpinionTable();

    if (currentMaze === 1) {
        if (trainingTimes === 1) {
            narrativeTextEl.textContent = "❌ Result: Doesn't know how to get to the endpoint." + " I only get " + rewardPoints + " points. How can I reach the goal and get more points?";
            actionBtn.textContent = "Train & Run (Step 2)";
        } else if (trainingTimes === 2) {
            narrativeTextEl.textContent = "❓ Result: Seems like there are some arrows for guidance." + " I get " + rewardPoints + " point! I may go to the wrong way. I should try to follow the arrows.";
            actionBtn.textContent = "Train & Run (Step 3)";
        } else if (trainingTimes === 3) {
            narrativeTextEl.textContent = "🔍 Result: The ball is beginning to observe correlations between arrows and walls. I should have more points, but I only have " + rewardPoints + " points. I must go to the wrong way.";
            actionBtn.textContent = "Train & Run (Step 4)";
        } else if (trainingTimes === 4) {
            narrativeTextEl.textContent = "💡 Result: The ball is starting to grasp arrow orientations relative to paths." + " I get " + rewardPoints + " points. I almost find the way!";
            actionBtn.textContent = "Train & Run (Final Step)";
        } else if (trainingTimes === 5) {
            narrativeTextEl.textContent = "🏆 Result: Knowing the arrows' meaning! It unlocked the map key and reached the endpoint!" + " I get " + rewardPoints + " points.";
            //actionBtn.style.display = 'inline-block';
            
            //reun maze1 with the fully trained knowledge to show the perfect path again, and also unlock maze 2 with a glow effect to highlight the moment it unlocks.
            actionBtn.textContent = "Run Maze 1 (Mastered)";
            maze2Btn.disabled = false;
            maze2Btn.classList.add('unlocked-glow');
        }
    } else {
        narrativeTextEl.textContent = "🚀 Flawless! Because the ball already knows the meaning of arrows, it clears Maze 2 smoothly on its first attempt!";
    }
    actionBtn.disabled = isMoving;
}