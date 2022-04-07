
const wrapper = (before, fn, after) => (...args) => after(...fn(...before(...args)));


const sumElems = (...elems) => elems.reduce((acc, elem) => acc + elem, 0);

const concatElems = (...elems) => elems.join(' ');

const logElems = (...elems) => elems.map(elem => {
  console.log(elem);
  return elem;
})

wrapper(logElems, concatElems, sumElems)
 (1, 'something', 'somebody', '55', NaN, 11);

 // Паттерн позволяющий пропускать данные через список из комбинаций 3 разных функций.