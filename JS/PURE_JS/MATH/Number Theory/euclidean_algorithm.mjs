/** 
 *  Версия алгоритма Евклида, описанная самим Евклидом - через вычитание:
 */
const algorithmOfEuclidean = (a, b) => {
  if (a === b) return a;
  if (a > b) return algorithmOfEuclidean(a - b, b);

  return algorithmOfEuclidean(a, b - a);
};


/**
 * Другая версия алгоритмa по нахождению НОД, основанная на остатке от деления, 
 * более эффективная так как требует меньшее кол-во шагов:
 */
const gcd = (a, b) => {
    const min = a >= b ? b : a;
    const max = b > a ? b : a;
  
    return min 
      ? gcd(max % min, min) 
      : max;
  };


  export { algorithmOfEuclidean, gcd };