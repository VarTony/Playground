import { parser, collector } from './exports';


/* Вспомогательная функция складывающая 2 распаршенных одночлена
  Сигнатура:
    monSet1 - Object -> { variables: String, coefficient: Number, powers: { key_n:  Number_n } }
    monSet2 - Object -> { variables: String, coefficient: Number, powers: { key_n:  Number_n } }
*/
const mergeTwoMonomsSet = (monSet1, monSet2) => ({
  variables: monSet1.variables,
  coefficient: (monSet1.coefficient + monSet2.coefficient),
  powers: monSet1.variables
    .reduce((powers, varbl) => {
        powers[varbl] = Math.max(
          monSet1.powers[varbl],
          monSet2.powers[varbl]
         );
      return powers;
    }, {})
})


/* Алгебраический сумматор, полиномов.
    Сигнатура:
     polynom1 - String -> Полином записанный в форме строки.
     polynom2 - String -> Полином записанный в форме строки.
     sum - Boolean -> Флаг, по умолчанию: (true)-складывать, (false)-вычитать.

     return: 
*/
const polynomAlgSumator = (polynom1, polynom2, sum = true) => {
  const monomList1 = polyParser(polynom1);
  const monomList2 = polyParser(polynom2);
  const mainMonomsList = [...monomList1, ...monomList2];

  const algSumOfMonoms = mainMonomsList.reduce((acc, monomSet) => {
    const variables = monomSet.variables.join(' ');
    if (acc[variables])
      acc[variables] = mergeTwoMonomsSet(acc[variables], monomSet)
    else acc[variables] = monomSet;

    return acc;
  }, {});

  return algSumOfMonoms;  //constructPolynom
}

export { polynomAlgSumator };