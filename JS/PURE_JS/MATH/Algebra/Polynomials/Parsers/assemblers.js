








/* Сборщик многочлена в виде строки из ассоциативеного массива (Обратная функция парсера).
    Сигнатура:
     polyMap - Object: { symbols: num } -> Объект в котором ключ символы, а значение коэффициент.
*/
const polyAssembler = listMonoms => {
  const polynomiel = listMonoms
    .reduce((polynomial, monomSet) =>
      (polynomial + monomsAssembler(monomSet)), '');

  return polynomiel.replace(/^[\+]|[EMPTY]/g, '')
}

  export { polyAssembler };