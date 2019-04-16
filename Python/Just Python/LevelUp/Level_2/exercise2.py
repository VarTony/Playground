
import unittest

# Реализуйте функцию get, которая излекает из массива элемент по указанному индексу,
# если индекс существует, либо возвращает значение по умолчанию.
# Функция принимает на вход три аргумента:

# Массив
# Индекс
# Значение по умолчанию (которое по умолчанию равно None)
# Пример:

# cities = ['moscow', 'london', 'berlin', 'porto'];

# get($cities, 1); // => london
# get($cities, 4); // => None
# get($cities, 10, 'paris'); // => paris

# ----------------data--------------------


def get(l, i, result=None):
    if (len(l) - 1) >= i: return l[i]
    return result


# ---------------test----------------------------

class TestUM(unittest.TestCase):
    def test(self, l, i, res, expect):
        try:
            self.assertEqual(get(l, i, res), expect)
        except:
            print('Error: expected - ' + str(expect) + ', and received - ' + str(get(l, i, res)))
        else:
            print('successful: expected - ' + str(expect) + ', and received - ' + str(get(l, i, res)))


test = TestUM()

cities = ['moscow', 'london', 'berlin', 'porto'];

test.test(cities, 0, None, 'moscow')
test.test(cities, 5, 'Not Found', 'Not Found')
test.test(cities, 1, None, 'london')

