
/**
 * Проверка, является ли число простым.
 * 
 * Простое число — это число больше 1, которое делится только на 1 и само себя. Эта функция определяет, является ли
 * переданное число простым, проверяя его делимость на все числа от 2 до квадратного корня из числа.
 * 
 * Сложность по времени:
 * - O(√n) или O(n^1/2), где n — проверяемое число. Функция проверяет делимость на все числа от 2 до квадратного корня от n.
 * 
 * Сложность по памяти:
 * - O(1). Используются только несколько переменных для хранения промежуточных результатов и нет дополнительных структур данных.
 * 
 * @param {number} number - Число для проверки на простоту.
 * @returns {boolean} - Возвращает true, если число простое, иначе false.
 */
const isPrime = (n) => {
    if(n < 2) return false;

    const nSqrt = Math.sqrt(n);
    let divider = 2;
    
    while(divider <= nSqrt) {
      if(n % divider === 0) return false;
      ++divider;
    }
    return true;
  }


  export { isPrime };