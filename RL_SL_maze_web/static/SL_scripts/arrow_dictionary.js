// Dictionary & Narrative Updates
function updateDictionary() {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    if (trainingBatch === 0) {
        opUp.textContent = dict['lbl_none'];
        opRight.textContent = dict['lbl_none'];
        opDown.textContent = dict['lbl_none'];
        opLeft.textContent = dict['lbl_none'];

    } else if (trainingBatch === 1) {
        opRight.textContent = dict['lbl_right'];
        opRight.classList.add('highlight-update');

        opDown.textContent = dict['lbl_down'];
        opDown.classList.add('highlight-update');

    } else if (trainingBatch >= 2) {
        opLeft.textContent = dict['lbl_left'];
        opLeft.classList.add('highlight-update');

        opUp.textContent = dict['lbl_up'];
        opUp.classList.add('highlight-update');
    }

    setTimeout(() => {
        document.querySelectorAll('.highlight-update').forEach(el => el.classList.remove('highlight-update'));
    }, 600);
}