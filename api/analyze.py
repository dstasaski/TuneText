from flask import send_file
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.sentiment.util import *
from os import listdir
from os.path import isfile, join
from random import randint


class Analyzer:
    def __init__(self):
        classifier_f = open("models/naivebayes.pickle", "rb")
        self.classifer = pickle.load(classifier_f)
        classifier_f.close()

        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))

        self.emotions = self.all_emotions()
        self.positive, self.neutral, self.negative = self.classified_emotions()

        self.pos_songs = [f for f in listdir('assets/songs/positive') if isfile(join('assets/songs/positive', f))]
        self.neg_songs = [f for f in listdir('assets/songs/negative') if isfile(join('assets/songs/negative', f))]
        self.neutral_songs = [f for f in listdir('assets/songs/neutral') if isfile(join('assets/songs/neutral', f))]
        self.song_names = self.pos_songs + self.neg_songs + self.neutral_songs


    @staticmethod
    def all_emotions():
        with open('config/emotions/emotions.txt') as f:
            return f.read().splitlines()

    @staticmethod
    def classified_emotions():
        with open('config/emotions/positive.txt') as f:
            pos = f.read().splitlines()
        with open('config/emotions/neutral.txt') as f:
            neutral = f.read().splitlines()
        with open('config/emotions/negative.txt') as f:
            negative = f.read().splitlines()
        return pos, neutral, negative

    def song(self, songID):
        if songID in self.pos_songs:
            return send_file('assets/songs/positive/' + songID, mimetype='audio/mpeg')
        elif songID in self.neg_songs:
            return send_file('assets/songs/negative/' + songID, mimetype='audio/mpeg')
        elif songID in self.neutral_songs:
            return send_file('assets/songs/neutral/' + songID, mimetype='audio/mpeg')
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
        if sentiment in self.positive:
            return self.pos_songs[randint(0, len(self.pos_songs) - 1)]
        elif sentiment in self.negative:
            return self.neg_songs[randint(0, len(self.neg_songs) - 1)]
        else:
            return self.neutral_songs[randint(0, len(self.neutral_songs) - 1)]

    def find_sentiment(self, text):
        tokens = mark_negation(nltk.word_tokenize(text.lower()))
        features = [self.stemmer.stem(word) for word in tokens if word not in self.stop_words]
        sentiment = self.classifer.classify(features)
        return sentiment
