 // -------Alpha--------
 
 import { epsilon } from './exports'
 

/* Критерий Коши, позволяет определять точное зночение предела.
    В качестве аргументов принимает два поздних значения последовательности
    и сравнивает их разницу с ε.
*/
const сauchyСriterion = (x1, x2) => {
    const residual = Math.abs(x1 - x2);
    
    if(residual < epsilon) return residual;
    
    return false;
  }
    

  // Определяет тип изменения функции
  const SequeTypeDeterm = func => {
      const n1 = func(1);
      const n2 = func(10 / 1e-30); 
      const n3 = func(10 / 1e-32);
  
      if((n1 < n2) && (n2 < n3)) return { type: 'increasing' };
      if((n1 > n2) && (n2 > n3)) return { type: 'decreasing' };
      if((n1 >= n2) && (n2 >= n3)) return { type: 'nonIncreasing' };
      if((n1 <= n2) && (n2 <= n3)) return { type: 'nonDecreasing' };
  
      return { type: 'indefined' }
  }
  
  // По типу изменения функции находит ее придел; 
  const checkLimitOfFunc = func => {
    const type = SequeTypeDeterm(func).type;
    
    if(type === 'indefined') return { type, lim: 'Not found' }
    
    const lim = {
      increasing: сauchyСriterion(func(1e+31), func(1e+33)),
      decreasing: сauchyСriterion(func(1e+31), func(1e+33)),
      nonIncreasing: func(1e+33),
      nonDecreasing: func(1e+33)
    }[type];
  
    return  { type,  lim };
  } 

//   export {  }
  
  
  