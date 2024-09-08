/**
 * Класс, представляющий узел односвязного списка.
 * 
 * @param {*} value - Значение, которое хранится в узле.
 * @param {number} index - Индекс узла в списке.
 * @param {IndexedLinkedList|null} next - Ссылка на следующий узел в списке.
 */
class IndexedLinkedList {
    constructor(value, index = 0, next = null) {
      this.value = value;
      this.index = index;
      this.next = next;
    }
  }
  
  /**
   * Класс, представляющий односвязный список с индексами и их балансировкой.
   * Содержит методы для добавления, удаления и поиска узлов в списке.
   */
  class LinkedList {
    constructor() {
      this.head = null;
      this.length = 0;
    }
  
    /**
     * Добавляет новый узел в начало списка.
     * Сложность по времени: O(n), так как нужно инкрементировать индексы всех узлов, начиная со второго.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение, которое нужно добавить в список.
     */
    prepend(value) {
      const current = this.head;
      if (!current) return this.add(value);
      const newNode = new IndexedLinkedList(value, 0, current);
      this.head = newNode;
      this.length++;
      this._incrementIndexesFrom(this.head.next);
      this._indexBalancer();
    }
  
    /**
     * Добавляет новый узел в конец списка.
     * Сложность по времени: O(n), так как нужно пройти по всем элементам списка до конца.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение, которое нужно добавить в список.
     */
    add(value) {
      let current = this.head;
      if (!current) {
        this.head = new IndexedLinkedList(value, this.length);
        this.length++;
        return current;
      }
      while (current) {
        if (!current.next) {
          ++this.length;
          current.next = new IndexedLinkedList(value, this.length);
          return current.next;
        }
        current = current.next;
      }
    }
  
    /**
     * Добавляет новый узел по указанному индексу.
     * Сложность по времени: O(n), так как необходимо пройти список до нужного индекса.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение для добавления.
     * @param {number} index - Индекс, в который нужно вставить новый узел.
     */
    addAt(value, index) {
      if (index === 0) return this.prepend(value);
      let current = this.head;
      while (current) {
        if (current.next?.index === index) {
          current.next = new IndexedLinkedList(value, index, current.next);
          this._incrementIndexesFrom(current.next.next);
          this.length++;
          return current.next;
        }
        current = current.next;
      }
    }
  
    /**
     * Корректирует индексы узлов, если между ними есть пробелы в значениях индексов.
     * Сложность по времени: O(n), так как нужно пройти по всем элементам списка.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     */
    _indexBalancer() {
      if (!this.length) return;
      let current = this.head;
      while (current) {
        while (current.next?.index - current.index > 1) {
          this._dicrementIndexesFrom(current.next);
        }
        current = current.next;
      }
    }
  
    /**
     * Увеличивает индексы всех узлов, начиная с указанного.
     * Сложность по времени: O(n), так как нужно пройти по всем узлам после указанного.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {IndexedLinkedList} node - Узел, начиная с которого индексы будут увеличены.
     */
    _incrementIndexesFrom(node) {
      while (node) {
        node.index++;
        node = node.next;
      }
    }
  
    /**
     * Уменьшает индексы всех узлов, начиная с указанного.
     * Сложность по времени: O(n), так как нужно пройти по всем узлам после указанного.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {IndexedLinkedList} node - Узел, начиная с которого индексы будут уменьшены.
     */
    _dicrementIndexesFrom(node) {
      while (node) {
        node.index--;
        node = node.next;
      }
    }
  
    /**
     * Удаляет первый элемент списка.
     * Сложность по времени: O(n), так как после удаления нужно сбалансировать индексы.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @returns {*} - Значение удаленного узла.
     */
    remove() {
      if (!this.length) return undefined;
      const value = this.head.value;
      this.head = this.head.next;
      this._indexBalancer();
      this.length--;
  
      return value;
    }
  
    /**
     * Возвращает количество узлов в списке.
     * Сложность по времени: O(1), так как длина списка хранится в отдельной переменной.
     * Сложность по памяти: O(1).
     * 
     * @returns {number} - Количество узлов в списке.
     */
    size() {
      return this.length;
    }
  
    /**
     * Удаляет узел по указанному индексу.
     * Сложность по времени: O(n), так как нужно найти узел по индексу и скорректировать индексы оставшихся узлов.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {number} index - Индекс узла для удаления.
     * @returns {*} - Значение удаленного узла.
     */
    removeAt(index) {
      if (!this.length) return undefined;
      if (index === 0) return this.remove();
      if (index >= this.length) return undefined;
  
      let i = 0;
      let current = this.head;
      let previous = null;
  
      while (i < index) {
        if (current.index === index) {
          previous.next = current.next;
          current.next = null;
          this.length--;
          this._indexBalancer();
          return current.value;
        }
        previous = current;
        current = current.next;
        i++;
      }
      return undefined;
    }
  
    /**
     * Проверяет, содержит ли список узел с заданным значением.
     * Сложность по времени: O(n), так как нужно пройти весь список, чтобы найти элемент.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение для поиска.
     * @returns {IndexedLinkedList|undefined} - Узел с данным значением или undefined, если не найдено.
     */
    contains(value) {
      let current = this.head;
      while (current) {
        if (current.value === value) return current;
        current = current.next;
      }
      return undefined;
    }
  
    /**
     * Возвращает узел по указанному индексу.
     * Сложность по времени: O(n), так как нужно пройти список до нужного индекса.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {number} index - Индекс узла для поиска.
     * @returns {IndexedLinkedList|undefined} - Узел с данным индексом или undefined, если не найдено.
     */
    containsAt(index) {
      let current = this.head;
      while (current) {
        if (current.index === index) return current;
        current = current.next;
      }
      return undefined;
    }
  
    /**
     * Возвращает весь список, начиная с головного узла.
     * Сложность по времени: O(1), так как просто возвращает ссылку на головной узел.
     * Сложность по памяти: O(1).
     * 
     * @returns {IndexedLinkedList} - Головной узел списка.
     */
    showAllList() {
      return this.head;
    }
  }
  