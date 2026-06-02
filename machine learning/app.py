from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

GRID_SIZE = 5
ACTIONS = ['up', 'down', 'left', 'right']

def state_key(state):
    return f'{state[0]},{state[1]}'


def step(state, action):
    x, y = state
    if action == 'up':
        y = max(0, y - 1)
    elif action == 'down':
        y = min(GRID_SIZE - 1, y + 1)
    elif action == 'left':
        x = max(0, x - 1)
    elif action == 'right':
        x = min(GRID_SIZE - 1, x + 1)
    return x, y


def choose_action(state, q_table, epsilon):
    key = state_key(state)
    if random.random() < epsilon or key not in q_table:
        return random.choice(ACTIONS)
    return max(ACTIONS, key=lambda action: q_table[key].get(action, 0.0))


def train_q_learning(episodes, alpha, gamma, epsilon):
    q_table = {}
    history = []
    goal = (GRID_SIZE - 1, GRID_SIZE - 1)

    for _ in range(episodes):
        state = (0, 0)
        total_reward = 0.0
        steps = 0

        while state != goal and steps < 50:
            key = state_key(state)
            q_table.setdefault(key, {action: 0.0 for action in ACTIONS})
            action = choose_action(state, q_table, epsilon)
            next_state = step(state, action)
            reward = 10.0 if next_state == goal else -1.0
            total_reward += reward

            next_key = state_key(next_state)
            q_table.setdefault(next_key, {action: 0.0 for action in ACTIONS})
            best_next = max(q_table[next_key].values())
            q_table[key][action] += alpha * (reward + gamma * best_next - q_table[key][action])

            state = next_state
            steps += 1

        history.append(round(total_reward, 2))

    return q_table, history, goal


def simulate_agent(q_table, goal):
    state = (0, 0)
    path = [state]

    for _ in range(50):
        if state == goal:
            break
        key = state_key(state)
        action = max(ACTIONS, key=lambda a: q_table.get(key, {}).get(a, 0.0))
        state = step(state, action)
        path.append(state)
        if state == goal:
            break

    return path


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json() or {}
    episodes = int(data.get('episodes', 50))
    alpha = float(data.get('alpha', 0.5))
    gamma = float(data.get('gamma', 0.9))
    epsilon = float(data.get('epsilon', 0.2))

    q_table, history, goal = train_q_learning(episodes, alpha, gamma, epsilon)
    path = simulate_agent(q_table, goal)

    response = {
        'grid_size': GRID_SIZE,
        'path': [{'x': x, 'y': y} for x, y in path],
        'goal': {'x': goal[0], 'y': goal[1]},
        'reward_history': history,
        'explanation': {
            'agent': 'The agent starts in the grid and chooses moves. It learns from rewards instead of examples.',
            'reinforce': 'Each time the agent gets a reward, it remembers which actions were better. Good actions get stronger over time.',
            'goal': 'The agent wants to reach the goal. Positive rewards help it understand what to do.'
        }
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
