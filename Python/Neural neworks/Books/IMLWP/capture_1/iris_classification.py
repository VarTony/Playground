import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier

# Загрузка набора данных ирисов
iris_dataset = load_iris()

# Вывод описания набора данных, названий сортов ирисов, признаков и примеров данных
print(f"Описание набора:\n {iris_dataset['DESCR'][:256]}")
print(f"Названия сортов ирисов: \n {iris_dataset['target_names']}")
print(f"Названия признаков: \n {iris_dataset['feature_names']}")
print(f"Примеры данных с исследуемыми признаками: \n {iris_dataset['data'][:5]}")
print(f"Контрольные ответы для тестового набора(Целевые метки): \n {iris_dataset['target']}")

# Разделение данных на обучающую и тестовую выборки
X_train, X_test, y_train, y_test = train_test_split(
    iris_dataset['data'],
    iris_dataset['target'],
    random_state=0
)

# Создание классификатора k-ближайших соседей
knn = KNeighborsClassifier(n_neighbors=3)

# Обучение классификатора на обучающих данных
knn.fit(X_train, y_train)

# Пример нового ириса для классификации
found_iris = np.array([5, 2.0, 0.8, 0.5])

# Предсказание сорта ириса для нового примера
# .reshape(1, -1) используется для изменения формы массива, не изменяя его данные.
# [5, 2.0, 0.8, 0.5] -> [[5, 2.0, 0.8, 0.5]] (параметр -1 задает размерность так, чтобы размер массива остался неизменным)
prediction = knn.predict(found_iris.reshape(1, -1))
print(f"Предсказанный сорт найденного ириса: {iris_dataset['target_names'][prediction]}")

# Оценка правильности классификатора на тестовых данных
accuracy = knn.score(X_test, y_test)
print(f"Правильность на тестовом наборе: {(accuracy * 100):.1f}%")
