# David Omrai 4.12.2021

from time import struct_time
import numpy as np
from datetime import datetime
import re
import math


def get_text_cosine_similarity(original_text, compared_text):
  from sentence_transformers import SentenceTransformer
  from sklearn.metrics.pairwise import cosine_similarity
  import os
  os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
  os.environ["WANDB_API_KEY"] = "0"
  os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

  model_name = 'bert-base-nli-mean-tokens'
  # Create model
  model = SentenceTransformer(model_name)
  # Encode the original sentences
  orig_text_vecs = model.encode(original_text)
  compared_text_vecs = model.encode(compared_text)

  similarities = []

  for sentence in orig_text_vecs:
    similarities.append(
      cosine_similarity(
        [sentence],
        compared_text_vecs
      ).mean()
    )

  return np.mean(similarities)

def count_words_frequency(words):
  words_freq = {}

  for word in words:
    if word in words_freq:
      words_freq[word] += 1
    else:
      words_freq[word] = 1
  
  return words_freq

def count_dot_product(f_words, s_words):
  dod = 0.0

  for key in f_words:
    if key in s_words:
      dod += (f_words[key] * s_words[key])

  return dod

def get_text_words_similarity(original_text, compared_text):
  # Get words
  orig_words = re.sub("[^0-9a-zA-Z']+", ' ', original_text.lower()).rstrip().split(' ')
  comp_words = re.sub("[^0-9a-zA-Z']+", ' ', compared_text.lower()).rstrip().split(' ')

  # Get words frequency
  orig_freq = count_words_frequency(orig_words)
  comp_freq = count_words_frequency(comp_words)

  # Count the angle
  numer = count_dot_product(comp_freq, orig_freq)

  denom = math.sqrt(
    count_dot_product(comp_freq, comp_freq) * count_dot_product(orig_freq, orig_freq))
  
  if (numer == 0):
    return 0.0

  return 1 - (math.acos(numer / denom)/(math.pi))



def get_date_similarity(f_date, s_date, num_sim=False):
  f_date = datetime.strptime(f_date, "%d/%m/%Y")
  s_date = datetime.strptime(s_date, "%d/%m/%Y")
  
  if num_sim == True:
    return sum([get_number_similarity(f_date.day, s_date.day),
      get_number_similarity(f_date.month, s_date.month),
      get_number_similarity(f_date.year, s_date.year)]
    ) / 3

  return(get_number_similarity(f_date.timestamp(), s_date.timestamp()))

def get_time_similarity(f_time, s_time, num_sim=False):
  f_time = datetime.strptime(f_time, "%H:%M")
  s_time = datetime.strptime(s_time, "%H:%M")
  
  if num_sim == True:
    return sum([
      get_number_similarity(f_time.hour, s_time.hour),
      get_number_similarity(f_time.minute, s_time.minute)
      ]) / 2
  
  return get_number_similarity(
    (f_time.hour*60 + f_time.minute),
    (s_time.hour*60 + s_time.minute)
  )
def get_number_similarity(f_num, s_num):
  f_num = float(abs(f_num))
  s_num = float(abs(s_num))
  if f_num == 0 and s_num == 0:
    return 1
  return float(min(f_num, s_num))/(max(f_num, s_num))