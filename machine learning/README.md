# Machine Learning for Middle School

This project is a small interactive website that helps middle school students understand reinforcement learning.
It uses Python and Flask to simulate a simple reward-based agent learning to reach a goal in a grid world.

## What is included

- `app.py` - Flask application and Python Q-learning simulation
- `templates/index.html` - interactive website with explanations and controls
- `static/style.css` - page styling
- `static/script.js` - client-side logic for interaction and drawing
- `requirements.txt` - needed Python package

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

- The website shows a simple explanation of machine learning.
- Users can change the number of points, noise, training steps, and learning rate.
- The Python backend creates example points and trains a straight-line model with gradient descent.
- The site draws the examples and the learned line so students can see how training changes the model.
