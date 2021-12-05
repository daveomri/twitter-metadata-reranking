# David Omrai 4.12.2021

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ["WANDB_API_KEY"] = "0"
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'


def get_text_cosine_similarity(original_text, compared_text):
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


def get_date_similarity(f_date, s_date):
  f_date = datetime.strptime(f_date, "%d/%m/%Y")
  s_date = datetime.strptime(s_date, "%d/%m/%Y")
  
  return sum([get_number_similarity(f_date.day, s_date.day),
    get_number_similarity(f_date.month, s_date.month),
    get_number_similarity(f_date.year, s_date.year)]
  ) / 3
    

def get_time_similarity(f_time, s_time):
  f_time = datetime.strptime(f_time, "%H:%M")
  s_time = datetime.strptime(s_time, "%H:%M")
  
  return sum([
    get_number_similarity(f_time.hour, s_time.hour),
    get_number_similarity(f_time.minute, s_time.minute)
    ]) / 2

def get_number_similarity(f_num, s_num):
  f_num = float(abs(f_num))
  s_num = float(abs(s_num))
  if f_num == 0 and s_num == 0:
    return 1
  return float(min(f_num, s_num)+1.)/(max(f_num, s_num)+1.)