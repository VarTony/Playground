/*
Процедура для нахождения корней квадратного уравнения, не работает с отрицательными коэффициентами 'a', 
так как функционирует в диапазоне вещественных (действительных) чисел.

Используется метод полного квадрата.

Математическая форма:


    ax^2 +- bx -+ c = 0 

a | x^2 +- bx + (b/2)^2 = +-с + (b/2)^2 

    x +- (b/2) = √(c + (b/2)^2)  

    x = (+-√(c + (b/2)^2) +- (b/2)))

    x1 =   (√(c + (b/2)^2) +- (b/2)) / a
    x2 =  (-√(c + (b/2)^2) +- (b/2)) / a

*/


const squareEquation = (a, p, q, fix = 1) => {
    
  let b = p / a;
  let c = q / a;
  let x1, x2;

  if(a === 0) return 0;

  const bDivided = b/2;
  const rightSide = -c + bDivided**2;

  if(rightSide < 0) x1 = x2 = 'i'; // Если правая сторона меньше 0, то ее корни являются мнимыми числами.
  
  else {
    const square = Math.sqrt(rightSide);

    x1 =  (square + (-bDivided)).toFixed(fix);
    x2 =  (-square + (-bDivided)).toFixed(fix);
  }
    
  return {
    x1, 
    x2, 
    initialForm: `Initial form this equation: (x + (${-x1? -x1: x1}))(x + (${-x2? -x2: x2}))`
  }
} 
  
  
console.table(squareEquation(1, 11, 34)); // Initial form this equation: (x + (i))(x + (i))
  
console.table(squareEquation(1, -15, 34)); // Initial form this equation: (x + (-13.6))(x + (-2.4))