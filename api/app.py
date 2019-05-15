from flask import Flask
from flask import jsonify
from flask_cors import CORS
from spotify import Spotify
from googlecloud import GoogleAPI
from analyze import Analyzer

app = Flask(__name__)
CORS(app)

spotify = Spotify()
googleAPI = GoogleAPI()
analyzer = Analyzer()

TEXT_LIMIT = 1000

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
    if len(text) <= 0:
        error = {'errorMessage': 'There is no text'}
        return jsonify(error)
    elif len(text) > TEXT_LIMIT:
        error = {'errorMessage': 'Too many characters'}
        return jsonify(error)
    else:
        return jsonify(googleAPI.text_to_speech(text))


@app.route('/api/music/song')
def song():
    return analyzer.song()


@app.route('/api/music/smartsong/<text>')
def smart_song(text):
    return jsonify(analyzer.smart_song(text))


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
