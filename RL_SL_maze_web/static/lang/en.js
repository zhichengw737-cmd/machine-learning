const lang_en = {
    "lang_btn": "繁體中文", // Button text shows the *other* language
    "title": "🔴 Reinforcement Learning Playground",
    "subtitle": "Watch the ball decode the structural guiding arrows step-by-step!",
    
    "btn_maze1": "Maze 1 (Learning)",
    "btn_maze2": "Maze 2 (Mastered)",
    "btn_switch_sl": "Switch to Supervised Learning",
    "stat_training": "Training Attempt:",
    
    //Dynamic Action Button Steps
    "btn_train_step1": "Train & Run (Step 1)",
    "btn_train_step2": "Train & Run (Step 2)",
    "btn_train_step3": "Train & Run (Step 3)",
    "btn_train_step4": "Train & Run (Step 4)",
    "btn_train_final": "Train & Run (Final Step)",
    "btn_run_mastered": "Run Maze 1 (Mastered)",
    "btn_run_maze2": "Run Maze",

    "btn_reset": "Reset Simulation",

    // Dynamic Simulation Narratives
    "narrative_start": "The ball sees arrows on the ground but has no idea what they mean. Click 'Train & Run' to start its journey.",
    "narrative_step1": "🔍 Result: The ball made its first tentative moves but quickly hit a wall pattern. I have only {points} points.",
    "narrative_step2": "🔍 Result: The ball explores alternative directions but is still failing to interpret the path. Total: {points} points.",
    "narrative_step3": "🔍 Result: The ball is beginning to observe correlations between arrows and walls. I should have more points, but I only have {points} points. I must go to the wrong way.",
    "narrative_step4": "💡 Result: The ball is starting to grasp arrow orientations relative to paths. I get {points} points. I almost find the way!",
    "narrative_step5": "🏆 Result: Knowing the arrows' meaning! It unlocked the map key and reached the endpoint! I get {points} points.",
    "narrative_maze2": "🚀 Flawless! Because the ball already knows the meaning of arrows, it clears Maze 2 smoothly on its first attempt!",
    "narrative_reset": "The ball forgot everything! The whole simulation has been reset.",
    
    //AI's Internal Dictionary
    "dict_title": "🧠 AI's Internal Dictionary",
    "dict_subtitle": "What the ball currently thinks about the symbols:",
    "arrow_symbol": "Arrow Symbol",
    "current_opinion_title": "AI's current Interpretation / Opinion",

    //Opinions (Stages 0 to 5)
    "opinion_0_up": "Unrecognized pattern",
    "opinion_0_right": "Unrecognized pattern",
    "opinion_0_down": "Unrecognized pattern",
    "opinion_0_left": "Unrecognized pattern",

    "opinion_1_2_up": "Just a wall pattern?",
    "opinion_1_2_right": "Environmental static noise",
    "opinion_1_2_down": "Meaningless barrier shape",
    "opinion_1_2_left": "Ignoring wall icons",

    "opinion_3_up": "It should have some meaning.",
    "opinion_3_right": "Slightly correlates with right turn near walls",
    "opinion_3_down": "Might mean: Follow barrier downwards?",
    "opinion_3_left": "Seems to imply leftward opening",

    "opinion_4_up": "High Probability: Navigate Up",
    "opinion_4_right": "Strong correlation with corridor turning Right",
    "opinion_4_down": "High Probability: Navigate Down",
    "opinion_4_left": "Strong correlation with corridor turning Left",

    "opinion_5_up": "Confirmed: Move UP ⬆️",
    "opinion_5_right": "Confirmed: Move RIGHT ➡️",
    "opinion_5_down": "Confirmed: Move DOWN ⬇️",
    "opinion_5_left": "Confirmed: Move LEFT ⬅️",

    //Reward Dashboard
    "reward_title": "🎯 Reward Dashboard",
    "reward_lbl_total": "Total Reward Points:",
    "reward_th_action": "Move & Reward History:",
    "reward_waiting": "Waiting for simulation...",
    "reward_start": "Start at",
    "reward_moved": "Moved to",
    "reward_total_pts": "Total",
    "reward_pts": "pts"
    
};