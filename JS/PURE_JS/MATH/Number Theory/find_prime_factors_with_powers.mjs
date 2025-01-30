
/*
Математическое разложение числа n на простые множители:

    n = ∏ (p^k[p]), где p — это простые числа, делящие n,
    k[p] — максимальная степень, при которой p^k делит n без остатка.
*/

const findPrimeFactorsWithPowers = n => {
    let factors = {}; // Для хранения простых множителей и их степеней
    let factor = 2; // Начинаем с наименьшего простого числа

    // Удаляем все множители 2
    while (n % factor === 0) {
        factors[factor] = (factors[factor] || 0) + 1;
        n /= factor;
    }

    // Проверяем нечетные множители с 3 и выше
    factor = 3;
    while (factor ** 2 <= n) {
        while (n % factor === 0) {
            factors[factor] = (factors[factor] || 0) + 1;
            n /= factor;
        }
        factor += 2; // Переходим к следующему простому (нечетному) числу
    }

    // Если остаток n больше 1, это также простой множитель
    if (n > 1) factors[n] = (factors[n] || 0) + 1;

    return factors;
};

// Пример: findPrimeFactorsWithPowers(60) вернет {2: 2, 3: 1, 5: 1}


export { findPrimeFactorsWithPowers };