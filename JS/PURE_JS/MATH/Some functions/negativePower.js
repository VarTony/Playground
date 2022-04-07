// Пример реализации отрицательной степени.


 const negativePower = (x, nPower = -1) => {
    
    console.warn('Эта функция автоматически переводит степень в отрицательную');
    
    const power = nPower > 0 
      ? nPower
      : -nPower;
      
    console.log(power);
  
    return (1 / (x ** power));
 }