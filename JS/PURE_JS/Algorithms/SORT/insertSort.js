let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


/**
 * Реализация нестандартной сортировки, использующей элементы сортировки вставками и пузырьковой сортировки.
 * 
 * Этот алгоритм сортирует массив, проходя по нему и корректируя порядок элементов с помощью функции `leveler`,
 * которая выполняет обмен элементов и рекурсивно корректирует их порядок, пока он не станет правильным.
 * 
 * Сложность по времени:
 * - Худший и средний случай: O(n^2), где n - количество элементов в массиве. Это связано с тем, что функция
 *   `leveler` выполняет обмен элементов и рекурсивные вызовы, что делает её выполнение затратным.
 * - Лучший случай: O(n), если массив уже отсортирован, алгоритм проходит по нему без необходимости изменения порядка элементов.
 * 
 * Сложность по памяти:
 * - O(n) из-за создания копии массива в каждом вызове функции `leveler`. Также требует O(1) дополнительной памяти
 *   для переменных `i` и `listSize`.
 * 
 * @param {Array} list - Массив элементов для сортировки.
 * @returns {Array} - Отсортированный массив.
 */
const leveler = (list, i) => {
  list = [...list];

  if(list[i] > list[i+1] && i >= 0) {
    [list[i], list[i + 1]] = [list[i + 1], list[i]];
    return leveler(list, --i);
  }
  return list;
}


const HybridInsertionBubbleSort = list => {
  let listSize = list.length;
  let i = 0;

  while(i < listSize) {
    if(list[i] > list[i+1]) list = leveler(list, i);
    i++;
  }
  return list
}


const sortedData = HybridInsertionBubbleSort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);

