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
  const powers = getMonomsPowers(monom);
  const coefficient = getMonomCoefficient(monom);
  const variables =  getVariablesFromPowerKeys(powers);

  return {
    variables,
    coefficient,
    powers
  }
};


export { monomParser };


