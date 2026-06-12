const sl_lang_zh = {
    "lang_btn": "English",
    "sl_title": "🔵 監督式學習遊樂場",
    "sl_subtitle": "觀看球體遵循老師提供的明確標籤指令！",

    //Button group
    "btn_sl_maze": "監督式迷宮",
    "btn_switch_rl": "切換至強化學習",
    "stat_training": "訓練批次:",
    "btn_action_step1": "提供標籤 (第 1 步)",
    "btn_action_step2": "提供標籤 (第 2 步)",
    "btn_action_mastered": "執行完整測試 (已精通)",
    "btn_reset": "重置模擬",

    //Narrative Text
    "narrative_start": "球體需要一位老師。點擊「提供標籤」來餵給它第一批字卡。",
    "narrative_batch1": "📝 <strong>第 1 步：</strong>球體被教導了「向右」和「向下」的意義。它也學會了<strong>泛化</strong>相似的形狀（例如將 '⇨' 視為向右，'⇓' 視為向下）。它會一直移動，直到看見未知的形狀而停下。",
    "narrative_batch2": "📝 <strong>第 2 步：</strong>球體被教導了「向左」和「向上」。它也學會了<strong>泛化</strong>相似的形狀（例如將 '⇐' 視為向左，'⇑' 視為向上）。它現在對每個特徵都有了標籤，並成功抵達終點！",
    "narrative_mastered": "🏆 <strong>已精通：</strong>監督式模型完美地遵循了它獲得的標籤！",
    
    //Teacher's Vocabulary Dictionary
    "dict_title": "📖 機械的詞彙字典",
    "dict_desc": "人類提供的答案，將符號與方向關聯起來：",
    "feat_up": "⬆️ 特徵 '↑'",
    "feat_right": "➡️ 特徵 '→'",
    "feat_down": "⬇️ 特徵 '↓'",
    "feat_left": "⬅️ 特徵 '←'",
    "lbl_none": "未提供標籤",
    "lbl_up": "分配標籤：向上",
    "lbl_right": "分配標籤：向右",
    "lbl_down": "分配標籤：向下",
    "lbl_left": "分配標籤：向左",
    
    //Execution Log
    "log_title": "📋 步驟執行日誌",
    "log_waiting": "等待老師的標籤...",
    "log_step0": "[第 0 步] 從 (0,0) 出發 → 準備讀取標籤",
    "log_error": "⚠️ 錯誤：遇到未知的 '←' 特徵。模擬已停止。",
    "gen_right": " (泛化為向右)",
    "gen_down": " (泛化為向下)",
    "gen_left": " (泛化為向左)",
    "gen_up": " (泛化為向上)",
    "log_moved": "移動 {coord}{gen}",
    "log_goal": "移動 {coord} → 抵達終點！",
    "log_format": "[第 {step} 步] 讀取 '{arrow}' 特徵 → {actionLog}",
    
    // Educational Section Content
    "edu_title": "🧠 小球是如何學習的？",
    "edu_subtitle": "球透過特徵學習，學習箭頭的形狀。",
    "edu_subtitle2": "就像學生在學校一樣，小球透過老師提供的直接例子（標籤）來學習。讓我們一起來看看它的記憶圖譜吧！",
    "edu_step1_title": "🌱 第一步：認識「向右」與「向下」",
    "edu_step1_desc": "老師先幫「向右 (→)」和「向下 (↓)」的箭頭加上標籤。小球會把它們記在腦袋裡！",
    "edu_step1_desc2": "泛化: 球還能巧妙地學習跟隨每一個相似的配對箭頭 ⇨ ⇓ ⇐ ⇑ !",
    "edu_step2_title": "🌿 第二步：學習「向左」與「向上」",
    "edu_step2_desc": "接著，老師加入了「向左 (←)」和「向上 (↑)」的標籤。小球迅速擴展它的記憶地圖，把這些全新的方向也全部安全地記了下來！",
    "edu_step3_title": "🏆 第三步：全能大師解鎖",
    "edu_step3_desc": "當 4 種方向的箭頭都完美保存在大腦記憶中後，小球就能百分之百看懂整張迷宮地圖，順暢無阻地直接衝向終點贏得勝利！",

    //Compare Section
    "comp_title": "📚 監督式 vs. 強化學習",
    "comp_subtitle": "這兩大人工智慧技術有什麼差異？",
    "comp_sl_title": "📘 監督式學習 (特徵與標籤)",
    "comp_sl_p1": "<strong>監督式學習</strong>就像用字卡學習。我們直接給電腦標準答案。",
    "comp_sl_p2": "AI 會觀察<strong>特徵</strong>（畫在地上的箭頭形狀）並將其對應到直接的<strong>標籤</strong>（向右移動的指令）。因為直接獲得了答案，它的學習速度極快，但如果看到還沒學過的形狀，它就會完全卡住！",
    "comp_rl_title": "🎯 強化學習 (獎勵)",
    "comp_rl_p1": "<strong>強化學習</strong>就像訓練小狗。沒有標準答案。",
    "comp_rl_p2": "AI 會盲目地四處走動並依賴<strong>獎勵</strong>（走對得 +10 分，走錯扣 10 分）。它嚴格透過多個回合的<strong>試錯</strong>來學習，直到建立出一條能獲得最高分數的路徑。",
    
    //Compare Table
    "th_core": "核心面向",
    "th_sl": "🔵 監督式學習",
    "th_rl": "🔴 強化學習",

    "tr1_title": "核心目標",
    "tr1_sl": "遵循明確的真實<strong>標籤</strong>",
    "tr1_rl": "最大化環境<strong>獎勵</strong>（分數）",

    "tr2_title": "「老師」的角色",
    "tr2_sl": "由人類明確提供直接正確的答案",
    "tr2_rl": "由動態環境提供延遲的回饋",

    "tr3_title": "當異常發生時",
    "tr3_sl": "它會卡住。無法在沒有已知標籤的情況下解決狀態。",
    "tr3_rl": "暫時失去分數，探索其他替代路徑以進行最佳化。"
};