
import  { getRandomInt } from '../Some functions';

/* Генератор матриц 
Сигнатура:
i - int -> Размерность строк
j - int -> Размерность столбцов

type - { 
    zero: нулевая, 
    E: единиченая,
    ordinary: заполняется целочислеными рандомными значениями(по умолчанию)
    } Задает тип матрицы   
*/

const matrixGenerator = (i, j, type = 'ordinary') => {

    const elemsRange = { zero: [0, 0], E: [1, 1], ordinary: [-150, 255] }[type];
  
    const matrixTamplate = new Array(j).fill(null); // Создается пустой массив заданого размера
  
    const matrix = matrixTamplate.map(() => {
        const vectorTamplate = new Array(i).fill(getRandomInt(...elemsRange));
        
        if(['E', 'zero'].includes(type)) return vectorTamplate
  
        const vector = vectorTamplate.map(elem => getRandomInt(...elemsRange));
        
        return vector;
    })
  
    return matrix;
  }
  
  
// Генератор квадратной матрицы
const squareMatrixGenerator = (n, type = 'ordinary') => matrixGenerator(n, n, type);

exports [ matrixGenerator, squareMatrixGenerator ];



