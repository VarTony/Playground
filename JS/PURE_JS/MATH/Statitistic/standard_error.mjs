import { standardDeviation } from '.';

// SE = σ/√n : Стандартная ошибка (выборки);
const SE = (list, n = list.length) => standardDeviation(list) / Math.sqrt(n);

exports [ SE ];