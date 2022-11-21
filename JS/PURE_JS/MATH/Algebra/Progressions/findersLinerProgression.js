// Модуль с поисковыми функциями для членов арифметической прогрессии.

import { linearEquation } from '../Equations/linearEquation'
import { templatEquationSystem } from '../Equations/EquationSystem/templateEquationSystem';
import { L, S } from './linearProgression'; 


// Находит l по 3 переменным
const l_finder = (data) => {
    const [a, b, s, n] = data;
    
    if(b) return { result: L(a, b, n) };
    if(s) return { result: linearEquation((n/2), (a * (n/2)), -s) };
    else  return { result: undefined, explanation: 'Не достаточно данных' }; 
}

// Находит разность арифметрической прогрессии.
const b_finder = (data) => {
    const [a, n, l, s] = data;
    
    if(l) return { result: linearEquation(n, a, -l) };
    if(s) return { result: linearEquation((n * n/2), (a * n/2), -s) };
    else  return { result: undefined, explanation: 'Не достаточно данных' }; 
};

// Находит a - не написана до конца ->
const a_finder = (b, l, n) => linearEquation(1, (b * n) , -l);
// Находит n - не написана до конца ->
const n_finder = (a, b, l) => linearEquation(b, a, -l);


export { l_finder, b_finder, a_finder, n_finder };
