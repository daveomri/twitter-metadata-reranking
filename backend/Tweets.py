# David Omrai 3.12.2021
from datetime import datetime
import pandas as pd
from components.TwitterAPI import TwitterAPI
import re
import components.Metrics as metr

class Tweets:
  def __init__(self):
    # Twitter API
    self.twiapi = TwitterAPI()
    # Tweets
    self._tweets = pd.DataFrame(self.twiapi.tweet_features)

  def date_from_datetime(self, dt):
    rt = datetime.strptime(dt, '%a %b %d %H:%M:%S +0000 %Y')
    return "{}/{}/{}".format(rt.day, rt.month, rt.year)
  
  def time_from_datetime(self, dt):
    rt = datetime.strptime(dt, '%a %b %d %H:%M:%S +0000 %Y')
    return "{}:{}".format(rt.hour, rt.minute)
  

  def fetch_tweets(self, hashtags, usernames, length):
    usernames_tweets = self.twiapi.get_tweets_by_usernames(usernames, length)
    hashtags_tweets = self.twiapi.get_tweets_by_hashtags(hashtags, length)

    self._tweets = pd.concat([usernames_tweets, hashtags_tweets], ignore_index=True)
  

  #---------------------------------------------------------
  def count_text_similarity(self, text):
    self._tweets['text_sim'] = self._tweets['text']   
    separators = '\. |\.|\? |\?|\n|!'
    comp_lines = re.split(separators, text)

    self._tweets.text_sim = self._tweets.text_sim.apply(
      lambda twt_text:
        metr.get_text_cosine_similarity(
          re.split(separators, twt_text),
          comp_lines
        )
    )
  
  def count_text_len_similarity(self, text_len):
    self._tweets['text_len_sim'] = self._tweets['text']

    self._tweets.text_len_sim = self._tweets.text_len_sim.apply(
      lambda twt_text: 
        metr.get_number_similarity(
          len(twt_text),
          text_len
        )
    )

  def count_time_similarity(self, time):
    self._tweets['time_sim'] = self._tweets['created_at']

    self._tweets.time_sim = self._tweets.time_sim.apply(
      lambda twt_time: 
        metr.get_time_similarity(
          self.time_from_datetime(twt_time),
          time
        )
    )

  def count_date_similarity(self, date):
    self._tweets['date_sim'] = self._tweets['created_at']

    self._tweets.date_sim = self._tweets.date_sim.apply(
      lambda twt_date:
        metr.get_date_similarity(
          self.date_from_datetime(twt_date),
          date
        )
    )

  def count_favorite_similarity(self, likes_num):
    self._tweets['fav_sim'] = self._tweets['favorite_count']

    self._tweets.fav_sim = self._tweets.date_sim.apply(
      lambda twt_favs:
        metr.get_number_similarity(
          twt_favs,
          likes_num
        )
    ) 
  
  def count_retweets_similairty(self, retweets_num):
    self._tweets['ret_sim'] = self._tweets['retweet_count']

    self._tweets.ret_sim = self._tweets.date_sim.apply(
      lambda twt_rets:
        metr.get_number_similarity(
          twt_rets,
          retweets_num
        )
    )
  
  def count_feature_similarities(self, params_values):
    # Count text similarity
    self.count_text_similarity(params_values.countains)

    # Count text length similarity
    self.count_text_len_similarity(params_values.length)

    # Count date similarity
    self.count_date_similarity(params_values.date)

    # Count time similarity
    self.count_time_similarity(params_values.time)

    # Count likes similarity
    self.count_favorite_similarity(params_values.likes)

    # Count retweets similarity
    self.count_retweets_similairty(params_values)


  def sort_tweets(self, params_weights):
    """todo"""