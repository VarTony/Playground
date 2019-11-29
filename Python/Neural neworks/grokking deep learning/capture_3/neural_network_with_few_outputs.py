import functools

def append (list, elem1, elem2):
  list.append(elem1 * elem2) 
  return list

def ele_mul(input, weight):
  return functools.reduce(lambda acc, elem: append(acc, elem, input) , weight, list())



def neural_network_with_few_outputs(input, weight):
  return ele_mul(input, weight)



result = neural_network_with_few_outputs(11, [0.8, 0.3, 0.105])
print(result)