# David Omrai 6.12.2021

from Tweets import Tweets

params_vals = {
  'contains': '',
  'length': 12,
  'date': '12/03/2020',
  'time': '21:30',
  'likes': 2,
  'retweets': 1,
  'similarity': 'words'
}

tweets = Tweets()

tweets.fetch_tweets([], ['DaveOmri'], 5)

tweets.count_feature_similarities(params_vals)

params_weights = {
  'lengthWeight': 0,
  'likesWeight': 0,
  'retweetsWeight': 2,
  'dateWeight': 0,
  'timeWeight': 0
}

tweets.count_weighted_similarities(params_weights, params_vals)

tweets.sort_tweets()

data = tweets.tweets_to_dict()

for tweet in data:
  print(tweet["id_str"])
