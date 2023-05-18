// Набор процедур для генерации тестовой выборки.

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


export { getRandomInt, sampleGenerator };