/* Функция преобразующая список в множество(список уникальных значений) 
  Сигнатура:
  list: Преобразуемый список 
  numSet: Флаг указывающий чмсловое ли множество преобразуется
*/
const listToSet = (list, numSet = 1 ) =>  list.reduce((set, elem) => {
    set = set.includes(numSet ? +elem : elem) 
      ? set 
      : [...set, elem];
  
    return set;
  }, []);

  export { listToSet };