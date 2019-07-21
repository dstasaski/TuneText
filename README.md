[![Build Status](https://travis-ci.com/dennystasaski/TuneText.svg?branch=master)](https://travis-ci.com/dennystasaski/TuneText)

# Tune My Text!
Welcome to Tune My Text!  Tune My Text is an interactive website created to pair a song with a user's provided text.  Using machine learning models, text can be intelligently classified into an emotion.  The text will then be paired with a fitting song!

To get started, go to https://tunemytext.com 

Enter your text into the main input box

![Home Page Quote](web/assets/screenshots/homePageQuote.png?raw=true)

Press 'Submit' when you are finished.  Your text will then be classified, and you will be taken to a page with a custom 'Tune' for you 'Text'

![Classification](web/assets/screenshots/classification.png?raw=true)

If you like the Tune, you can save it for later.  Looking up a Tune in the search bar will pull it up from our database:

![Lookup Code](web/assets/screenshots/lookupCode.png?raw=true)

## About
* Website Client -- Angular 7
* Website API -- Python (Flask)
* Text Classifier -- Custom built NLTK Model
* Song Classifier -- Open source model (see below)
* Database -- AWS DynamoDB
* Pipeline -- Travis-CI
* Deployment -- AWS on Elastic Container Service

## Local Setup
This website makes use of Google Cloud's text-to-speech API.  To connect, put your Google Cloud account's API key into a file `api.env` at the project root directory.  If you want to connect to DynamoDB, put the AWS service account credentials in the file as well.

## Running the Application
Start the website easily on your local machine with `docker-compose up`

The website can be viewed at `localhost:4200`

## Credits
Text classification training dataset used from `CrowdFlower.com`.  The dataset consists of 40,000 tweets labeled with emotion.

Used Mathildebuenerd's song classifer to pair songs with an emotion [found here](https://github.com/mathildebuenerd/music-emotion-classifier)

All songs used are licensed under Creative Common's (CC0) from `freepd.com` and `soundcloud.com`.

