# Реализуйте функцию getSameCount, которая считает количество общих уникальных элементов для двух массивов.
# Аргументы:

# Первый массив
# Второй массив

# getSameCount([], []); // => 0
# getSameCount([1, 10, 3], [10, 100, 35, 1]); // => 2
# getSameCount([1, 3, 2, 2], [3, 1, 1, 2]); // => 3



def getSameCount(arr1, arr2):
  iterated = arr1 if len(arr1) >= len(arr2) else arr2
  checked =  arr1 if len(arr1) <= len(arr2) else arr2
  iterated = filter(lambda value: value in checked, iterated)
  return len(set(list(iterated)))

print(getSameCount([1, 10, 3], [10, 100, 35, 1])) # 2
print(getSameCount([], [])) # 0
print(getSameCount([1, 3, 2, 2], [3, 1, 1, 2])) # 3





