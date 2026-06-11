// Dedicated language engine for the Supervised Learning Page
window.currentSLLang = localStorage.getItem('appLang') || 'en';

function applySLTranslations() {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
    
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) langBtn.textContent = dict['lang_btn'];
}

function refreshAllSLLogs() {
    if (typeof updateSLLogItem === 'function') {
        document.querySelectorAll('.history-log-item').forEach(updateSLLogItem);
    }
}

function toggleSLLanguage() {
    window.currentSLLang = window.currentSLLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('appLang', window.currentSLLang);
    
    applySLTranslations();
    
    // Refresh scripts specifically for SL page
    if (typeof updateDictionary === 'function') updateDictionary();
    if (typeof refreshAllSLLogs === 'function') refreshAllSLLogs();
    
    // Refresh Javascript-bound texts dynamically
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    const narrativeTextEl = document.getElementById('narrative-text');
    const actionBtn = document.getElementById('action-btn');
    
    if (typeof trainingBatch !== 'undefined') {
        if (trainingBatch === 0) {
            narrativeTextEl.textContent = dict['narrative_start'];
            actionBtn.textContent = dict['btn_action_step1'];
            
            const logEl = document.getElementById('move-history-log');
            if (logEl && logEl.classList.contains('history-placeholder')) {
                logEl.textContent = dict['log_waiting'];
            }
        } else if (trainingBatch === 1) {
            narrativeTextEl.innerHTML = dict['narrative_batch1'];
            actionBtn.textContent = dict['btn_action_step2'];
        } else if (trainingBatch === 2) {
            narrativeTextEl.innerHTML = dict['narrative_batch2'];
            actionBtn.textContent = dict['btn_action_mastered'];
        } else {
            narrativeTextEl.innerHTML = dict['narrative_mastered'];
            actionBtn.textContent = dict['btn_action_mastered'];
        }
    }
}

document.addEventListener('DOMContentLoaded', applySLTranslations);