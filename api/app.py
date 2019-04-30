from flask import Flask
from flask import jsonify
from flask_cors import CORS
from spotify import Spotify
from googlecloud import GoogleAPI

app = Flask(__name__)
CORS(app)

spotify = Spotify()
googleAPI = GoogleAPI()


@app.route('/api/weather')
def weather():
    data = {
        'description': 'Sunny, 100F (mock)'
    }
    return jsonify(data)


@app.route('/api/music/browse/categories/<category>')
def music_category(category):
    return jsonify(spotify.browse_category(category))


@app.route('/api/text_to_speech/<text>')
def speech_mp3(text):
    return jsonify(googleAPI.text_to_speech(text))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
