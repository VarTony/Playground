
const detectorMatrixOrVector = x => (x[0] && !x[0][0]) ? 'vector': 'matrix ';  


// Сравнивает соотношения матриц для сложения
const checkMatrixForSum = (A1, A2) => {    
    if(A1.length !== A2.length) return  {
         result: false, 
         message: `Матрицы имеют не одинаковый размер столбцов A1:${A1.length}, A2:${A1.length};`
    }

    // detectorMatrixOrVector(A1.[A1.length - 1])
    // if(A1[A1.length - 1].length !== A2[A2.length - 1].length) return false

    return true;
}


//Сравнивает длину двух векторов
const checkLengthTwoVectors = (v1, v2) =>  v1.length === v2.length
 ? { result: true, message: 'OK' }    
 : { result: false, message: 'Ошибка: Векторы имеют разную длину - перемножение невозможно' }; 


exports [ checkMatrixForSum, detectorMatrixOrVector, checkLengthTwoVectors ];