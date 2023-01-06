// Пример реализации отрицательной степени.


 const negativePower = (x, nPower = -1) => {
    
    console.warn('Эта функция автоматически переводит степень в отрицательную');
    
    const power = nPower > 0 
      ? nPower
      : -nPower;
  
    return (1 / (x ** power));
 }

 export default negativePower;