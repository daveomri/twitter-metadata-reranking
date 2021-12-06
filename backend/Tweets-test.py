# David Omrai 6.12.2021

from Tweets import Tweets

tweets = Tweets()

tweets.fetch_tweets([], ['eliska_cechova'], 3)

# Test date
tweets.count_date_similarity('28/05/1999')

print(tweets._tweets.date_sim)

# Test time
tweets.count_time_similarity('23:35')

print(tweets._tweets.time_sim)

# Test text
tweets.count_text_similarity("Nice kisses are best.")

print(tweets._tweets.text_sim)

# Test text size
tweets.count_text_len_similarity(1)

print(tweets._tweets.text_len_sim)

# Test retweets num
tweets.count_retweets_similairty(2)

print(tweets._tweets.ret_sim)

# Test fav num
tweets.count_favorite_similarity(1)

print(tweets._tweets.fav_sim)