# Реализуйте функцию getIntersectionOfUnsortedList,
# которая принимает на вход два неотсортированных списка и находит их пересечение.

# getIntersectionOfUnsortedList([10, 31, 24], [10, 13, 24, 18, 24, 30]);
# // => [10, 24]

# getIntersectionOfUnsortedList([31, 115, 21, 25, 5], [2, 35, 15.5, 8, 3, 32]);
# // => [35, 15.5]




def getIntersectionOfUnsortedList(l1, l2):
  counter = l1 if len(l1) >= len(l2) else l2
  checker = l1 if len(l1) <  len(l2) else l2
  return list(set(filter(lambda value : value in checker, counter)))


print(getIntersectionOfUnsortedList([10, 31, 24], [10, 13, 24, 18, 24, 30]))
print(getIntersectionOfUnsortedList([31, 115, 35, 15.5, 5], [2, 35, 15.5, 8, 3, 32]))


