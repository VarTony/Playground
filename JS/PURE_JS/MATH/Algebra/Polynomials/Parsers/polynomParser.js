import { monomParser } from "./exports";


/* Вспомогательная функция для обработки одночленом, перед отправкой в парсер
    Сигнатура:
     monom - String -> Полином в виде строки

    return - String -> Одночлен с возведенным в свою степень коэффициентом
*/
const powerHandler = monom => {
    if (/\d+\^\d+/.test(monom)) {
      const splited = monom.split('^');
      const base = splited[0];
      const power = splited[1];
  
      return String((+base) ** (+power));
    }
    return monom;
  }


/*  Парсер для полиномов первой степени.
    Сигнатура:
     polynom - String -> Полином в виде строки
*/
const polyParser = polynom => {
    const neatPolynom = polynom.trim().toLowerCase();
    const monomsList = neatPolynom
     .replace(/(?<!\^)([\+\-]{1})/g, ' $1') // Находит знак алгебраической суммы, не являющийся знаком степени/
     .split(' ');
    const ParsedMonomsList = monomsList.map(monom => monomParser(powerHandler(monom)));
  
    return ParsedMonomsList;
  }

  
  export { polyParser };