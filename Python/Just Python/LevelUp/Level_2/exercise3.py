# Реализуйте функцию getSameParity, которая принимает на вход массив чисел и возвращает список, состоящий из элементов,
# у которых такая же четность,
# как и у первого элемента входного массива.


# getSameParity([]); // => []
# getSameParity([1, 2, 3]); // => [1, 3]
# getSameParity([1, 2, 8]); // => [1]
# getSameParity([2, 2, 8]); // => [2, 2, 8]

def getSameParity(array):
    if (len(array) <= 0): return []
    even = True if array[0] % 2 == 0 else False

    if even:
        result = filter(lambda value: value % 2 == 0, array)
    else:
        result = filter(lambda value: value % 2 != 0, array)

    return list(result)


print(getSameParity([]))
print(getSameParity([4,8,15,23,42]))




