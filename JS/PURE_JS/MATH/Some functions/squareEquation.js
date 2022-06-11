/*
Процедура для нахождения корней квадратного уравнения, не работает с отрицательными коэфициэнтами 'a', 
так как функционирует в диапозоне вещественных(действительнаых) чисел.

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
  
    if(a < 0) return 'Эта версия не работает с мнимыми числами';
  
    if(a === 0) return 0;
  
    const bDivided = Math.abs((b/2));
    
    const square = (Math.sqrt((-c) + (bDivided)**2));
    
    const x1 =  ((square + bDivided) / a).toFixed(fix);
    const x2 =  ((-square + bDivided) / a).toFixed(fix);
  
    return {
      x1, 
      x2, 
      initialForm: `Initial form this equation: (x + (${-x1}))(x + (${-x2}))`
    }
  } 
  
  
  console.log(squareEquation(1, -15, 34)); // Initial form this equation: (x + (-12.2))(x + (-2.8))