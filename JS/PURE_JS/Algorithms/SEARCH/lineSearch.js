/**
 * Вариант алгоритма линейного поиска в массиве. 
 *
 * 
 * Этот алгоритм проходит по массиву, проверяя каждый элемент, чтобы найти совпадение с заданным значением.
 * Как только первое совпадение найдено, оно возвращается. Если значение не найдено в массиве, возвращается `undefined`.
 * 
 * Сложность по времени:
 * - Худший случай: O(n), где n - количество элементов в массиве. Это связано с тем, что алгоритм может потребовать
 *   проверки каждого элемента в массиве до нахождения совпадения.
 * - Лучший случай: O(1), если значение найдено в первом элементе массива.
 * 
 * Сложность по памяти:
 * - O(1), так как алгоритм не требует дополнительной памяти, кроме памяти для переменных.
 * 
 * @param {Array} list - Массив, в котором выполняется поиск.
 * @param {*} target - Значение, которое нужно найти в массиве.
 * @returns {Object|undefined} - Объект с индексом и значением первого найденного совпадения,
 *                                или `undefined`, если значение не найдено.
 */

const lineSearh = (list, target) => {
    if(!list.length) return undefined;
    for(i in list) {
        if(list[i] === target) return { i, target };
    }
    return undefined;
}