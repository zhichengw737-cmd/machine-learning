function updateDictionary(directionKey) {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;

    if (!directionKey) {
        opUp.textContent = dict['lbl_none'];
        opRight.textContent = dict['lbl_none'];
        opDown.textContent = dict['lbl_none'];
        opLeft.textContent = dict['lbl_none'];
        return;
    }

    // if (directionKey === 'UP') {
    //     opUp.textContent = dict['lbl_up'];
    //     opUp.classList.add('highlight-update');
    // } else if (directionKey === 'RIGHT') {
    //     opRight.textContent = dict['lbl_right'];
    //     opRight.classList.add('highlight-update');
    // } else if (directionKey === 'DOWN') {
    //     opDown.textContent = dict['lbl_down'];
    //     opDown.classList.add('highlight-update');
    // } else if (directionKey === 'LEFT') {
    //     opLeft.textContent = dict['lbl_left'];
    //     opLeft.classList.add('highlight-update');
    // }

    const slotId = "mem-" + directionKey.toLowerCase();
    const slot = document.getElementById(slotId);
    
    if (slot) {
        slot.classList.add('highlight-update');
    }


    setTimeout(clearHighlightUpdates, 600);
}

function clearHighlightUpdates() {
    const elements = document.querySelectorAll('.highlight-update');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('highlight-update');
    }
}