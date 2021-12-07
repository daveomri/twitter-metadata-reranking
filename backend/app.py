from flask import Flask, request, jsonify, send_from_directory

from Tweets import Tweets

app = Flask(__name__)

data = {
  "name": "Dave",
  "rtl": 'there is none'
}

@app.route('/api', methods=['GET'])
def index():

  return data

@app.route('/add', methods=['POST'], strict_slashes=False)
def search_tweets():

  # Define the global variable
  global data
  data = request.get_json()
   
   # Search the tweets

  feature_weights = {
    'timeWeight': data["timeWeight"],
    'dateWeight': data["dateWeight"],
    'likesWeight': data["likesWeight"],
    'retweetsWeight': data["retweetsWeight"],
    'lengthWeight': data["lengthWeight"],
  }

  data = feature_weights

  print(feature_weights)
  return data


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0') 