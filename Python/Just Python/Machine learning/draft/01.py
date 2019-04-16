# Попытка реализации идеи из даной лекции: https://www.youtube.com/watch?v=ZNDbcxLDCOs

import numpy as np

def softmax(x, w, i, b):
  
  e = 2.718281828
  numerator = e ** (np.dot(x, w[i]) + b[i])
  j = len(w) - 1
  divisor = 0;
  probability = None

  while j > 0 :
    divisor += e ** (np.dot(x, w[j]) + b[j])
    j-=1
  
  probability = numerator / divisor
  return probability

#----------------data-------------------- 

def solution():

  probabilities = []
  w = [
    [0.5, 0.8, 1, 0.5], 
    [0.12, 0.8, 1, 0.5], 
    [0.853, 0.5, 0.1, 0.2], 
    [0.15, 0.5, 0.312, 0.5387], 
    [0.3, 0.8, 0.4, 0.145]]

  values = [
    [0.15, 0.8, 1, 0.5], 
    [1, 0.8, 0.3534, 0.5], 
    [0.5, 0.5, 0.1, 0.3], 
    [0.15, 0.12, 0.5, 1], 
    [0.9, 0.55, 0.31, 0.4]]

  b = [0,55,0.3,0,1,0.2]
  
  j = len(w) - 1
  i = 0
  while i <= j:
    probabilities.append(solution(values[i], w, i, b))
    i+=1
  print(probabilities)

solution()
