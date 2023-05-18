/* Сборщик одночлена в строку из разобранной формы (Обратная функция парсера одночлена).
  Сигнатура:
     listMonoms - Object: { 
         symbols: 'biba',
         coefficient: -15,
         powers: { b: 2, i: 1, a: -25 }
        
        }

      return - String: '-15b^2ia^-25';
*/
const monoAssembler = monom => {
  const coefficient = Math
    .abs(monom.coefficient) === 1 ? '' : monom.coefficient;
  const powers = monom.powers;
  const variables = Object.keys(powers)
    .reduce((monomStr, varbl) => {

      if (powers[varbl] === 0) monomStr += '';
      if (powers[varbl] === 1) monomStr += `${varbl}`;
      else monomStr += `${varbl}^${+powers[varbl]}`;

      return monomStr;
    }, '');
  const monomInStr = coefficient + variables;

  return coefficient === '' || coefficient > 0
    ? `+${monomInStr}`
    : monomInStr;
}


/* Сборщик многочлена в виде строки из списка разобраных однночленов (Обратная функция парсера многочленов).
    Сигнатура:
     listMonoms - Array: [ 
        { 
         symbols: 'biba',
         coefficient: -15,
         powers: { b: 2, i: 1, a: -25 }
        }, 
        ...]

      return - String: '-15b^2ia^-25' + ... + ' ';
*/
const polyAssembler = listMonoms => {
  const polynomiel = listMonoms
    .reduce((polynomial, monomSet) =>
      (polynomial + monoAssembler(monomSet)), '');

  return polynomiel.replace(/^[\+]|[EMPTY]/g, '')
}

  export { polyAssembler, monoAssembler };