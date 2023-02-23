

//Определение матрица или вектор
const detectorMatrixOrVector = x => (x[0] && !x[0][0]) ? 'vector': 'matrix ';  


// Сравнение типов матриц
const comparisonTwoMatrixType = (A1, A2) => {
    const typeOfA1 = detectorMatrixOrVector(A1);
    const typeOfA2 = detectorMatrixOrVector(A2);

    return typeOfA1 === typeOfA2 
        ? { result: true, message: 'OK' }
        : { result: false, message: 'Эта операция не возможна для матриц разных размеров' };
};


// Сравнение длин двух векторов
const comparisonTwoLength = (v1, v2, value = 'Векторы' ) =>  v1.length === v2.length
 ? { result: true, message: 'OK' }    
 : { result: false, message: `Ошибка: ${ value } имеют разную длину - данная операция невозможна` }; 


 
exports [ 
    detectorMatrixOrVector,
    comparisonTwoLength, 
    comparisonTwoMatrixType
];