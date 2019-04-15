# Реализуйте функцию gcd, которая находит наибольший общий делитель двух целых положительных чисел.

# gcd(2, 3); // 1
# gcd(6, 3); // 3
# gcd(14, 21); // 7
# gcd(21, 35); // 7

def gcd(num1, num2):
  min = num1 if num1 < num2 else num2
  max = num1 if num1 > num2 else num2
  while True:
    if max % min == 0: return min
    min-=1

print(gcd(25, 15))