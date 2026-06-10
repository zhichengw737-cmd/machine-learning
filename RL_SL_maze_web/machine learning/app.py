from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')


# route to handle supervised learning page
@app.route('/supervised.html')
def supervised():
    return render_template('supervised.html')

if __name__ == '__main__':
    app.run(debug=True)
