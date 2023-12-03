import math


"""
    Вычисляет Евклидово расстояние между двумя точками в n-мерном пространстве.
     point_1 и point_2 должны быть итерируемыми объектами (например, списками) одинаковой длины.
     
     Euclidean Distance = √Σ((point1[i] - point2[i])²) for i in 1 to n
"""

def euclideanDistance(point_1, point_2):
    distance = 0
    for i in range(len(point_1)):
        distance += (point_1[i] - point_2[i]) ** 2

    return distance ** 0.5


"""  
    Манхэттенское расстояние (Manhattan Distance): Или городское расстояние, 
     оно вычисляется как сумма абсолютных разностей между координатами точек. 
     Это расстояние подходит для сценариев, где нужно учитывать только пути, 
     которые идут вдоль осей координат (как движение по городским кварталам).

    Manhattan Distance = ∑ |p_i - q_i| for i in 1 to n
"""

def manhattanDistance(point_1, point_2):
    distance = 0
    for i in range(len(point_1)):
        distance += abs(point_1[i] - point_2[i])

    return distance


"""
    Чебышёвское расстояние (Chebyshev Distance): Максимум абсолютных разностей между 
     соответствующими координатами двух точек. Используется, например, в шахматах 
     для определения минимального количества ходов, необходимых королю, чтобы добраться 
     из одной клетки в другую.

    Chebyshev Distance = max[i] |p_i - q_i| for i in 1 to n
"""
def chebyshevDistance(point_1, point_2):
    distances = [abs(p - q) for p, q in zip(point_1, point_2)]
    return max(distances)

# Альтернативный вариант:

def chebyshevDistanceAltr(point_1, point_2):
    pairs = []
    for i in range(len(point_1)):
        pairs.append(abs(point_1[i] - point_2[i]))

    return max(pairs)


