# generate_scatter_plot.py
import pandas as pd
import matplotlib.pyplot as plt
import mglearn
from pandas.plotting import scatter_matrix

# Определение функции для генерации scatter plot
def generate_scatter_plot(data, X_train, y_train):
    # Создание DataFrame из обучающего набора данных
    dataframe = pd.DataFrame(X_train, columns=data.feature_names)

    # Создание scatter plot матрицы
    # data - данные с информацией о свойствах (например, названия столбцов)
    # X_train - данные для обучения (features)
    # y_train - целевые значения (labels)
    scatter_matrix(
        dataframe,  # Данные для визуализации
        c=y_train,  # Цвета точек, определенные метками y_train
        figsize=(15, 15),  # Размер графика
        marker='o',  # Стиль маркера
        hist_kwds={'bins': 20},  # Параметры для гистограмм на диагонали
        s=60,  # Размер точек
        alpha=0.8,  # Прозрачность точек
        cmap=mglearn.cm3  # Цветовая карта для точек
    )

    # Отображение графика
    plt.show()
