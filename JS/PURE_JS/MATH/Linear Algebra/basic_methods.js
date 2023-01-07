
/* Умножение вектора на число
 Сигнатура:
 V - [ 𐤀a ϵ Q| a1, ..., an ]: Вектор
 n - (n ϵ R): Множитель
*/
const vectorToNum = (V, n) => V.map( a => a * n);


/* Умножение матрицы на число
Сигнатура:
A - [ v ϵ A, (𐤀a ϵ A: a ϵ R)| 𐤀v := {a1, ..., an} ]: Матрица
n - (n ϵ R): Множитель
*/
const matrixToNum = (A, n) => A.map( vector => vectorToNum(vector, n) );