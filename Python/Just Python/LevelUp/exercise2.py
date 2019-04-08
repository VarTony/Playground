# Реализуйте функцию squareOfSum, которая находит квадрат суммы двух чисел по формуле: a² + 2 * a * b + b².

# squareOfSum(2, 3) // 25
# squareOfSum(1, 10) // 121
import unittest
import random


def squareOfSum(value1, value2):
    result = (value1 * value1) + 2 * value1 * value2 + (value2 ** 2)
    # print(result)
    return result


class TestUM(unittest.TestCase):

    def test_squareOfSum(self, a, b):
        self.assertEqual(squareOfSum(a, b), ((a + b) ** 2))


test = TestUM()
j = 0
i = 0
result = True

while (i <= 10000):
    j = random.randint(1, i if (i > 10) else 25)
    if test.test_squareOfSum(2, 2) == False: result = False
    i += 1

if result:
    print('successful')
else:
    print('Error')

