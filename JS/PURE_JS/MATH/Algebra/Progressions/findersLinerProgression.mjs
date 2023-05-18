// Модуль с поисковыми функциями для членов арифметической прогрессии.

/*
 * Типовые комментарии.
(1) - Параметры подобраны в соответствии с формулой суммы АП.
(2) - Параметры подобраны в соответствии с формулой последнего члена АП.
*/

import { linearEquation } from '../Equations/linearEquation'
import { squareEquationViaD } from '../Equations/squareEquationViaD'
import { templatEquationSystem } from '../Equations/EquationSystem/templateEquationSystem';
import { L, S } from './linearProgression'; 


// Проверяет валидность известных членов арифметической прогрессии ->
const membersValidator = (...members) => {
    const report = members.reduce( (result, element) => {
      result = (!isNaN(element) && (element || element === 0)) && result;
      return result;
    }, 1)
  return report;
  }
  

  // Находит сумму(s) АП.
  const s_finder = data => {
    const { a, d, n } = data;
    const l = data.l ? data.l : L(a, d, n);
    
    if(membersValidator(a, d, n, l)) return { result: S(a, d, n, l) };
    return { result: undefined, explanation: 'Не достаточно данных' }
  }
  
  
  // Находит последний(l) член АП.
  const l_finder = data => {
    const { a, d, n, s } = data;
    
    if(membersValidator(a, n, s)) return { result: linearEquation((n/2), (a * (n/2)), -s) }; // (1)*
    if(membersValidator(a, d, n)) return { result: L(a, d, n) };
    if(membersValidator(a, d, s)) {
        const roots = squareEquationViaD(d/2, a/2, -s).result  // (1)*
        const { x1, x2 } = roots;  
        
        return { result: x1 > x2 ? x1 : x2 };
    }
      
    return { result: undefined, explanation: 'Не достаточно данных' }; 
  }
  
  
  // Находит разность(d) АП.
  const d_finder = data => {
      const { a, n, l, s } = data;
  
      if(membersValidator(a, n, l)) return { result: linearEquation(n, a, -l) } // (2)*
      if(membersValidator(a, n, s)) return { result: linearEquation((n * n/2), (a * n/2), -s) }; // (1)*
      
      return { result: undefined, explanation: 'Не достаточно данных' }; 
  };
  
  
  // Находит первый член(a) АП.
  const a_finder = data => {
    const { d, n, l, s } = data;
    
    if(membersValidator(d, n, l)) return { result: linearEquation(1, (d * (n - 1)) , -l) } // (2)*
    if(membersValidator(n, l, s)) return { result: linearEquation(n/2, (l*(n/2)), -s) } // (1)*
    if(membersValidator(d, n, s)) {
        const result = templatEquationSystem(
         { a: -1, b: 1, c: (d * (n - 1)) }, // (2)* С 2 неизвестными коэффициэнтами 
         { a: n/2, b: n/2, c: -s } // (1)*
        ).y 
        return { result }
    }
    return { result: undefined, explanation: 'Не достаточно данных' };
  }
   
  
  // Находит ограничение(n) АП.
  const n_finder = data => { 
    const { a, d, l, s } = data;
  
    if(membersValidator(a, d, l)) return { result: linearEquation(d, a, -l) } // (2)*
    if(membersValidator(d, l, s)) return { result: squareEquationViaD((-1/d + l/d)/2, l/2*(-1/d + l/d), -s).result.x1 } // Параметры подобраны вручную пока нет универсальной системы второй степени.
    if(membersValidator(a, l, s)) return { result: linearEquation((a + l)/2 , -s) }// (1)*
    if(membersValidator(a, d, s)) {
        const roots = squareEquationViaD(d/2, a/2,  -s).result
        const { x1, x2 } = roots;
        
        return { result: x1 > x2 ? x1 : x2 };
    }
    
    return { result: undefined, explanation: 'Не достаточно данных' };
  };
  
  
  // Ищет любые два неизвестных АП, по 3 известным значениям.
  const finderDispatcher = (data, imaginCount = 0) => {
    const keys = Object.keys(data);
    if(keys.length < 3) return 'Недостаточно данных';
  
    const { a, d, n, l, s } = data;
    const result = { a, d, n, l, s };
    
    if(!a) result.a = a_finder(result).result;
    if(!d) result.d = d_finder(result).result;
    if(!n) result.n = n_finder(result).result;
    if(!l) result.l = l_finder(result).result;
    if(!s) result.s = s_finder(result).result;
  
    const allFined = !Object.values(result).includes(undefined || 'i?');
    const imaginNums = Object.values(result).includes('i?')
    imaginCount += imaginNums? 1: 0;
    
    if(imaginCount >= 2) return ('Данная прогрессия выходит за границы действительных чисел.');
    
    return  allFined 
      ? result 
      : finderDispatcher(result, imaginCount);
  }
  
console.log(finderDispatcher({ s: 3, l: 5, d: 3 }));
  
console.log(S({ a: 5, l: 3, b: 30 }));
// Beta ( Частично протестирована )
export { l_finder, d_finder, a_finder, n_finder, s_finder };
