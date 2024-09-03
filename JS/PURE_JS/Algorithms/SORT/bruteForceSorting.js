let testData = '2412 7 50 -1'.split(' ');
testData = testData.map(char => +char);


/**
 * Реализация переборной сортировки (Brute Force Sorting), основанной на генерации всех возможных перестановок массива.
 * 
 * Этот алгоритм генерирует все возможные перестановки элементов массива и проверяет каждую из них, чтобы определить,
 * является ли она отсортированной. Возвращает первую найденную отсортированную перестановку.
 * 
 * Сложность по времени:
 * - Худший случай: O(n!) для генерации всех перестановок массива, где n - количество элементов. Каждая перестановка
 *   проверяется на отсортированность, что добавляет O(n) времени для проверки, но доминирует факториал.
 * 
 * Сложность по памяти:
 * - O(n!) из-за хранения всех перестановок в памяти. Дополнительно требуется O(n) памяти для временных переменных и 
 *   хранения текущих перестановок.
 * 
 * @param {Array} array - Массив элементов для сортировки.
 * @returns {Array} - Отсортированный массив, если найдено отсортированное состояние. В противном случае возвращает исходный массив.
 */
const getPermutations = (array) => {
    const result = [];
  
    const permute = (list, perm = []) => {
      if (!list.length) result.push(perm);
      else {
        let i = list.length;
        while (i--) {
          const curr = list.slice();
          const next = curr.splice(i, 1);

          permute(curr.slice(), perm.concat(next));
        }
      }
    };
    permute(array);
    return result;
  };
  
  const isSorted = (list) => {
    let i = list.length;
    while (i--) 
      if (list[i - 1] > list[i]) return false;

    return true;
  };
  
  const bruteForceSort = (list) => {
    const permutations = getPermutations(list);

    for (let perm of permutations) {
      if (isSorted(perm)) return perm;
    }
  
    return list; // Если нет отсортированной перестановки (что невозможно для не пустого массива).
  }
  
  // Пример использования
  const sortedArray = bruteForceSort(testData);
  console.log(sortedArray); // Выведет: [-1, 7, 50, 2412]
  