
// Процедура для решений квадратных уравнений через дискиминант.

const squareEquationViaD = (a, b, c) => {
  
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

export { squareEquationViaD };