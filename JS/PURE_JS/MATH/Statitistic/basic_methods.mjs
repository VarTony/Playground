
// μ - Среднее африфметическое;
const avarage = (list, n = (list.length)) => list.reduce((sum, elem) => {
    sum += elem;
    return sum;
}, 0) / n;


// Me - медиана выборки;
const median = (list, n = (list.length), m = Math.ceil(n/2)) => (n%2 === 0)
    ? list[m] 
    : (list[m] + list[m - 1]) / 2;


// Подсчет сложного процента
const compInterest = (amount, percent, period) => {
    const percentCoef = percent * 0.01;
    const total = amount * (1 + percentCoef)**period;
    const increased = total - amount;

    return { 
        amount, percent, period,
        increased, total, 
        incrRelToAmount: (increased * amount**(-1)) * 100
    }
}

export { avarage, median, compInterest };