/* Извлекатель степени из одночлена (Работает с только целыми степенями)
    Сигнатура:
     monom - String -> Одночлен записанный строкой (Пример: '-15biba^-25')

     return - Object -> Пример: { b: 2, i: 1, a: -25 }
      
P.S Складывает степени одинаковых переменных
*/
const getMonomsPowers = monom => monom
  .replace(/([\+-]?([a-z]\^\-){1}\d+)/g, ' $1')
  .split(' ')
  .reduce((powersMap, chunk) => {
    if (chunk.includes('^')) {
      const value = +chunk.slice(2);
      const key = chunk[0];

      powersMap[key] = value;
    }
    else chunk.replace(/[\+-]|\d/g, '')
      .split('')
      .forEach(key => powersMap[key] ? powersMap[key] += 1 : powersMap[key] = 1);

    return powersMap;
  }, {})
  


/* Извлекатель множителя одночлена
  Сигнатура:
    monom - String -> Одночлен записанный строкой (Пример: '15b^5')

    return - Number -> Пример: coefficient: 15
*/
const getMonomCoefficient = monom => {
  const coefficient = monom.match(/^([\+-]?\d*)/g)[0];
  
  const isOnlySign = /^[\+-]$/.test(coefficient);
  const isCoefEmpty =  coefficient.trim() === '';

  return isOnlySign || isCoefEmpty
    ? +(coefficient + 1) 
    : +coefficient;
}


/* Извлекатель переменных из одночлена
    Сигнатура:
     monom - String -> Одночлен записанный строкой (Пример: '-ia')

     return - String -> Пример: symbols: 'a'
*/
const getVariablesFromPowerKeys = powers => {
  const isVars =  Object.keys(powers).join(' ');
  return isVars !== '' ? isVars : 'EMPTY';
}


/* (Beta) Парсер для одночленов (Работает с только целыми степенями)
    Сигнатура:
     monom - String -> Одночлен записанный строкой (Пример: '-15biba^-25')

     return - Object -> Пример: 
      { 
        symbols: 'biba',
        coefficient: -15,
        powers: { b: 2, i: 1, a: -25 }
      }
P.S Складывает степени, если переменные одинаковы
*/
const monomParser = monom => {
  const symbols = monom.replace(/[\+-]|\d|\^/g, '');
  const coefficient = monom.replace(/([a-z]*(\^[\+-]\d*)?)/g, '');
  const powers = monom
    .replace(/([\+-]?([a-z]\^\-){1}\d+)/g, ' $1')
    .split(' ')
    .reduce((powersMap, chunk) => {
      if(chunk.includes('^')) {
        const value = +chunk.slice(2);
        const key = chunk[0];
        
        powersMap[key]  = value;     
      }
      else chunk.replace(/[\+-]|\d/g, '')
        .split('')
        .forEach(key => powersMap[key] ? powersMap[key] += 1 : powersMap[key] = 1 );

      return powersMap;
    }, {})
  
  const signCoeff = monom[0] === '-' ? '-' : '';

  return {
    symbols: (symbols !== '' ? symbols : 'EMPTY'),
    coefficient: (coefficient !== '' ? +coefficient : +(signCoeff + '1')),
    powers
  }
}


/*  Парсер для полиномов первой степени.
    Сигнатура:
     polynom - String -> Полином в виде строки
*/
const parser = polynom => {
    const p = polynom.trim().toLowerCase();
    const listOfMonoms = p.replace(/([\+-])/g, ' $1').split(' ');
  
    const keys = listOfMonoms.reduce((map, monom) => {
      const symbols = monom.split(/[\+-]\d+|\d+|[\+-]/).join('');
      const num = monom.split(/[a-z]+/).join('');
  
      const key = symbols === '' ? 'EMPTY' : symbols;
      const value = num === '+' || num === '-' ? 1 : +num;
  
      map[key] = map[key] ? map[key] : 0;
      map[key] += value;
  
      return map
    }, {});
  
    return keys;
}


/* Сборщик многочлена в виде строки из ассоциативеного массива (Обратная функция парсера).
    Сигнатура:
     polyMap - Object: { symbols: num } -> Объект в котором ключ символы, а значение коэффициент.
*/
const collector = polyMap => {
    let polynom = '';
  
    for ([key, value] of Object.entries(polyMap)) {
      if (value === 0) continue;
      if (value === 1) value = '';
      
      polynom += value < 0 && value !== ''
        ? String(value) + key
        : '+' + String(value) + key
    }
  
    return polynom.replace(/^\+|[A-Z]/g, '');
  };


  export { parser, collector };
