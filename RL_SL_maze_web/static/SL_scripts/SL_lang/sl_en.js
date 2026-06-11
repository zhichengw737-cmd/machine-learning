const sl_lang_en = {
    "lang_btn": "繁體中文",
    "sl_title": "🔵 Supervised Learning Playground",
    "sl_subtitle": "Watch the ball follow explicitly labeled instructions from a Teacher!",

    //Button group
    "btn_sl_maze": "Supervised Maze",
    "btn_switch_rl": "Switch to Reinforcement Learning",
    "stat_training": "Training Batch:",
    "btn_action_step1": "Provide Labels (Step 1)",
    "btn_action_step2": "Provide Labels (Step 2)",
    "btn_action_mastered": "Run Full Test (Mastered)",
    "btn_reset": "Reset Simulation",

    //Narrative Text
    "narrative_start": "The ball needs a teacher. Click \"Provide Labels\" to feed it its first batch of flashcards.",
    "narrative_batch1": "📝 <strong>Step 1:</strong> The ball is taught what Right & Down mean. It also learned to <strong>generalize</strong> similar shapes (like treating '⇨' as Right, '⇓' as Down). It moves until it sees an unknown shape and stops.",
    "narrative_batch2": "📝 <strong>Step 2:</strong> The ball is taught Left & Up. It also learned to <strong>generalize</strong> similar shapes (like treating '⇐' as Left, '⇑' as Up). It now has a label for every feature and reaches the goal!",
    "narrative_mastered": "🏆 <strong>Mastered:</strong> The Supervised Model perfectly follows its given labels!",
    
    //Teacher's Vocabulary Dictionary
    "dict_title": "📖 The Machine's Vocabulary Dictionary",
    "dict_desc": "Human-provided answers correlating symbols to directions:",
    "feat_up": "⬆️ Feature '↑'",
    "feat_right": "➡️ Feature '→'",
    "feat_down": "⬇️ Feature '↓'",
    "feat_left": "⬅️ Feature '←'",
    "lbl_none": "No Label Provided",
    "lbl_up": "Assigned Label: UP",
    "lbl_right": "Assigned Label: RIGHT",
    "lbl_down": "Assigned Label: DOWN",
    "lbl_left": "Assigned Label: LEFT",

    //Execution Log
    "log_title": "📋 Step Execution Log",
    "log_waiting": "Waiting for teacher's labels...",
    "log_step0": "[Step 0] Start at (0,0) → Ready to read labels",
    "log_error": "⚠️ ERROR: Encountered unknown '←' feature. Simulation stopped.",
    "gen_right": " (Generalized to Right)",
    "gen_down": " (Generalized to Down)",
    "gen_left": " (Generalized to Left)",
    "gen_up": " (Generalized to Up)",
    "log_moved": "Moved {coord}{gen}",
    "log_goal": "Moved {coord} → Goal Reached!",
    "log_format": "[Step {step}] Read '{arrow}' feature → {actionLog}",

    //Compare Section
    "comp_title": "📚 Supervised vs. Reinforcement Learning",
    "comp_subtitle": "What is the difference between these two major AI technologies?",
    "comp_sl_title": "📘 Supervised Learning (Features & Labels)",
    "comp_sl_p1": "<strong>Supervised Learning</strong> is like learning with flashcards. We give the computer the exact answer key.",
    "comp_sl_p2": "The AI looks at a <strong>Feature</strong> (the shape of the arrow drawn on the ground) and maps it to a direct <strong>Label</strong> (the instruction to move Right). Because it is given the answers directly, it learns incredibly fast, but it gets completely stuck if it sees a shape it hasn't been taught yet!",
    "comp_rl_title": "🎯 Reinforcement Learning (Rewards)",
    "comp_rl_p1": "<strong>Reinforcement Learning</strong> is like training a puppy. There is no answer key.",
    "comp_rl_p2": "The AI walks around blindly and relies on <strong>Rewards</strong> (+10 points for a good move, -10 for a bad one). It learns strictly through <strong>trial and error</strong> over many episodes until it builds a path that gives it the highest possible score.",
    
    //Compare Table
    "th_core": "Core Dimension",
    "th_sl": "🔵 Supervised Learning",
    "th_rl": "🔴 Reinforcement Learning",

    "tr1_title": "Core Objective",
    "tr1_sl": "Follows explicit ground-truth <strong>labels</strong>",
    "tr1_rl": "Maximizes environmental <strong>rewards</strong> (points)",

    "tr2_title": "The \"Teacher\" Role",
    "tr2_sl": "A human explicitly provides direct correct answers",
    "tr2_rl": "The dynamic environment provides delayed feedback feedback",

    "tr3_title": "When an Anomaly Occurs",
    "tr3_sl": "It gets stuck. It cannot resolve states without a known label.",
    "tr3_rl": "Loses points temporarily, explores alternative paths to optimize."
};