const {dx1, diff, square} = require('./diff.js'); 

//(x^n)` = (n * x^n-1);

const lambda = degree => x => (x ** (degree - 1)) * x;

const exponentiationDiff = (x, degree) => diff(x, dx1, lambda(degree));

const y1 =   exponentiationDiff(2, 5);
const y2 = 5 * (2 ** 4);

console.log(y1, y2);

//Нахождение степенной производной, на этом моменте можно увидеть, 
//что анализ в дальнейшем будет развиваться как разные композиции функций с функцией дифференцирования.

//Математическая запись : (x ^ 5)` = (x ^ 4 * x) = 4X * x + x^4 * 1 = 5x^4 
