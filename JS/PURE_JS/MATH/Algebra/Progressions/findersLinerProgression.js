// Модуль с поисковыми функциями для членов арифметической прогрессии.

import { linearEquation } from '../Equations/linearEquation'
import { squareEquationViaD } from '../Equations/squareEquationViaD'
import { templatEquationSystem } from '../Equations/EquationSystem/templateEquationSystem';
import { L, S } from './linearProgression'; 


// Проверяет валидность членов арифметической прогрессии ->
const membersValidator = (...members) => {
    const report = members.reduce( (result, element) => {
      result = (!isNaN(element) && (element || element === 0)) && result;
      return result;
    }, 1)
  return report;
  }
  
  // Находит сумму прогрессии.
  const s_finder = data => {
    const { a, d, n } = data;
    const l = data.l ? data.l : L(a, d, n);
    
    if(membersValidator(a, d, n, l)) return { result: S(a, d, n, l) };
    return { result: undefined, explanation: 'Не достаточно данных' }
  }
  
  // Модуль с поисковыми функциями для членов арифметической прогрессии.
  
  
  // Находит l по 3 переменным
  const l_finder = data => {
    const { a, d, n, s } = data;
    
    if(membersValidator(a, n, s)) return { result: linearEquation((n/2), (a * (n/2)), -s) };
    if(membersValidator(a, d, n)) return { result: L(a, d, n) };
      
    return { result: undefined, explanation: 'Не достаточно данных' }; 
  }
  
  
  // Находит разность арифметрической прогрессии.
  const d_finder = data => {
      const { a, n, l, s } = data;
  
      if(membersValidator(a, n, l)) return { result: linearEquation(n, a, -l) };
      if(membersValidator(a, n, s)) return { result: linearEquation((n * n/2), (a * n/2), -s) };
      if(membersValidator(n, s)) { // <- Есть вопросики
        const result = templatEquationSystem(
        { a: 1, b: (n-1), c: -s },
        { a: (n/2), b: ((n-1) * n/2), c: -s }).y;
        return { result };
      }
      
      return { result: undefined, explanation: 'Не достаточно данных' }; 
  };
  
  
  // Находит a ->
  const a_finder = data => {
    const { d, n, l, s } = data;
    
    if(membersValidator(d, n, l)) return { result: linearEquation(1, (d * (n - 1)) , -l) };
    if(membersValidator(n, l, s)) return { result: linearEquation(n/2, (l*(n/2)), -s) }
    if(membersValidator(d, n, s)) {
      const result = templatEquationSystem(
        { a: -1, b: 1, c: (d * (n - 1)) },
        { a: n/2, b: n/2, c: -s }).y
        
      return { result }
    }
    return { result: undefined, explanation: 'Не достаточно данных' };
  }
    
  // Находит n  ->
  const n_finder = data => { 
    const { a, d, l, s } = data;
  
    if(membersValidator(a, d, l)) return { result: linearEquation(d, a, -l) }
    if(membersValidator(d, l, s)) return { result: squareEquationViaD((-1/d + l/d)/2, l/2*(-1/d + l/d), -s).result.x1 }
    if(membersValidator(a, l, s)) return { result: linearEquation((a + l)/2 , -s) }
    if(membersValidator(a, d, s)) {
      const result = squareEquationViaD(d/2, a/2,  -s).result.x1
      return { result };
    }
    
    return { result: undefined, explanation: 'Не достаточно данных' };
  };
  
  
  
  // Ищет все члены арифметической прогрессии, по 3 значениям.
  
  const finderDispatcher = (data) => {
    const keys = Object.keys(data);
    if(keys.length < 3) return 'Недостаточно данных';
  
    const { a, d, n, l, s } = data;
    const result = { a, d, n, l, s };
  
    console.log(result);
    
    if(!a) result.a = a_finder(result).result;
    if(!d) result.d = d_finder(result).result;
    if(!n) result.n = n_finder(result).result;
    if(!l) result.l = l_finder(result).result;
    if(!s) result.s = s_finder(result).result;
  
    const allFined = !Object.values(result).includes(undefined);
    
    return  allFined 
      ? result 
      : finderDispatcher(result);
  }
  
  console.log(finderDispatcher({ s: 3, l: 5, d: 3 }));
  
  console.log(S({ a: 5, l: 3, b: 30 }));
// Alpha ( Не протестирована должным образом )
export { l_finder, b_finder, a_finder, n_finder, s_finder };
