import { dispersion } from  './exports.mjs'; 

// σ|S = √(∑(x-μ)2)/n | √D : Среднеквадратическое отклонение
const standardDeviation = list => Math.sqrt(dispersion(list));

export { standardDeviation };

