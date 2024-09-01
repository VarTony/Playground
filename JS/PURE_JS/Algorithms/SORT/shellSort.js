let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


/**
 * Реализация сортировки Шелла (Shell Sort).
 * 
 * Этот алгоритм является улучшением пузырьковой сортировки, который сначала сортирует элементы на больших расстояниях друг от друга,
 * а затем постепенно уменьшает расстояние между элементами, пока не будет использовать расстояние равное 1.
 * 
 * В коде используется функция `replacer` для сортировки элементов с определённым шагом (gap).
 * 
 * Сложность по времени:
 * - Худший случай: O(n^2), где n - количество элементов в массиве. Однако сложность может варьироваться в зависимости от используемой последовательности шагов.
 * - Средний случай: Может быть O(n log n) в зависимости от конкретного выбора последовательности шагов.
 * - Лучший случай: O(n log n) или лучше, если массив почти отсортирован и используется оптимальная последовательность шагов.
 * 
 * Сложность по памяти:
 * - O(n) из-за создания копий массива и дополнительной памяти, используемой для временных переменных и рекурсивных вызовов.
 * 
 * @param {Array} list - Массив элементов для сортировки.
 * @param {number} [step] - Шаг для сортировки. Если не указан, используется начальный шаг равный половине длины массива.
 * @returns {Array} - Отсортированный массив.
 */
const replacer = (list, step, counts) => {
  list = [...list];
  let {i, j} = counts;
  [list[i], list[j]] = [list[j], list[i]];
  j = i - step;

  while(j) {
    if(list[i] < list[j]) {
      [list[i], list[j]] = [list[j], list[i]];
      i -= step
      j -= step;
    } else {
      break
    }

  }

  return list;
}


const shellSort = (list, step) => {
  if(step === undefined) step = Math.floor(list.length / 2)
  if(step <= 0) return list;
  let i = 0;
  let j = step;

  while(i < list.length) {
    if(list[i] > list[j]) list = replacer(list, step, {i, j});
    i++;
    j++;
  }

  return shellSort(list, Math.floor(step / 2))
}


const sortedData = shellSort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);
