import { standardDeviation } from './exports.mjs';

// SE = σ/√n : Стандартная ошибка (выборки);
const SE = (list, n = list.length) => standardDeviation(list) / Math.sqrt(n);

export { SE };