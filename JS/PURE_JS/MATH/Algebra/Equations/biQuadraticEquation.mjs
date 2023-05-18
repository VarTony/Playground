/* Вспомогательные функции */

// Процедура для решений квадратных уравнений через дискиминант.
import squareEquationViaD from './exports.mjs'; 

//Ковертирует результат в мнимые значения.
const imaginaryNumbersConverter = (num) => `${ Math.abs(num) }i`;


/* Основная */
const biQuadraticEquation = (a, b, c) => {
  const squareRoots = squareEquationViaD(a, b, c);

  if(!squareRoots.result) return squareRoots.message;

  const { X1: Y1, X2: Y2 } = squareRoots.result;
  
  return {
    X1: Y1 >= 0 
        ? Math.sqrt(Y1)
        : imaginaryNumbersConverter(Y1), 

    X2: Y1 >= 0
    ? ( Math.sqrt(Y1) * (-1))
    : imaginaryNumbersConverter(Y1),

    X3: Y2 >= 0
    ? Math.sqrt(Y2)
    : imaginaryNumbersConverter(Y2),

    X4: Y2 >= 0
    ? ( Math.sqrt(Y2) * (-1))
    : imaginaryNumbersConverter(Y2),
  }    
}



console.table(biQuadraticEquation(-2, 6, 8)); // X1 = 3, X2 = -3, X3 = '7i', X4 = '7i';