from nltk.classify import NaiveBayesClassifier
from nltk.corpus import subjectivity
from nltk.corpus import stopwords
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
from nltk.stem import PorterStemmer

import pickle
import re
import csv


nltk.download('punkt')
nltk.download('subjectivity')
nltk.download('stopwords')

stemmer = PorterStemmer()
stop_words = set(stopwords.words('english'))
training_docs = []


with open('datasets/twitter_emotion_no_neutral.csv', newline='', encoding='ascii', errors='ignore') as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        sentiment = row[0]
        text = row[1].lower()
        tokens = [stemmer.stem(word) for word in mark_negation(nltk.word_tokenize(text)) if word not in stop_words]
        training_docs.append((tokens, sentiment))


sentim_analyzer = SentimentAnalyzer()
all_words = sentim_analyzer.all_words(training_docs)
unigram_feats = sentim_analyzer.unigram_word_feats(all_words, min_freq=4)
sentim_analyzer.add_feat_extractor(extract_unigram_feats, unigrams=unigram_feats)

training_set = sentim_analyzer.apply_features(training_docs)
trainer = NaiveBayesClassifier.train

classifier = sentim_analyzer.train(trainer, training_set)

save_classifier = open("../api/models/naivebayes_no_neutral.pickle", "wb")
pickle.dump(sentim_analyzer, save_classifier)
save_classifier.close()
