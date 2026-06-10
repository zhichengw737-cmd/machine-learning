// Check if user has a saved language, otherwise default to English
window.currentLang = localStorage.getItem('appLang') || 'en';

function applyTranslations() {
    // Select the correct dictionary
    const dict = window.currentLang === 'en' ? lang_en : lang_zh;
    
    // 1. Update all HTML elements that have a data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });
    
    // 2. Update the language switch button text
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) langBtn.textContent = dict['lang_btn'];
}

function toggleLanguage() {
    // Swap language and save to browser memory
    window.currentLang = window.currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem('appLang', window.currentLang);
    
    // Re-render the page texts
    applyTranslations();
    
    // If you have active Javascript text (like the dictionary opinions), force them to re-render:
    if (typeof updateOpinionTable === 'function') updateOpinionTable();
}

// Run the translation immediately when the page loads
document.addEventListener('DOMContentLoaded', applyTranslations);