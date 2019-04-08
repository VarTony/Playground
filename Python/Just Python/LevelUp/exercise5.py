# Реализуйте функцию которая считает площадь треугольника на основе известной стороны и прилегающих к ней углов. Углы задаются в градусах.

# Противолежащий угол вычисляется по формуле: 180 - сумма двух известных углов.

# solution(3, 60, 60); // приблизительно 3.9

# // S = 1/2 * a**2 * (sin(β) * sin(γ)) / sin(α)
# // S = 1/2 * 9 * (sin(60) * sin(60)) / sin(60)
# // S = 1/2 * 9 * (0.87 * 0.87) / 0.87
# // 3.9

import math

give_radians = lambda grade : grade * (math.pi / 180)

def solution(side, angle1, angle2):
  sin1 = math.sin(give_radians(angle1));
  sin2 = math.sin(give_radians(angle2));
  sin3 = math.sin(math.pi - give_radians(angle1 + angle2));
  return (1 / 2) * side * side * ((sin1 * sin2) / sin3);


print(solution(3, 60, 60))