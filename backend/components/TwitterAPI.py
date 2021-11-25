# David Omrai 24.11.2021
import tweepy
import webbrowser
import time

class TwitterAPI:
  def __init__(self):
    consumer_key = "4LtdhzlJFkEsM2bi7kPK07cOy"
    consumer_secret = "WvFNG27x9YxUOGZeDw06KQzEq0FCgFNVKUePI1fTkBtYd0i7Z7"

    access_token = "1442488131198935044-2ES0kXYrxybXq1orYkjXYloj6yyBKk"
    access_token_secret = "So6ctn0EwsNDI82moBgdR1jjy6NyuBfghDplG3DnwvHt2"

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)

    self.api = tweepy.API(auth)

    self.user = self.api.get_user(screen_name='daivorm')
    

  def get_tweets_by_usernames(self, usernames, length):
    """todo"""


  def get_tweets_by_hashtags(self, hashtags, length):
    """todo"""


test_api = TwitterAPI()

print("Screen name", test_api.user.screen_name)
print("folowers count", test_api.user.followers_count)
print("friends count:", len(test_api.user.followers()))

for tweet in tweepy.Cursor(test_api.api.search_tweets, q='daveomri').items(10):
    print(tweet.text)

print(test_api.api.verify_credentials().screen_name)
# test_api.api.update_status("Hello world!")

my_timeline = test_api.api.home_timeline()


print(my_timeline[0])