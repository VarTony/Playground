import { polyParser, polyAssembler } from './exports';


/* Вспомогательная функция складывающая 2 распаршенных одночлена
  Сигнатура:
    monSet1 - Object -> { variables: String, coefficient: Number, powers: { key_n:  Number_n } }
    monSet2 - Object -> { variables: String, coefficient: Number, powers: { key_n:  Number_n } }
*/
const mergeTwoMonomsSet = (monSet1, monSet2) => ({
  variables: monSet1.variables,
  coefficient: (monSet1.coefficient + monSet2.coefficient),
  powers: monSet1.variables
    .reduce((powers, variable) => {
      if (variable === 'EMPTY') return powers;

        powers[variable] = Math.max(
          monSet1.powers[variable],
          monSet2.powers[variable]
         );
      return powers;
    }, {})
})


/* Алгебраический сумматор, полиномов.
    Сигнатура:
     polynom1 - String -> Полином записанный в форме строки.
     polynom2 - String -> Полином записанный в форме строки.
     sum - Boolean -> Флаг, по умолчанию: (true)-складывать, (false)-вычитать.

     return - String -> Результат сложения в форме строки
*/
const polynomAlgSumator = (polynom1, polynom2, sum = true) => {
  const monomList1 = polyParser(polynom1);
  const monomList2 = polyParser(polynom2);
  const mainMonomsList = [...monomList1, ...monomList2];

  const algSumOfMonoms = mainMonomsList.reduce((acc, monomSet) => {
    const variables = monomSet.variables.join(' ');
    if (acc[variables]) {
      
      const mergedMonoms = mergeTwoMonomsSet(acc[variables], monomSet);
      if (mergedMonoms.coefficient === 0) return acc;
      
      acc[variables] = mergedMonoms;
    }
    else acc[variables] = monomSet;

    return acc;
  }, {});

  const listSumsofMonoms = Object.values(algSumOfMonoms);
  const strOfMonomsSum = polyAssembler(listSumsofMonoms);

  return strOfMonomsSum; 
}



export { polynomAlgSumator };