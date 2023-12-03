import math


# Вспомогательные функции

# Сумма квадратов значений из переданного списка
def sumOfSquares(numList):
    return sum([(x ** 2) for x in numList])

# Квадратный корень
def sqrt(num):
    return num ** 0.5

# Подсчет полных квадратов встречающихся в диапозоне от 1 до n 
# (пока не используется, сохранил как хороший пример оптимизации вычислений)
def countSquares(n):
    return int(sqrt(n))


"""
    Вычисляет Евклидово расстояние между двумя точками в n-мерном пространстве.
     point_1 и point_2 должны быть итерируемыми объектами (например, списками) одинаковой длины.
     
     Euclidean Distance = √Σ((point1[i] - point2[i])²) for i in 1 to n
"""

def euclideanDistance(point_1, point_2):
    distance = 0
    for i in range(len(point_1)):
        distance += (point_1[i] - point_2[i]) ** 2

    return sqrt(distance)


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
   Минковского расстояние (Minkowski Distance): Обобщение Евклидова и Манхэттенского расстояний.
    Евклидово расстояние — это частный случай Минковского расстояния при p=2, Манхэттенское — при p=1.
    Оно может быть адаптировано для разных значений p.

    Minkowski Distance = (Σ|p_i - q_i|^p)^(1/p) for i in 1 to n, где
    p_i и q_i - соответствующие координаты точек point_1 и point_2,
    p - параметр, определяющий степень (по умолчанию p=2, Евклидово расстояние).
"""

def minkowskiDistance(point_1, point_2, p=2):
    distance = 0
    for i in range(len(point_1)):
        distance += (point_1[i] - point_2[i]) ** p

    return distance ** (1/p)


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


"""
    Косинусное сходство (Cosine Similarity): Мера сходства между двумя векторами в 
     многомерном пространстве, основанная на косинусе угла между этими векторами. 
     Используется в различных областях, включая информационный поиск и обработку естественного языка, 
     для определения степени сходства между двумя векторами.

    Cosine Similarity = (Σ p_i * q_i) / (sqrt(Σ p_i^2) * sqrt(Σ q_i^2))
     где p_i и q_i - соответствующие элементы векторов point_1 и point_2.
"""

def cosineSimilarity(point_1, point_2):
    numerator = sum([(p * q) for p, q in zip(point_1, point_2)])
    denominator = sqrt(sumOfSquares(point_1)) * sqrt(sumOfSquares(point_2))

    return numerator / denominator
