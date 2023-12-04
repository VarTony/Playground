import numpy as np

weight = [0.15, 0.38, 0]
toes = [8.5, 9.5, 9.1]
wlres = [0.85, 0.15, 0.45]
mfans = [1.2, 1.3, 0.8]
input = [toes[0], wlres[0], mfans[0]]


def simple_neural_network_with_few_inputs(input, weigth):
  pred = w_sum(input, weight)
  return pred

def w_sum(input, weight): 
  assert(len(input) == len(weight))
  output = 0

  for i in range(len(input)):
    output += input[i] * weight[i]

  return output



result = simple_neural_network_with_few_inputs(input, weight)

print(result)

# Version with numpy

weight = np.array([0.15, 0.38, 0])
toes = np.array([8.5, 9.5, 9.1])
wlres = np.array([0.85, 0.15, 0.45])
mfans = np.array([1.2, 1.3, 0.8])
input = np.array([toes[0], wlres[0], mfans[0]])

def simple_neural_network_with_few_inputs(input, weigth):
  pred = input.dot(weight)
  return pred



result = simple_neural_network_with_few_inputs(input, weight)

print(result)



