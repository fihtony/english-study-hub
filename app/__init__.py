import os
from flask import Flask, render_template

app = Flask(
    __name__,
    template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
    static_folder=os.path.join(os.path.dirname(__file__), '..', 'static')
)

app.config['DEBUG'] = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
app.config['TESTING'] = os.environ.get('FLASK_TESTING', 'False').lower() == 'true'

@app.route('/')
def index():
    return render_template('index.html')
