# David Omrai 24.11.2021
import tweepy
import webbrowser
import time
import json
import pandas as pd
import re

class TwitterAPI:
  def __init__(self):
    consumer_key = "4LtdhzlJFkEsM2bi7kPK07cOy"
    consumer_secret = "WvFNG27x9YxUOGZeDw06KQzEq0FCgFNVKUePI1fTkBtYd0i7Z7"

    access_token = "1442488131198935044-2ES0kXYrxybXq1orYkjXYloj6yyBKk"
    access_token_secret = "So6ctn0EwsNDI82moBgdR1jjy6NyuBfghDplG3DnwvHt2"

    bearer_token = "AAAAAAAAAAAAAAAAAAAAAP97UAEAAAAAdK0W4py8i%2B9yvp7yOw3%2BQNd%2BQlA%3D4W7cCIjtuvKVNS9KO6eGtQAWZZKpGxoACAjiCe9SxbiDUWg2Uw"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    self.tweet_features = [
      'id', 
      'text', 
      'created_at', 
      'retweet_count', 
      'favorite_count', 
      'lang', 
      'source',
      'user_name', 
      'user_screen_name', 
      'user_location', 
      'user_url', 
      'user_verified', 
      'user_followers_count', 
      'user_friends_count', 
      'user_profile_image_url_https', 
      'user_profile_banner_url', 
      'user_profile_background_image_url_https', 
      'possibly_sensitive'
    ]

    self.api = tweepy.API(auth)

    self.client = tweepy.Client(
      bearer_token=bearer_token, 
      consumer_key=consumer_key, 
      consumer_secret=consumer_secret, 
      access_token=access_token, 
      access_token_secret=access_token_secret
    )

    self.user = self.api.get_user(screen_name='daivorm')
    

  def get_tweets_by_usernames(self, usernames, length):
    for username in usernames:
      try:
        """this"""
      except:
        print("Something went wrong with {}".format(username))
        continue


  def get_tweets_by_hashtags(self, hashtags, length, lang='en'):
    tweets = pd.DataFrame(columns=self.tweet_features)

    for hashtag in hashtags:
      try:
        for tweet in tweepy.Cursor(
            test_api.api.search_tweets, 
            q='#{} lang:{}'.format(hashtag, lang)
          ).items(length):
          extracted_tweet = self.get_extracted_features(tweet)
          tweets = tweets.append(extracted_tweet, ignore_index=True)
      except Exception as e:
        print("Oh no! {}".format(e.__class__))
        print("Something went wrong with {}".format(hashtag))
        continue

    return tweets

  def get_extracted_features(self, tweet):
    result = {}
    for feature in self.tweet_features:
      if feature in tweet._json:
        result[feature] = tweet._json[feature]
      else:
        sub_feature = ''
        for i in range(1, len(feature.split("_"))):
          sub_feature += re.search("([^_]*(_)){"+str(i)+"}", feature).group(1)
          if sub_feature[:-1] in tweet._json:
            print(feature[len(sub_feature):])
            result[feature] = tweet._json[sub_feature[:-1]][feature[len(sub_feature):]]
    return result

test_api = TwitterAPI()

# print("Screen name", test_api.user.screen_name)
# print("folowers count", test_api.user.followers_count)
# print("friends count:", len(test_api.user.followers()))

# for tweet in tweepy.Cursor(test_api.api.search_tweets, q='daveomri').items(10):
#     print(tweet.text)

print(test_api.api.verify_credentials().screen_name)
# test_api.api.update_status("Hello world!")


#tweets = test_api.client.get_users_tweets(id=[], max_results=5, exclude=["replies", "retweets"])

# tweets = test_api.api.user_timeline(screen_name="DaveOmri", count=1, exclude_replies = True, include_replies=False, include_rts=False, tweet_mode='extended')
# print(tweets)

tweets = test_api.get_tweets_by_hashtags(["#death"], 1)

print(tweets.shape)

