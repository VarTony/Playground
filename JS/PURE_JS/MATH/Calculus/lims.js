 // -------Alpha--------
 
 import { epsilon } from './exports'
 

/* Критерий Коши, позволяет определять точное зночение предела.
    В качестве аргументов принимает два поздних значения последовательности
    и сравнивает их разницу с ε, если разница меньше значения эпсилон,
    то можно определить предел.
*/
const сauchyСriterion = (x1, x2) => Math.abs(x1 - x2) < epsilon;


// Процедура поиска предела
const findLim = (x1, x2, seqType) => {    
    
  if(сauchyСriterion(x1, x2)) return Math.abs(x1 - x2);
    
  return seqType === 'increasing' 
   ? Infinity  
   : -Infinity;
}
    

  // Определяет тип изменения функции
  const SequeTypeDeterm = func => {
      const n1 = func(1);
      const n2 = func(10 / 1e-30); 
      const n3 = func(10 / 1e-32);
      const expCondition = (n2 === Infinity) && (n3 === Infinity);
  
      if((n1 < n2) && (n2 < n3) || expCondition) return { type: 'increasing' };
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
      increasing: findLim(func(1e+31), func(1e+33), type),
      decreasing: findLim(func(1e+31), func(1e+33), type),
      nonIncreasing: func(1e+33),
      nonDecreasing: func(1e+33)
    }[type];
  
    return  { type,  lim };
  } 

  export { checkLimitOfFunc }
  
  
  