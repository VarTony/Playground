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


exports [ avarage, median ];