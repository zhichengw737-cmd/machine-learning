# Reinforcement Learning Playground for Middle School

This project is a small interactive website that helps middle school students understand reinforcement learning.
It provides a playful grid-world where a ball (agent) moves to a goal and learns from rewards.

## What is included

- `templates/index.html` - interactive website with the RL playground
- `static/style.css` - page styling and animations
- `static/script.js` - client-side RL logic, drag animation, and training
- `requirements.txt` - Flask dependency for serving the page
- `app.py` - minimal Flask app (serves the page; RL runs client-side)

## Run the project

1. Open a terminal in `machine learning`
2. Create and activate a virtual environment (optional but recommended):
   - Windows PowerShell:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Start the website:
   ```powershell
   python app.py
   ```
5. Open your browser at `http://127.0.0.1:5000`

## How it works

- The page shows a grid with a draggable ball (agent), a goal square, and optional obstacles you can toggle by clicking cells.
- Students can move the ball manually, or run a simple Q-learning training in the browser and then watch the learned greedy path.
- The UI includes smooth animations and visual feedback to make the learning concepts vivid and engaging.

If you want, I can further polish the visuals, add a reward/loss chart, or export training results.
