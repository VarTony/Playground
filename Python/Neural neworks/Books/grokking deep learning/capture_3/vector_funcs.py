import functools

def elementwise_multiplication(vectorA, vectorB):
  if(len(vectorA) != len(vectorB)): 
    print('Vectors must have some length')
    return
  
  result = []
  
  for i in range(len(vectorB)):
    result.append(vectorA[i] * vectorB[i])

  return result


def elementwise_addition(vectorA, vectorB):
  if(len(vectorA) != len(vectorB)): 
    print('Vectors must have some length')
    return
  
  result = []
  
  for i in range(len(vectorB)):
    result.append(vectorA[i] + vectorB[i])

  return result



vector_sum = lambda vector : functools.reduce(lambda acc, elem: acc + elem,  vector, 0)

vector_average = lambda vector : functools.reduce(lambda acc, elem: acc * elem,  vector, 1)


print(elementwise_multiplication(weight, toes))
print(elementwise_addition(wlres, mfans))

print(vector_sum(toes))
print(vector_average(mfans))
