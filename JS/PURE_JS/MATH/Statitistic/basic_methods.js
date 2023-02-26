import sampleGenerator from './sample_generator';


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
    let total = amount
    let increased = 0;
    let i = 0
    
    while(i < period) {
        increased = total * percentCoef
        total += increased;
        
        i++;
    }

    return { 
        amount, percent, period,
        increased, total, 
        incrRelToAmount: (increased * amount**(-1)) * 100
    }
}

export { avarage, median, compInterest };