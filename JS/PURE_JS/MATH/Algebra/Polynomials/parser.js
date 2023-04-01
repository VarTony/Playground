
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
      
      polynom += value < 0
        ? String(value) + key
        : '+' + String(value) + key
    }
  
    return polynom.replace(/^\+|[A-Z]/g, '');
  };


  export { parser, collector };
