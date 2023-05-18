const { dx1, diff } = require('./diff.mjs'); 


const exponentiation = (value, degree) => value ** degree;

const selfDef = (f, g, x) => 
      (diff(x, dx1, f) * g(x) - f(x) * diff(x, dx1, g)) / exponentiation(g(x), 2); 

  const f1 = x => x**x;
  const f2 = x => x + 2
  
  const y = selfDef(f1, f2, 2);

  console.log(y);

// Пример частной производной - просто композиция функций.

// Математическая запись  --> `(f / g) -> (f` * g - f * g`) / g^2
