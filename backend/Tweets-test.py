# David Omrai 6.12.2021

from Tweets import Tweets

params_vals = {
  'contains': 'react programming blessing',
  'length': 12,
  'date': '12/03/2020',
  'time': '21:30',
  'likes': 1,
  'retweets': 0
}

tweets = Tweets()

tweets.fetch_tweets(['react'], ['DaveOmri'], 2)

tweets.count_feature_similarities(params_vals)

params_weights = {
  'lengthWeight': 2,
  'likesWeight': 1,
  'retweetsWeight': 2,
  'dateWeight': 2,
  'timeWeight': 1
}

tweets.count_weighted_similarities(params_weights)

tweets.sort_tweets()

data = tweets.tweets_to_dict()

for tweet in data:
  print(tweet["text"])
