/*
 Набор функций для решения би-квадратных уравнений.
*/


/* Вспомогательные функции */

//Ковертирует результат в мнимые значения.
const imaginaryNumbersConverter = (num) => `${ Math.abs(num) }i`;

//Вспомогательная функция для решения квадратных уравнений реализована через дискриминант
const squareEquationFromD = (a, b, c) => {
  
    const D = (b ** 2) - (4 * a * c);
  
  if (D < 0) return { result: undefined, message: 'Не имеет корней в действительном ряду' };

  if (D === 0) return { result: {
      X1: -b / (2 * a),
      X2: -b / (2 * a)
    }, 
    message: 'Имеет один корень' 
  };

  const rootFinder = (sign = 1) =>
    ((-b + (Math.sqrt(D) * sign)) / (2 * a)); // (-b +- √D) / (2a)
  
  const roots = { X1: rootFinder(),
                  X2: rootFinder(-1) };

  return { result: roots, message: 'Найдены оба корня' };
}


/* Основная */
const biQuadraticEquation = (a, b, c) => {
  const squareRoots = squareEquationFromD(a, b, c);

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