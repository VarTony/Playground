import { 
    detectorMatrixOrVector,
    comparisonTwoLength,
    comparisonTwoMatrixType
} from './exports';






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
    v1 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 1
    v2 - [ 𐤀a ϵ R| a1, ..., an ]: Вектор 2
*/
const vectorSum = (v1, v2) => v1.map((a, i) => a + v2[i]) 


/* Умножение векторов 
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


/* Умножение матриц
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
    vectorToNum,
    matrixToNum,
    vectorSum,
    matrixSum,
    vectorToVector,
    matrixToMatrix 
];
