// -------Alpha--------> (1 + (1 / x)) ** x ) is work

import { сauchyСriterion } from '../exports';


// Определяет: lim ϵ N
const isNaturalLim = (lim, delta = 0.1) =>
  Math.abs((Math.round(lim) - delta) - lim) < delta
  || Math.abs(lim) < delta


// Процедура поиска предела
const findLim = (x1, x2, seqType) => {

  if (сauchyСriterion(x1, x2)) return isNaturalLim(x2)
    ? +x2.toFixed(1)
    : +x2.toFixed(10)

  return seqType === 'increasing'
    ? Infinity
    : -Infinity;
}


// Определяет тип изменения функции
const SeqTypeDeterm = func => {
  const n1 = func(1);
  const n2 = +func(10 / 1e-10).toFixed(15);
  const n3 = +func(10 / 1e-10 + 1).toFixed(15);

  const expCondition = (n2 === Infinity) && (n3 === Infinity);

  if ((n1 < n2) && (n2 < n3) || expCondition) return { type: 'increasing' };
  if ((n1 > n2) && (n2 > n3)) return { type: 'decreasing' };
  if ((n1 >= n2) && (n2 >= n3)) return { type: 'nonIncreasing' };
  if ((n1 <= n2) && (n2 <= n3)) return { type: 'nonDecreasing' };

  return { type: 'undefined' }
}

// По типу изменения функции находит ее придел; 
const checkLimitOfFunc = func => {
  const type = SeqTypeDeterm(func).type;

  if (type === 'undefined') return { type, lim: 'Not found' }

  const lim = {
    increasing: findLim(func(1e+10), func(10 / 1e-10 + 1), type),
    decreasing: findLim(func(1e+10), func(10 / 1e-10 + 1), type),
    nonIncreasing: +func(1e+10).toFixed(1),
    nonDecreasing: +func(1e+10).toFixed(2)
  }[type];

  return { type, lim };
}


export { checkLimitOfFunc }


