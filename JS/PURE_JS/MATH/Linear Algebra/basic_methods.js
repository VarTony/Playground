import { 
    detectorMatrixOrVector,
    comparisonTwoLength,
    comparisonTwoMatrixType
} from './exports';



/* Транспонирование вектора (Внутреняя функция)
    Сигнатура:
    v - [ 𐤀a ϵ R| a1, ..., an ]: Вектор
    |
    |___/ Opertation ---->  v := [ 1,2,3 ] -> [ [1],[2],[3] ] 
*/
const vectorT = v => v.reduce((column, a) => { 
    column = [...column, [a]];
    return column;
  }, []);


/* Транспонирование матрицы (Внутреняя функция)
    Сигнатура:
    A - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица
    |
    |___/ Opertation ---->  A := [ [1,2,3]    [ [1,4],
                                   [4,5,6] ] -> [2,5],
                                                [3,6] ] 

*/
const matrixT = (A, newMatrix = [], iOfColumn = 0) => {
    const newColumn = [];
    A.forEach(v => newColumn.push(v[iOfColumn]))
          
    return iOfColumn === A[0].length 
     ? newMatrix
     : matrixT(A, [...newMatrix, newColumn], ++iOfColumn)
  }


/* Транспонирование матрицы (Внешний деспетчер)
    Сигнатура:
    A - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица
*/
const matrixTransposition = A => detectorMatrixOrVector(A) === 'vector'
    ? vectorT(A)
    : matrixT(A)


/* Умножение вектора на число
    Сигнатура:
    V - [ 𐤀a ϵ R| a1, ..., an ]: Вектор
    n - (n ϵ R): Множитель
*/
const vectorToNum = (V, n) => V.map( a => a * n);


/* Умножение матрицы на число
    Сигнатура:
    A - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица
    n - (n ϵ R): Множитель
|
|___/ Opertation ----> ( A * n )

*/
const matrixToNum = (A, n) => A.map( vector => vectorToNum(vector, n) );


/* Сложение векторов
    Сигнатура:
    v1 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 1
    v2 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 2
    |
    |___/ Opertation ----> ( V1 + V2 )
*/
const vectorSum = (v1, v2) => v1.map((a, i) => a + v2[i]) 


/* Разница векторов
    Сигнатура:
    v1 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 1
    v2 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 2
    |
    |___/ Opertation ----> ( V1 - V2 )
*/
const vectorDiff = (v1, v2) => v1.map((a, i) => a - v2[i]) 


/* Умножение векторов
    Сигнатура: 
    v1 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 1
    v2 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 2
    |
    |___/ Opertation ----> ( V1 * V2 )
*/
const vectorToVector = (v1, v2) => {
    const sameLength = comparisonTwoLength(v1, v2);
    if(!sameLength.result) return sameLength.message;
    
    return v1.map((a, i) => a * v2[i]) 
}


/* Сложение матриц
    Сигнатура:
    A1 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица 1
    A2 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица 2
    |
    |___/ Opertation ----> ( A1 + A2 | V1 + V2 ) 

*/
const matrixSum = (A1, A2) => {
    const validatedSize = comparisonTwoLength(A1, A2, 'Матрицы');
    const validatedType = comparisonTwoMatrixType(A1, A2);
    const detectType = detectorMatrixOrVector(A1);

    if(!validatedSize.result) return validatedSize.message;
    if(!validatedType.result) return validatedType.message;
    if(detectType === 'vector') return vectorSum(A1, A2);

    return A1.map( (v, i) => vectorSum(v, A2[i]))
}


/* Разница матриц
    Сигнатура:
    A1 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица 1
    A2 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} & 𐤀A := {v1, .... vn }  ]: Матрица 2
    |
    |___/ Opertation ----> ( A1 - A2 | V1 - V2 ) 
*/
const matrixDiff = (A1, A2) => {
    const validatedSize = comparisonTwoLength(A1, A2, 'Матрицы'); //! Валидацию суммы и разницы предпочтительно вынести на уровень выше
    const validatedType = comparisonTwoMatrixType(A1, A2);
    const detectType = detectorMatrixOrVector(A1);

    if(!validatedSize.result) return validatedSize.message;
    if(!validatedType.result) return validatedType.message;
    if(detectType === 'vector') return vectorDiff(A1, A2);

    return A1.map( (v, i) => vectorDiff(v, A2[i]))
}


/* Умножение матриц
    Сигнатура:
    A1 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 1
    A2 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 1
    |
    |___/ Opertation ----> ( A1 * A2 )
*/
const matrixToMatrix = (A1, A2) => {
    const sameSizeLineAndColumn = 
     comparisonTwoLength(A1[0], A2, 'Длина строки 1 матрицы и высота столбцов 2')

    if ( !sameSizeLineAndColumn.result) return sameSizeLineAndColumn.message;
   
    return A1.map(vector => {
      let columnNum = 0;
  
      while (columnNum < vector.length) {
        vector[columnNum] = vector.reduce((sumOfProducts, a, lineNum) => {
          sumOfProducts += a * A2[lineNum][columnNum];
          return sumOfProducts;
        }, 0)
        columnNum++;
      }
  
      return vector;
    })
  }


  exports [ 
    matrixTransposition,
    vectorToNum,
    matrixToNum,
    vectorSum,
    vectorDiff,
    matrixSum,
    matrixDiff,
    vectorToVector,
    matrixToMatrix 
];
