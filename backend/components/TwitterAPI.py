# David Omrai 24.11.2021
import tweepy
import webbrowser
import time
import json
import pandas as pd
import re

class TwitterAPI:
  def __init__(self):
    consumer_key = "nQHdkncNyjRquTNRFmrOS5pMf"
    consumer_secret = "ABUE8Fks33NOl96nDLyfkSmgFCLBd4SpoJVsqFDYcbVo9W0242"

    access_token = "1442488131198935044-D8suMVcMCPQNXBM1ZaHOydzDjDHXkW"
    access_token_secret = "XYkNlYBn946bbMpG3mVDZezsoOGydXXvovjFZGv6TFrOE"

    bearer_token = "AAAAAAAAAAAAAAAAAAAAAP97UAEAAAAAuaYT%2BHme9Dkhn40UgBpVVgEN72k%3Dlg8tqrhLUgxj1Uiic9MFs2mNhWnSmRLiCh1uICAqKoLobJqXQa"

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
    tweets = pd.DataFrame(columns=self.tweet_features)

    for username in usernames:
      try:
        for tweet in tweepy.Cursor(
            self.api.user_timeline,
            id=username,
          ).items(length):
          extracted_tweet = self.get_extracted_features(tweet)
          tweets = tweets.append(extracted_tweet, ignore_index=True)
      except Exception as e:
        print("Oh no! {}".format(e.args))
        print("Something went wrong with {}".format(username))
        continue
    
    return tweets


  def get_tweets_by_hashtags(self, hashtags, length):
    tweets = pd.DataFrame(columns=self.tweet_features)

    for hashtag in hashtags:
      try:
        for tweet in tweepy.Cursor(
            self.api.search_tweets,
            q='{} exclude:retweets exclude:replies'.format(hashtag)
          ).items(length):
          extracted_tweet = self.get_extracted_features(tweet)
          tweets = tweets.append(extracted_tweet, ignore_index=True)
      except Exception as e:
        print("Oh no! {}".format(e.args))
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
            result[feature] = tweet._json[sub_feature[:-1]][feature[len(sub_feature):]]
    return result
