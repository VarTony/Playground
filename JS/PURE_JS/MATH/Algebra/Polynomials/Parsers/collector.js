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

  export { collector };