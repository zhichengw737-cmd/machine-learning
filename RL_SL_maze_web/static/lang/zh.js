const lang_zh = {
    "lang_btn": "English",
    "title": "🔴 強化學習遊樂場",
    "subtitle": "觀看球體逐步解碼結構引導箭頭！",

    "btn_maze1": "迷宮 1 (學習中)",
    "btn_maze2": "迷宮 2 (已精通)",
    "btn_switch_sl": "切換至監督式學習",
    "stat_training": "訓練次數:",

    //上方導航與 UI 控制項
    "btn_train_step1": "訓練與執行 (第 1 步)",
    "btn_train_step2": "訓練與執行 (第 2 步)",
    "btn_train_step3": "訓練與執行 (第 3 步)",
    "btn_train_step4": "訓練與執行 (第 4 步)",
    "btn_train_final": "訓練與執行 (最後一步)",
    "btn_run_mastered": "執行迷宮 1 (已精通)",
    "btn_run_maze2": "執行迷宮",

    "btn_reset": "重置模擬",

    //動態模擬敘事文本
    "narrative_start": "球體看到地上的箭頭，但完全不知道它們代表什麼。點擊「訓練與執行」開始它的旅程。",
    "narrative_step1": "🔍 結果：球體進行了第一次嘗試，但很快就撞到了牆壁模式。我只有 {points} 分。",
    "narrative_step2": "🔍 結果：球體探索了其他方向，但仍舊未能成功解讀路徑。總分：{points} 分。",
    "narrative_step3": "🔍 結果：球體開始觀察箭頭與牆壁之間的關聯。我應該得到更多分數，但我只有 {points} 分。我一定是走錯路了。",
    "narrative_step4": "💡 結果：球體開始掌握走廊與箭頭方向的關係。我得到 {points} 分。我快要找到路了！",
    "narrative_step5": "🏆 結果：理解了箭頭的含義！解鎖了地圖關鍵路徑並到達終點！我得到 {points} 分。",
    "narrative_maze2": "🚀 完美無瑕！因為球體已經知道箭頭的含義，它在第一次嘗試中便流暢地通過了迷宮 2！",
    "narrative_reset": "球體忘記了一切！整個模擬已重置。",

    //AI 內部字典見解矩陣 (階段 0 至 5)
    "dict_title": "🧠 AI 內部字典",
    "dict_subtitle": "球體目前對這些符號的理解：",
    "arrow_symbol": "箭頭符號",
    "current_opinion_title": "AI 目前的解讀/觀點",
    
    //AI 內部字典見解矩陣 (階段 0 至 5)
    "opinion_0_up": "未識別的模式",
    "opinion_0_right": "未識別的模式",
    "opinion_0_down": "未識別的模式",
    "opinion_0_left": "未識別的模式",

    "opinion_1_2_up": "只是牆壁圖案？",
    "opinion_1_2_right": "環境靜態雜訊",
    "opinion_1_2_down": "毫無意義的障礙物形狀",
    "opinion_1_2_left": "忽略牆壁圖標",

    "opinion_3_up": "它應該有某種意義。",
    "opinion_3_right": "與牆壁附近的右轉略有相關",
    "opinion_3_down": "可能代表：跟隨障礙物向下？",
    "opinion_3_left": "似乎暗示向左的開口",

    "opinion_4_up": "高機率：向上導航",
    "opinion_4_right": "與走廊右轉有強烈相關",
    "opinion_4_down": "高機率：向下導航",
    "opinion_4_left": "與走廊左轉有強烈相關",

    "opinion_5_up": "已確認：向上移動 ⬆️",
    "opinion_5_right": "已確認：向右移動 ➡️",
    "opinion_5_down": "已確認：向下移動 ⬇️",
    "opinion_5_left": "已確認：向左移動 ⬅️",

    //獎勵儀表板
    "reward_title": "🎯 獎勵儀表板",
    "reward_lbl_total": "總獎勵積分",

    //移動與獎勵歷史
    "reward_th_action": "移動軌跡:",
    "reward_waiting": "等待模擬啟動...",
    //"reward_start": "從...出發",
    //"reward_pts": "分",
    "log_standard": "[第 {step} 步] 從 ({from}) 出發，移動至 ({coords})，增加 1 分，總計 {points} 分",
    "log_backtrack": "[第 {step} 步] 回到 ({from})，{text} 扣除 1 分，總計 {points} 分",
    "log_goal": "[第 {step} 步] 移動至 {coords} → 🎉 抵達終點！(+100 分) | 總計: {points} 分",

    //education section
    "edu-title": "🧠 球的「大腦」究竟是如何運作的？",
    "edu-subtitle": "在人工智慧中，我們使用 4 個秘密規則來幫助小球學習。以下是它們在我們的迷宮遊戲中的含義",

    //education section
    "edu-title": "🧠 球體的「大腦」究竟是如何運作的？",
    "edu-subtitle": "在 AI 中，我們使用 4 個神秘規則來幫助球體學習。以下是它們在我們的迷宮遊戲中所代表的意義：",
    "edu_rl_title": "🤖 什麼是強化學習 (RL)？",
    "edu_rl_desc": `想像一下你在玩一款全新的電子遊戲，但<strong>螢幕完全是黑的</strong>，而且<strong>沒有人告訴你規則</strong>！ <br><br>
                    獲勝的唯一方法就是四處走走、按下按鈕，看看會發生什麼事。當你聽到一聲 <em>\"叮！\"</em> 並<strong>獲得分數（獎勵）</strong>時，你會想：<strong>嘿，我應該再做一次！</strong>。 
                    <br>` +
                    `當你聽到一聲 <em>\"嗶！\"</em> 並<strong>失去分數</strong>時，你會想：<strong>「噢，下次最好避開這個！」</strong>。`,

    "edu_rl_desc2": `這正是 <strong>強化學習</strong> 的本質！ <br>` +
                    `這是一種 AI 學習類型，我們不給球體地圖，也不告訴它該做什麼。相反地，球體完全透過<strong>試錯（錯誤嘗試）</strong>來學習——<strong>從好的移動中獲得獎勵，從壞的移動中獲得懲罰</strong>，直到它發現完美的最佳路徑。`,
    
    "edu_parameters_title": "🎛️ 4 個神秘的調校旋鈕（參數）：",
    
    //episode card
    "edu_episodes_title": "🎮 1. Episodes (回合)",
    "edu_episodes_analogy": `「電子遊戲回合」`,
    "edu_episodes_desc": `把一個 <strong>Episode（回合）</strong>想像成<strong>遊戲中的 1 次挑戰</strong>。它從球體位於起點的那一刻開始，並在它完全迷路或成功到達終點時結束！ <br><br>` +
                        `每當你點擊「訓練與執行」時，你就在開始<strong>一個全新的回合</strong>，看看球體在這一輪是否能表現得更好。 <br><br>` + 
                        `在這個迷宮遊戲中，共有 <strong>5 個回合</strong>來訓練球體。隨著每個回合的進行，它會對箭頭的含義以及如何更接近終點有更多的了解！`,

    //alpha card
    "edu_alpha_title": "🧪 2. Alpha (學習率)",
    "edu_alpha_analogy": `「記憶力強度」`,
    "edu_alpha_desc": `<strong>Alpha</strong> 是 <strong>學習率</strong> <br> `+
                        `它決定了球體學習新步驟的速度有多快。 <br> <br>` +
                        `<strong>高 Alpha</strong>：<br>`+
                        `球體只關心它的<strong>最後一步</strong>，並忘記以前學到的東西。<br><br>` +
                        `<strong>低 Alpha</strong>：<br>`+
                        `球體學習緩慢，更關心它<strong>先前的步驟</strong>，但需要更多時間來學習最後一步。<br><br>`+
                        `什麼是最理想的值？ <br>`+
                        `<strong>每個模型都不同！需要測試非常多次才能找到它。</strong> <br><br>` +
                        `通常情況下，範圍是 10<sup>-5</sup> 到 10<sup>-3</sup>。`,
    
    //gamma card
    "edu_gamma_title": "👓 3. Gamma (γ) (折扣因子)",
    "edu_gamma_analogy": `「遠見望遠鏡」`,
    "edu_gamma_desc":` <strong>Gamma</strong> 控制球體有多看重未來的獎勵。
                        <br><br>` +
                        `<strong>低 Gamma</strong>：<br>`+ 
                        `球體只關心尋找眼前<strong>近在咫尺</strong>、能快速獲得的 +10 分（獎勵）。<br><br>` +
                        `<strong>高 Gamma</strong>：<br>` + 
                        `球體佩戴了一副神奇的望遠鏡，讓它能夠<strong>望向路徑的遠方</strong>，去尋找隱藏在最尾端巨大的 +100 分（終點獎勵）。<br>` +
                        `高 Gamma 值能幫助 AI 提早做好長遠規劃！`,

    // Epsilon Card
    "edu_epsilon_title": "🧭 4. Epsilon (ε) (探索率)",
    "edu_epsilon_analogy": `「好奇心量表」`,
    "edu_epsilon_desc": `<strong>Epsilon</strong> 決定了球體在多大程度上會去探索未知的新動作，而不是一味使用已知的經驗。<br><br>` +
                        `<strong>高 Epsilon</strong>：<br>` + 
                        `球體就像一個狂熱的探險家，完全忽視已知的路徑，去嘗試瘋狂的新方向並尋找隱藏的秘密。<br><br> `+
                        `<strong>低 Epsilon</strong>：<br>`+ 
                        `球體會說 <em>「安全第一！」</em> 並嚴格遵循它已經信任的路徑，以保險的方式安全通關。`,
};