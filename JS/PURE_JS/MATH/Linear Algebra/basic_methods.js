import { 
    detectorMatrixOrVector,
    checkMatrixForSum, 
    checkLengthTwoVectors
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
    if( !checkLengthTwoVectors ) return checkLengthTwoVectors.message;
    
    return v1.map((a, i) => a * v2[i]) 
}


/* Сложение матриц
    A1 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 1
    A2 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 2
*/
const matrixSum = (A1, A2) => {
    const validatedSize = checkMatrixForSum(A1, A2);
    if(!validatedSize.result) return validatedSize.message;

}



/* Умножение матриц
    A1 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 1
    A2 - [ v ϵ A, (𐤀a ϵ v: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица 1
    |
    |___/ Opertation ----> ( A1 * A2 )
*/

const matrixToMatrix = (A1, A2) => {

    if (A1[1].length !== A2.length)
      return new Error('Эти матрицы нельзя перемножить');
  
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
