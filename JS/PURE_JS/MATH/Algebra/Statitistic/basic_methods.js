
// μ - Среднее африфметическое;
const avarage = (list, n = (list.leangth - 1)) => list.reduce((sum, elem) => {
    sum += elem;
    return sum;
}, 0) / n;


// Me - медиана выборки;
const median = (list, n = (list.length - 1), m = Math.ceil(n/2)) => (n%2 === 0)
    ? list[m] 
    : (list[m] + list[m - 1]) / 2;


const getRandomInt = (min, max) => {
        return Math.floor(Math.random() *  (max - min) + min);
}

// Генератор тестовой выборки/(генеральной совокупности)
const sampleGenerator = (n = 30, range = [ 120, 150 ]) => {
    let i = 0;
    const result = []; 

    while(i < n) {
        result[i] = getRandomInt(range[0], range[1]);
        i++;
    }

    return result;

}



exports [ avarage, median, sampleGenerator ];