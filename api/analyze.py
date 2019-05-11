from flask import send_file


class Analyzer:
    def __init__(self):
        pass

    def song(self):
        return send_file('assets/IceCream.mp3', mimetype='audio/mpeg')

    def smart_song(self, text):
        sentiment = self.find_sentiment(text)
        return self.choose_song(sentiment)

    def choose_song(self, sentiment):
        pass

    def find_sentiment(self, text):
        pass
