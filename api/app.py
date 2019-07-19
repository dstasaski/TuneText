from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
from flask import request
from googlecloud import GoogleAPI
from analyze import Analyzer
from dao import Dao
from gevent.pywsgi import WSGIServer
import os

app = Flask(__name__)
CORS(app)

googleAPI = GoogleAPI()
analyzer = Analyzer()
dao = Dao()

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


@app.route('/api/dao/getplayer')
def get_player():
    player_id = request.args.get('id')
    if player_id is not None and 0 < len(player_id) < TEXT_LIMIT and player_id.isalnum():
        return jsonify(dao.get_player(player_id.strip()))
    else:
        return jsonify({'error': 'Player ID cannot be read'}), 400


@app.route('/api/dao/saveplayer', methods=['POST'])
def save_player():
    player = request.json
    if player is not None:
        text = player['text']
        song_name = player['song_name']
        emotion = player['emotion']
        if 0 < len(text) < TEXT_LIMIT and song_name in analyzer.song_names and emotion in analyzer.emotions:
            return jsonify(dao.store_player(text, song_name, emotion))
        else:
            return jsonify({'error': 'bad request'}), 400
    else:
        return jsonify({'error': 'bad request'}), 400


if __name__ == '__main__':
    if 'ENV' in os.environ and os.environ['ENV'] == 'dev':
        app.run(debug=True, host='0.0.0.0')
    else:
        http_server = WSGIServer(('', 5000), app)
        http_server.serve_forever()
