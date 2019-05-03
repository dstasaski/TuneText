import base64
from flask import send_file

class Analyzer:

    def __init__(self):
        pass

    def get_encoding(self, song_file):
        with open(song_file, "r") as in_file:
            return in_file.read()

    def song(self):
        return send_file('assets/IceCream.mp3', mimetype='audio/mpeg')
