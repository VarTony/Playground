const square = x => x * x;

const dx1 = 1e-10;
const dx2 = 1e-15;

const def = (x, dx = dx1, f = square) => (f(x + dx) - f(x)) / dx; 
// Просто отношения приращения прошедшего через функцию(или приращения по y) с приращением по иксу;
//(Деление в эпсилон окрестности с предварительным прохождением числителя через функцию)



const result1 = def(5);
const result2 = def(5, dx2);


console.log(`result1 = ${result1}`);//result1 = 10.00000082740371   
console.log(`result2 = ${result2}`); //result2 = 10.658141036401503
//Здесь можно заметить, что результат(result2) больше предыдущего и имеет явную зависимость от предела констатированого в dx;

console.log(`result2 - result1 = ${result2 - result1}`); //result2 - result1 = 0.6581402089977928

// То есть, чем ближе наш придел к 0, тем большее  значение получаем в результате дифферренцирования
// из чего можно сделать вывод, что при lim dx -> 0 : def(5) -> 11;