from flask import Flask
from flask import jsonify
from flask_cors import CORS
from spotify import Spotify

app = Flask(__name__)
CORS(app)


@app.route('/api/weather')
def weather():
    data = {
        'description': 'Sunny, 100F (mock)'
    }
    return jsonify(data)


@app.route('/api/music/browse/categories/<category>')
def music_category(category):
    spot = Spotify()
    return jsonify(spot.browse_category(category))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
