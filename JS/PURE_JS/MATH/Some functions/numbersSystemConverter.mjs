// Данный набор процедур, преобразует десятичные числа в иную позиционую систему счислений в диапозоне от 2 до 20;


// Набор дополнительных символов из древне греческого алфавита;
const additionalChars = ['α','β','γ','δ','ε','ζ','η','θ','ί','κ'];


// Расширяет символьный диапазон для систем больше 10;
const charsExpander = num => num > 9 
    ? additionalChars[num - 10]
    : num;


// Финальная сборка числа;
const finalConcatList = ( list, finalChar ) =>
  ( [...list, finalChar].join('') );


// Квантор ошибки.
const warner = () => {
    console.warn(
        'Функция не расчитана для работы с системами счислений более 20 и менее 2'
     );
    throw Error(system);
}


// Основная функция преобразования;
const numSystemConverter = ( num, system, remainders = [] ) => {
  
  if( system > 20 || system < 2 ) return warner();

  if( ( num / system) === 1 )
    return finalConcatList( remainders, 1 );

  else if( system > num ) 
    return finalConcatList( remainders, charsExpander( num ) );
  
  const remainder = num % system;
  const dividedNum = ( num - remainder ) / system;
  
  return numSystemConverter( 
    dividedNum,
    system,
    [ 
      ...remainders, 
      charsExpander( remainder )
    ]
  );
}

console.log( numSystemConverter(47135, 14) ); // β6231
console.log( numSystemConverter(27, 2) ); // 11011


// P.S. Потенциально может работать с каким угодно большим натуральным основанием, 
// нужно лишь добрать недостающие символы для таковой системы счисления.