from flask import send_file
import pickle
import nltk

class Analyzer:
    def __init__(self):
        classifier_f = open("models/naivebayes.pickle", "rb")
        self.classifer = pickle.load(classifier_f)
        classifier_f.close()

    def song(self):
        return send_file('assets/IceCream.mp3', mimetype='audio/mpeg')

    def smart_song(self, text):
        sentiment = self.find_sentiment(text)
        return self.choose_song(sentiment)

    def choose_song(self, sentiment):
        response = {'sentiment': sentiment}
        return response

    def find_sentiment(self, text):
        sentiment = self.classifer.classify(text)
        return sentiment
