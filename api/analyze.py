from flask import send_file
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.sentiment.util import *


class Analyzer:
    def __init__(self):
        nltk.download('stopwords')
        nltk.download('punkt')

        classifier_f = open("models/naivebayes.pickle", "rb")
        self.classifer = pickle.load(classifier_f)
        classifier_f.close()

        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))
        self.emotions = self.get_emotions()

    @staticmethod
    def get_emotions():
        with open('config/emotions.txt') as f:
            return f.readlines()

    def song(self):
        return send_file('assets/IceCream.mp3', mimetype='audio/mpeg')

    def smart_song(self, text):
        sentiment = self.find_sentiment(text)
        songID = self.choose_song(sentiment)
        response = {
            'sentiment': sentiment,
            'songID': songID
        }
        return response

    def choose_song(self, sentiment):
        # TODO add choosing song logic
        return 'fdsv234gn35'

    def find_sentiment(self, text):
        features = \
            [self.stemmer.stem(word) for word in mark_negation(nltk.word_tokenize(text)) if word not in self.stop_words]
        sentiment = self.classifer.classify(features)
        return sentiment
