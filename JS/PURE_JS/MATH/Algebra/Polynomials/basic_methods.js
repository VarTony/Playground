
import { parser, collector } from './exports';


/* Алгебраический сумматор, полиномов.
    Сигнатура:
     polynom1 - String -> Полином записанный в форме строки.
     polynom2 - String -> Полином записанный в форме строки.
     sum - Boolean -> Флаг, по умолчанию: (true)-складывать, (false)-вычитать.
*/
const algSumator = (polynom1, polynom2, sum = true) => {
    const pMap1 = parser(polynom1);
    const pMap2 = parser(polynom2);
    const mainPolyMap = new Object(pMap1);
  
    for ([key, value] of Object.entries(pMap2)) {
      if (mainPolyMap[key]) mainPolyMap[key] += sum ? value : (value * -1);
      else mainPolyMap[key] = value;
    }
    return collector(mainPolyMap);
  
}

export { algSumator };