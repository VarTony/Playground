import unittest
# Реализуйте функцию isPrime определяющую, является ли число простым.

# isPrime(1) // false
# isPrime(7) // true
# isPrime(10) // false

def isPrime(num):
  if num == 2: return True
  if num <= 1: return False
  i=2
  while i < num:
    if num % i == 0: return False
    i+=1
  return True

# print(isPrime(1))

#---------------test----------------------------

class TestUM(unittest.TestCase):
    def test(self, num , expect):
      try:
        self.assertEqual(isPrime(num), expect)
      except: print('Error: expected - '+str(expect)+', and received - '+str(isPrime(num)))
      else: print('successful')

test = TestUM()


test.test(-3, False)
test.test(0, False)
test.test(-1, False)
test.test(1, False)
test.test(4, False)
test.test(21, False)
test.test(-10, False)
test.test(39281, False)

test.test(2, True)
test.test(3, True)
test.test(17, True)
test.test(1709, True)