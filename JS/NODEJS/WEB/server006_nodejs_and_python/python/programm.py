# smallestDivisor(15); // 3
# smallestDivisor(17); // 1

import sys
data = sys.argv[1]

def smallestDivisor(num):
  if num < 0: return None
  if num < 2: return num
  i = 2
  while i <= num :
    if num % i == 0:
      if num == i: return 1
      return i
    i+=1

file = open("exchange", "w")
file.write('Smallest divisor: '+str(smallestDivisor(int(data))));
file.close()


