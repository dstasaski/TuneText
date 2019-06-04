[![Build Status](https://travis-ci.com/dennystasaski/TuneText.svg?branch=master)](https://travis-ci.com/dennystasaski/TuneText)

# Tune My Text!
Welcome to Tune My Text!  Tune My Text is an interactive website created to pair a song with a user's provided text.  Using machine learning models, text can be intelligently classified into an emotion.  The text will then be paired with a fitting song!

## About
* Website Client -- Angular 7
* Website API -- Python (Flask)
* Text Classifier -- NLTK Model built from scratch
* Song Classifier -- Uses open source model (see below)
* CI / CD Pipeline -- Travis-CI
* Deployment -- Multi-Docker Container Application on AWS

## Local Setup
This website makes use of Google Cloud's text-to-speech API.  To connect, put your Google Cloud account's API key into a file `api.env` at the project root directory.

## Running the Application
Start the website easily on your local machine with `docker-compose up`

The website can be viewed at `localhost:4200`

## Credits
Text classification training dataset used from `CrowdFlower.com`.  The dataset consists of 40,000 tweets labeled with emotion.

Used Mathildebuenerd's song classifer to pair songs with an emotion [found here](https://github.com/mathildebuenerd/music-emotion-classifier)

All songs used are licensed under Creative Common's (CC0) from `freepd.com` and `soundcloud.com`.

