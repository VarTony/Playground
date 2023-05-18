/* Преобразует слово в гетерограмму(слово с уникальными знаками);
    Cигнатура: 
        word - String -> Слово для преобразования.
*/
const heterogramCreator = word => word
  .split('')
  .reduce((heterogram, char) => {    
    heterogram += !heterogram.includes(char) 
      ? char 
      : '';

    return heterogram
  }, '');

  export { heterogramCreator };