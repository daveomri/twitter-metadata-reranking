# David Omrai 3.12.2021
import pandas as pd
from components.TwitterAPI import TwitterAPI

class Tweets:
  def __init__(self):
    # Twitter API
    self.twiapi = TwitterAPI()
    # Tweets
    self._tweets = pd.DataFrame(self.twiapi.tweet_features)
      
  def fetch_tweets(self, hashtags, usernames, length):
    usernames_tweets = self.twiapi.get_tweets_by_usernames(usernames, length)
    hashtags_tweets = self.twiapi.get_tweets_by_hashtags(hashtags, length)

    self._tweets = pd.concat([usernames_tweets, hashtags_tweets], ignore_index=True)


  def sort_tweets(self, sort_params):
    """todo"""