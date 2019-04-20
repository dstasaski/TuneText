from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/weather')
def hello_world():
    data = {}
    data['description'] = 'Sunny, 100F (mock)'
    return jsonify(data)

