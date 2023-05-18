

// Генерирует целые числа в заданом диапозоне
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() *  (max - min) + min);
};

export default getRandomInt;