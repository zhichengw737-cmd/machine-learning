// Dictionary & Narrative Updates
function updateDictionary() {
    if (trainingBatch === 0) {
        opUp.textContent = "No Label Provided";
        opRight.textContent = "No Label Provided";
        opDown.textContent = "No Label Provided";
        opLeft.textContent = "No Label Provided";
    } else if (trainingBatch === 1) {
        opRight.textContent = "Assigned Label: RIGHT";
        opRight.classList.add('highlight-update');
        opDown.textContent = "Assigned Label: DOWN";
        opDown.classList.add('highlight-update');
    } else if (trainingBatch >= 2) {
        opLeft.textContent = "Assigned Label: LEFT";
        opLeft.classList.add('highlight-update');
        opUp.textContent = "Assigned Label: UP";
        opUp.classList.add('highlight-update');
    }

    setTimeout(() => {
        document.querySelectorAll('.highlight-update').forEach(el => el.classList.remove('highlight-update'));
    }, 600);
}