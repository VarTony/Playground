import { monomParser } from "./exports";


/*  Парсер для полиномов первой степени.
    Сигнатура:
     polynom - String -> Полином в виде строки
*/
const polyParser = polynom => {
    const neatPolynom = polynom.trim().toLowerCase();
    const monomsList = neatPolynom
     .replace(/(?<!\^)([\+\-]{1})/g, ' $1') // Находит знак алгебраической суммы, не являющийся знаком степени/
     .split(' ');
    const ParsedMonomsList = monomsList.map(monom => monomParser(monom));
  
    return ParsedMonomsList;
  }

  
  export { polyParser };