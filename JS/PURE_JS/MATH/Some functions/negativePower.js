// Пример реализации отрицательной степени.


const negativePower = (x, nPower = -1) => {
    if(nPower > 0) { 
        console.warn('Эта функция автоматически переводит степень в отрицательную');
        nPower = -nPower;
    }
    const power = -nPower;

    return (1 / (x ** power));
 }