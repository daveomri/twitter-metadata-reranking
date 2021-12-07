# David Omrai 6.12.2021

from flask import Flask, request, jsonify, send_from_directory
import tweepy

from Tweets import Tweets

app = Flask(__name__)

data = {}

@app.route('/api', methods=['GET'])
def index():
  return data

@app.route('/add', methods=['POST'], strict_slashes=False)
def search_tweets():

  # Define the global variable
  global data
  data = request.get_json()
   
   # Get weights
  feature_weights = {
    'timeWeight': data["timeWeight"],
    'dateWeight': data["dateWeight"],
    'likesWeight': data["likesWeight"],
    'retweetsWeight': data["retweetsWeight"],
    'lengthWeight': data["lengthWeight"],
  }
  
  # Get tweets
  tweets = Tweets()
  tweets.fetch_tweets(data["hashtags"], data["people"], data["resPerQuer"])

  # Count similarities
  tweets.count_feature_similarities(data)

  # Count weighted similarities
  tweets.count_weighted_similarities(feature_weights)

  # Sort total similarities
  tweets.sort_tweets()

  # Turn the tweets into json
  data = tweets._tweets.to_json()

  return data

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0') 