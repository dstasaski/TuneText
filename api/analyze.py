from flask import send_file
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.sentiment.util import *
from os import listdir
from os.path import isfile, join

class Analyzer:
    def __init__(self):
        classifier_f = open("models/naivebayes.pickle", "rb")
        self.classifer = pickle.load(classifier_f)
        classifier_f.close()

        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))
        self.emotions = self.get_emotions()

        self.song_names = [f for f in listdir('assets/songs') if isfile(join('assets/songs', f))]

    @staticmethod
    def get_emotions():
        with open('config/emotions.txt') as f:
            return f.readlines()

    def song(self, songID):
        if songID in self.song_names:
            return send_file('assets/songs/' + songID, mimetype='audio/mpeg')
        else:
            return None

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
        return 'IceCream.mp3'

    def find_sentiment(self, text):
        tokens = mark_negation(nltk.word_tokenize(text.lower()))
        features = [self.stemmer.stem(word) for word in tokens if word not in self.stop_words]
        sentiment = self.classifer.classify(features)
        return sentiment
