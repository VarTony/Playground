/*
Процедура для нахождения корней квадратного уравнения, не работает с отрицательными коэффициентами 'a', 
так как функционирует в диапазоне вещественных (действительных) чисел.

Используется метод полного квадрата.

Математическая форма:


    ax^2 +/- bx -/+ c = 0 

a | x^2 +/- bx + (b/2)^2 = +/- с + (b/2)^2 

    x +/- (b/2) = _/(c + (b/2)^2)  

    x = (+/- _/(c + (b/2)^2) +/- (b/2)))

    x1 =   (_/(c + (b/2)^2) +/- (b/2)) / a
    x2 =  (-_/(c + (b/2)^2) +/- (b/2)) / a

*/


const squareEquation = (a, b, c, fix = 1) => {
    let x1, x2;
  
    if(a < 0) return 'Эта версия не работает с мнимыми числами';
    if(a === 0) return 0;
  
    const bDivided = (b/2);
    const rightSide = (c * -1) + Math.abs(bDivided)**2;
  
    if(rightSide < 0) x1 = x2 = 'i'; // Если правая сторона меньше 0, то ее корни являются мнимыми числами
    
    else {
      const square = Math.sqrt(rightSide);
  
      x1 =  ((square + (-bDivided)) / a).toFixed(fix);
      x2 =  ((-square + (-bDivided)) / a).toFixed(fix);
    }
      
    return {
      x1, 
      x2, 
      initialForm: `Initial form this equation: (x + (${-x1? -x1: x1}))(x + (${-x2? -x2: x2}))`
    }
  } 
  
  
  console.table(squareEquation(1, 11, 34)); // Initial form this equation: (x + (i))(x + (i))
  
  console.table(squareEquation(1, -15, 34)); // Initial form this equation: (x + (-12.2))(x + (-2.8))