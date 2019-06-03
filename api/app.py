from flask import Flask
from flask import jsonify
from flask_cors import CORS
from flask import request
from googlecloud import GoogleAPI
from analyze import Analyzer
from gevent.pywsgi import WSGIServer
import os

app = Flask(__name__)
CORS(app)

googleAPI = GoogleAPI()
analyzer = Analyzer()

TEXT_LIMIT = 1000


@app.route('/api/text_to_speech')
def speech_mp3():
    text = request.args.get('text')
    if len(text) <= 0:
        error = {'errorMessage': 'There is no text'}
        return jsonify(error), 400
    elif len(text) > TEXT_LIMIT:
        error = {'errorMessage': 'Too many characters'}
        return jsonify(error), 400
    else:
        return jsonify(googleAPI.text_to_speech(text))


@app.route('/api/music/song/<song_id>')
def song(song_id):
    song = analyzer.song(song_id)
    if song is not None:
        return analyzer.song(song_id)
    else:
        return jsonify({'error': 'bad song path'}), 400


@app.route('/api/music/smartsong')
def smart_song():
    text = request.args.get('text')
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
