window.currentSLLang = localStorage.getItem('appLang') || 'en';

function applySLTranslations() {
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    
    const elements = document.querySelectorAll('[data-i18n]');
    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    }
    
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) langBtn.textContent = dict['lang_btn'];
}

function refreshAllSLLogs() {
    if (typeof updateSLLogItem === 'function') {
        const items = document.querySelectorAll('.history-log-item');
        for (let i = 0; i < items.length; i++) {
            updateSLLogItem(items[i]);
        }
    }
}

function toggleSLLanguage() {
    window.currentSLLang = window.currentSLLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('appLang', window.currentSLLang);
    
    applySLTranslations();
    
    if (typeof updateDictionary === 'function') {
        if (knownDirections['UP']) updateDictionary('UP');
        if (knownDirections['RIGHT']) updateDictionary('RIGHT');
        if (knownDirections['DOWN']) updateDictionary('DOWN');
        if (knownDirections['LEFT']) updateDictionary('LEFT');
        if (taughtCount === 0) updateDictionary(null);
    }
    if (typeof refreshAllSLLogs === 'function') refreshAllSLLogs();
    
    const dict = window.currentSLLang === 'en' ? sl_lang_en : sl_lang_zh;
    const narrativeTextEl = document.getElementById('narrative-text');
    
    if (taughtCount === 0) {
        narrativeTextEl.innerHTML = dict['narrative_start'];
        const logEl = document.getElementById('move-history-log');
        if (logEl && logEl.classList.contains('history-placeholder')) {
            logEl.innerHTML = dict['log_waiting'];
        }
    }
}

document.addEventListener('DOMContentLoaded', applySLTranslations);