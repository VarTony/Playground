

// Стандартная версия через итерацию с сохранением промежуточного состояния
const factorial = n => {
    let result = i = 1;
    
    while(i <= n) {
      result *= i
      i++;
    }
    return result;
}
  

/* Быстрая версия реализованная через использование каскадной рекурсии
    основана на идеи, того, что близкие по разрядности двоичные числа требуют меньше
    вычислительных ресурсов для произведения их между собой.
*/
const fastFact = n => {
    if(n === 0) return 1;
    if(n === 1 || n === 2) return n;
    
    const facTree = (left, right) => {
      if(left > right) return 1;
      if(right === left) return right;
      if(right - left === 1) return left * right;
      let mian = Math.round((left + right) / 2);
  
      return facTree(left, mian) * facTree(mian + 1, right) 
  }
    return facTree(2, n);
  }
  
  export { fastFact as factorial };
  