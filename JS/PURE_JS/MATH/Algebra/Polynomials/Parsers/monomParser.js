/* Извлекатель степени из одночлена (Работает с только целыми степенями)
    Сигнатура:
     monom - String -> Одночлен записанный строкой (Пример: '-15biba^-25')

     return - Object -> Пример: { b: 2, i: 1, a: -25 }
      
P.S Складывает степени одинаковых переменных
*/
const getMonomsPowers = monom => monom
  .split(/([a-z]\^?\-?\d+)/g)
  .reduce((powersMap, chunk) => {
    if (chunk.includes('^')) {
      const splited = chunk.split('^');
      const key = splited[0];
      const value = powersMap[key]
        ? (powersMap[key] + +splited[1])
        : +splited[1];
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
  const isVars = Object.keys(powers);
  return isVars.length >= 1 ? isVars : ['EMPTY'];
}


/* Вспомогательная функция возводить числовой коэфф. в степень
    Сигнатура:
     monom - String -> Одночлен в виде строки

    return - String -> Одночлен с возведенным в "свою" степень коэффициентом
*/
const coeffPowerHandler = monom => {
  if (/\d+\^\d+[a-z]*/.test(monom)) {
    const splited = monom.split('^');
    const base = splited[0];
    const power = splited[1].replace(/[a-z]/g, '');
    const vars = splited[1].replace(/\d/g, '');
    const rest = `^${splited.slice(2).join('^')}`;

    return ((+base) ** (+power)) + vars + rest;
  }
  return monom;
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
  const handledMonom = coeffPowerHandler(monom);
  const powers = getMonomsPowers(handledMonom);
  const coefficient = getMonomCoefficient(handledMonom);
  const variables = getVariablesFromPowerKeys(powers);

  return {
    variables,
    coefficient,
    powers
  }
}


export { monomParser };


