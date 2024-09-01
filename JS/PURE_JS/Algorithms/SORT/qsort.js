
let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


/**
 * Реализация быстрой сортировки (Quick Sort).
 * 
 * Этот алгоритм выбирает случайный опорный элемент (пивот) и делит массив на два подмассива:
 * элементы меньше пивота и элементы больше пивота. Затем рекурсивно сортирует обе части.
 * 
 * Сложность по времени:
 * - В среднем и лучшем случае: O(n log n), где n - количество элементов в массиве.
 * - В худшем случае (например, уже отсортированный массив): O(n^2).
 * 
 * Сложность по памяти:
 * - В среднем и лучшем случае: O(n log n) из-за создания временных массивов и стека вызовов.
 * - В худшем случае: O(n^2) из-за глубокого рекурсионного стека и множества временных массивов.
 * 
 * @param {Array} list - Массив элементов для сортировки.
 * @returns {Array} - Отсортированный массив.
 */
const qsort = list => {
  if(list.length <= 1) return list;

  const pivot = list[Math.floor(Math.random() * list.length)];
  const less = list.filter(value => value < pivot);
  const greater = list.filter(value => value > pivot);
  return [...qsort(less), pivot, ...qsort(greater)];
}

const sortedData = qsort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);
