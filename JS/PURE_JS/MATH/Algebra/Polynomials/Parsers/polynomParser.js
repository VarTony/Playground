import { monomParser } from "./exports";


/*  Парсер для полиномов первой степени.
    Сигнатура:
     polynom - String -> Полином в виде строки
*/
const polyParser = polynom => {
    const p = polynom.trim().toLowerCase();
    const monomsList = p.replace(/[\+-](\d[a-z]\^[-]?\d)*/g, ' $1').split(' ');
    const ParsedMonomsList = monomsList.map(monom => monomParser(monom));
  
    return ParsedMonomsList;
  }

  
  export { polyParser };