# Реализуйте функцию checkIfBalanced, которая проверяет балансировку круглых скобок в арифметических выражениях.

# checkIfBalanced('(5 + 6) * (7 + 8)/(4 + 3)'); // => True
# checkIfBalanced('(4 + 3))'); // => False



def checkIfBalanced(string):
  inspect = list('()')
  l = list(string)
  if not (inspect[0] in l) or not (inspect[1] in l): return None
  count1 = 0
  count2 = 0
  i = 0
  while len(l) > i:
    count1 += 1 if l[i] == inspect[0] else 0
    count2 += 1 if l[i] == inspect[1] else 0
    i+=1
  return count1 == count2


print(checkIfBalanced('yy'))
print(checkIfBalanced('(5 + 6) * (7 + 8)/(4 + 3)'))
print(checkIfBalanced('(4 + 3))'))



