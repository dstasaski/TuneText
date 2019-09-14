from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.sentiment.util import *
import random


class Analyzer:
    def __init__(self):
        classifier_f = open("models/naivebayes_no_neutral.pickle", "rb")
        self.classifier = pickle.load(classifier_f)
        classifier_f.close()

        self.stemmer = PorterStemmer()
        self.stop_words = set(stopwords.words('english'))

        self.emotions = self.all_emotions()
        self.happy, self.sad, self.angry = self.classified_emotions()
        self.happy_songs, self.sad_songs, self.angry_songs = self.song_emotions()


    @staticmethod
    def all_emotions():
        with open('config/emotions/emotions.txt') as f:
            return f.read().splitlines()

    @staticmethod
    def classified_emotions():
        with open('config/emotions/happy.txt') as f:
            happy = f.read().splitlines()
        with open('config/emotions/sad.txt') as f:
            sad = f.read().splitlines()
        with open('config/emotions/angry.txt') as f:
            angry = f.read().splitlines()
        return happy, sad, angry

    @staticmethod
    def song_emotions():
        happy = []
        sad = []
        angry = []
        with open('config/emotions/song_emotion.txt') as f:
            for line in f.read().splitlines():
                song, emotion = line.split('=')
                if emotion == 'happy':
                    happy.append(song)
                elif emotion == 'sad':
                    sad.append(song)
                else:
                    angry.append(song)
        return happy, sad, angry

    @staticmethod
    def hash_text(text):
        return abs(hash(text)) % (10 ** 8)

    def smart_song(self, text):
        sentiment = self.find_sentiment(text)
        song_id = self.choose_song(sentiment, self.hash_text(text))
        response = {
            'sentiment': sentiment,
            'songID': song_id
        }
        return response

    def choose_song(self, sentiment, text_seed):
        random.seed(text_seed)
        if sentiment in self.happy:
            return self.happy_songs[random.randint(0, len(self.happy_songs) - 1)]
        elif sentiment in self.sad:
            return self.sad_songs[random.randint(0, len(self.sad_songs) - 1)]
        elif sentiment in self.angry:
            return self.angry_songs[random.randint(0, len(self.angry_songs) - 1)]
        else:
            return 'Unknown_Sentiment'

    def find_sentiment(self, text):
        tokens = mark_negation(nltk.word_tokenize(text.lower()))
        features = [self.stemmer.stem(word) for word in tokens if word not in self.stop_words]
        sentiment = self.classifier.classify(features)
        return sentiment
