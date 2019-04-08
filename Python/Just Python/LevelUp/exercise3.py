# Реализуйте функцию square, которая возвращает квадрат числа.
# Реализуйте функцию sumOfSquares, которая возвращает сумму квадратов двух чисел.
# Реализуйте функцию squareSumOfSquares, которая возвращает квадрат суммы квадратов двух чисел.
# Примеры работы функций:

# square(5); // 25
# square(10); // 100
# sumOfSquares(5, 10); // 125
# sumOfSquares(10, -9); // 181
# squareSumOfSquares(1, 1); // 4
# squareSumOfSquares(2, 3); // 169

square = lambda value : value ** 2
sumOfSquares = lambda value1, value2 : square(value1) + square(value2)
squareSumOfSquares = lambda value1, value2: square(sumOfSquares(value1, value2))

print(sumOfSquares(5, 10))
print(squareSumOfSquares(2, 3))

