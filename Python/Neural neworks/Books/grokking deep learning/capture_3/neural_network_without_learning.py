import numpy as np
import functools


wMatrix1= [[0.1, 0.1, -0.3],
            [0.1, 0.2, 0.0],
            [0.0, 1.3, 0.1]]

wMatrix2 = [[0.1, 0.2, -0.1],
            [-0.1, 0.1, 0.9],
            [0.1, 0.4, 0.1]]


weights = [wMatrix1, wMatrix2]

toes = [8.5, 9.5, 9.9]
wlrec = [0.65, 0.8, 0.8]
mfans = [1.2, 1.3, 0.5]
input = [toes[0], wlrec[0], mfans[0]]


def w_sum (list, vectorWeight, inputs):
  assert(len(vectorWeight) == len(inputs))
  
  output = 0
  
  for i in range(len(vectorWeight)):
    output += vectorWeight[i] * inputs[i]

  list.append(output)
  return list


def ele_mul(inputs, weightMatrix):
  return functools.reduce(lambda acc, vector: w_sum(acc, vector, inputs) , weightMatrix, list())


def neural_network_without_learning(input, weight):
  hid = ele_mul(input, weight[0])
  print(hid)
  return ele_mul(hid, weight[1])

neural_network_without_learning(input, weights)


#Numpy version ------------------>


hp_wgt = np.array([[0.1, 0.1, -0.3],
                [0.1, 0.2, 0.0],
                [0.0, 1.3, 0.1]])

ih_wgt = np.array([[0.1, 0.2, -0.1],
                [-0.1, 0.1, 0.9],
                [0.1, 0.4, 0.1]])

weights =[hp_wgt, ih_wgt]

toes = np.array([8.5, 9.5, 9.9])
wlrec = np.array([0.65, 0.8, 0.8])
mfans = np.array([1.2, 1.3, 0.5])
input = np.array([toes[0], wlrec[0], mfans[0]])



def neural_network_without_learning(input, weight):
  hid = input.dot(weight[0])
  print(hid)
  return hid.dot(weight[1])



result = neural_network_without_learning(input, weights)
print(result)
