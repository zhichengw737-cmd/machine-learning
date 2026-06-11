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

    //Move & Reward History
    "reward_th_action": "Move & Reward History:",
    "reward_waiting": "Waiting for simulation...",
    //"reward_start": "Start at",
    //"reward_pts": "pts",
    "log_standard": "[Step {step}] Start from ({from}), move to ({coords}), add 1 point, total {points} points",
    "log_backtrack": "[Step {step}] Move back to ({from}), {text} minus 1 point total {points} points",
    "log_goal": "[Step {step}] Moved to {coords} → 🎉 Goal Reached! (+100 pts) | Total: {points} pts",

    //education section
    "edu-title": "🧠 How Does the Ball's Brain Actually Work?",
    "edu-subtitle": "In AI, we use 4 secret rules to help the ball learn. Here is what they mean in our maze game",
    "edu_rl_title": "🤖 What is Reinforcement Learning (RL)?",
    "edu_rl_desc": `Imagine you are playing a brand-new video game, but the <strong>screen is completely black</strong>, and <strong>nobody told you the rules</strong>! <br><br>
                    The only way to win is to walk around, press buttons, and see what happens. When you hear a <em>"Ding!"</em> and <strong>get points (rewards) </strong>, you think, <strong>Hey, I should do that again!</strong>. 
                    <br>` +
                    `When you hear a <em>"Buzz!"</em> and <strong>lose points</strong>, you think, <strong>"Oops, better avoid that!"</strong>.`,

    "edu_rl_desc2": `That is exactly what <strong>Reinforcement Learning</strong> is! <br>` +
                    `It is a type of AI learning where we don't give the ball a map or tell it what to do. Instead, the ball learns completely by <strong>trial and error</strong>—<strong>getting rewards for good moves and penalties for bad ones</strong> until it discovers the perfect path.`,
    
    "edu_parameters_title": "🎛️ The 4 Secret Tuning Knobs (Parameters):",
    
    //episode card
    "edu_episodes_title": "🎮 1. Episodes",
    "edu_episodes_analogy": `The "Video Game Rounds"`,
    "edu_episodes_desc": `Think of an <strong>Episode</strong> as <strong>1 challenge of a game</strong>. It starts the moment the ball is at the beginning, and ends when it either gets completely lost or successfully reaches the goal! <br><br>` +
                        `Every time you click "Train & Run", you are starting <strong>a brand new episode</strong> to see if the ball can do better this round. <br><br>` + 
                        `In this maze game, there are <strong>5 Episodes</strong> to train the ball. With each episode, it learns a little more about what the arrows mean and how to get closer to the goal!`,

    //alpha card
    "edu_alpha_title": "🧪 2. Alpha ",
    "edu_alpha_analogy": `The "Memory Power"`,
    "edu_alpha_desc": `<strong>Alpha</strong> is the <strong>learning rate</strong> <br> `+
                        `It decides How fast the ball learn new steps. <br> <br>` +
                        `<strong>High Alpha</strong>: <br>`+
                        `The ball only cares about its <strong>last step</strong> and forgets what it learned before.<br><br>` +
                        `<strong>Low Alpha</strong>: <br>`+
                        `The ball learns slowly, care more about its <strong>previous steps</strong> but need more time to learn the last step.<br><br>`+
                        `What is the optimal value? <br>`+
                        `<strong>Every model is different! Need to test so many times to find it.</strong> <br><br>` +
                        `In normal, the range is 10<sup>-5</sup> to 10<sup>-3</sup>.`,
    
    //gamma card
    "edu_gamma_title": "👓 3. Gamma (γ)",
    "edu_gamma_analogy": `The "Future-Vision Telescope"`,
    "edu_gamma_desc":` <strong>Gamma</strong> controls how much the ball values future rewards.
                        <br><br>` +
                        `<strong>Low Gamma</strong>: <br>`+ 
                        `The ball only care about finding a quick +10 points (reward) right <strong>in front of its face</strong>.<br><br>` +
                        `<strong>High Gamma</strong>:<br>` + 
                        `The ball wear magic telescope that let it <strong>look far down the path</strong> to hunt for the massive +100 point (reward) at the very end. <br>` +
                        `High Gamma helps the AI plan ahead!`,

    // Epsilon Card
    "edu_epsilon_title": "🧭 4. Epsilon (ε)",
    "edu_epsilon_analogy": `The "Curiosity Meter"`,
    "edu_epsilon_desc": `<strong>Epsilon</strong> decides how much the ball will explore new actions instead of using known ones. <br><br>` +
                        `<strong>High Epsilon</strong>: <br>` + 
                        `The ball acts like a wild explorer, ignoring what it already knows to try crazy new directions and look for secrets.<br><br> `+
                        `<strong>Low Epsilon</strong>:  <br>`+ 
                        `The ball says <em>"I'm playing it safe!"</em> and strictly follows the path it already trusts to finish the map safely.`,

};