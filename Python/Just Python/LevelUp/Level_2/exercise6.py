
# Реализуйте функцию bubbleSort, которая сортирует массив используя пузырьковую сортировку.
# Попробуйте воспроизвести алгоритм по памяти.


# bubbleSort([]); // => []
# bubbleSort([3, 10, 4, 3]); // => [3, 3, 4, 10]



def bubbleSort(arr):
  result = arr
  i = 0
  while i < len(result):
    j = 0
    while j < len(result):
      if(result[i] < result[j]):
        result[i], result[j] = result[j], result[i]
      j+=1
    i+=1
  return result

print(bubbleSort([3, 10, 4, 3, 5, 18, 185, 11, 10.5]))
print(bubbleSort([]))


