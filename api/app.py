from flask import Flask
from flask import jsonify
from flask_cors import CORS
from googlecloud import GoogleAPI
from analyze import Analyzer
from gevent.pywsgi import WSGIServer
import os

app = Flask(__name__)
CORS(app)

googleAPI = GoogleAPI()
analyzer = Analyzer()

TEXT_LIMIT = 1000


@app.route('/api/text_to_speech/<text>')
def speech_mp3(text):
    if len(text) <= 0:
        error = {'errorMessage': 'There is no text'}
        return jsonify(error), 400
    elif len(text) > TEXT_LIMIT:
        error = {'errorMessage': 'Too many characters'}
        return jsonify(error), 400
    else:
        return jsonify(googleAPI.text_to_speech(text))


@app.route('/api/music/song/<songID>')
def song(songID):
    song = analyzer.song(songID)
    if song is not None:
        return analyzer.song(songID)
    else:
        return jsonify({'error': 'bad song path'}), 400


@app.route('/api/music/smartsong/<text>')
def smart_song(text):
    if len(text) <= 0:
        error = {'errorMessage': 'There is no text'}
        return jsonify(error), 400
    elif len(text) > TEXT_LIMIT:
        error = {'errorMessage': 'Too many characters'}
        return jsonify(error), 400
    else:
        return jsonify(analyzer.smart_song(text))


if __name__ == '__main__':
    if 'ENV' in os.environ and os.environ['ENV'] == 'dev':
        app.run(debug=True, host='0.0.0.0')
    else:
        http_server = WSGIServer(('', 5000), app)
        http_server.serve_forever()
