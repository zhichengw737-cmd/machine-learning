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
    "log_standard": "[第 {step} 步] 從 ({from}) 出發，移動至 ({coords})，增加 1 分，總計 {points} 分",
    "log_backtrack": "[第 {step} 步] 移動至 ({from})，{text} 扣除 1 分，總計 {points} 分"

};