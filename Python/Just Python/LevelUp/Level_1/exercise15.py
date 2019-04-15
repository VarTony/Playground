import unittest
from functools import reduce


# Реализуйте функцию addDigits, которая работает следующим образом:

# Дано неотрицательное целое число num. Складывать все входящие в него цифры до тех пор, пока не останется одна цифра.

# Для числа 38 процесс будет выглядеть так:

# 3 + 8 = 11
# 1 + 1 = 2
# Результат: 2

# Пример:

# addDigits(10); // 1
# addDigits(19); // 1
# addDigits(38); // 2
# addDigits(1259); // 8

def helper(value, acc):
    acc = int(acc)
    acc += int(value)
    return str(acc)


def addDigits(nums):
    result = list(str(nums))
    while len(result) > 1:
        result = list(map(lambda value: int(value), result))
        result = list(reduce(helper, result))

    return int(''.join(result))


print(addDigits(5121589039098952375979582020918040991850203281))


# ---------------test----------------------------

class TestUM(unittest.TestCase):
    def test(self, nums, expect):
        try:
            self.assertEqual(addDigits(nums), expect)
        except:
            print('Error: expected - ' + str(expect) + ', and received - ' + str(addDigits(nums)))
        else:
            print('successful: expected - ' + str(expect) + ', and received - ' + str(addDigits(nums)))


test = TestUM()

test.test(0, 0)
test.test(5, 5)
test.test(10, 1)
test.test(19, 1)
test.test(38, 2)
test.test(1259, 8)
test.test(598997686567, 4)
test.test(39281, 5)
