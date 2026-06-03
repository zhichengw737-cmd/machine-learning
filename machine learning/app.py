from flask import Flask, render_template, request, jsonify
import random
import statistics

app = Flask(__name__)


def generate_points(n_points, noise, true_m=2.0, true_b=1.0):
    points = []
    for _ in range(n_points):
        x = random.random()
        y = true_m * x + true_b + random.gauss(0, noise)
        points.append((x, y))
    return points


def train_linear_regression(points, epochs, lr):
    # Simple batch gradient descent for y = m*x + b
    m = 0.0
    b = 0.0
    n = len(points)
    history = []

    for _ in range(epochs):
        dm = 0.0
        db = 0.0
        mse = 0.0
        for x, y in points:
            y_pred = m * x + b
            err = y - y_pred
            mse += err * err
            dm += -2 * x * err
            db += -2 * err

        mse = mse / n
        # gradients averaged
        dm /= n
        db /= n

        # update
        m -= lr * dm
        b -= lr * db

        history.append(round(mse, 6))

    return m, b, history


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json() or {}
    n_points = int(data.get('points', 20))
    noise = float(data.get('noise', 0.1))
    epochs = int(data.get('epochs', 100))
    lr = float(data.get('lr', 0.1))

    true_m = 2.0
    true_b = 1.0
    points = generate_points(n_points, noise, true_m=true_m, true_b=true_b)
    m, b, loss_history = train_linear_regression(points, epochs, lr)

    response = {
        'points': [{'x': round(x, 4), 'y': round(y, 4)} for x, y in points],
        'fitted': {'m': round(m, 4), 'b': round(b, 4)},
        'true': {'m': true_m, 'b': true_b},
        'loss_history': loss_history,
        'explanation': {
            'what': 'This demo fits a straight line y = m*x + b to noisy sample points using gradient descent.',
            'how': 'The program updates parameters m and b to reduce mean squared error between the line and points.',
            'try': 'Increase points and epochs to get a better fit; increase noise to make the task harder.'
        }
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
