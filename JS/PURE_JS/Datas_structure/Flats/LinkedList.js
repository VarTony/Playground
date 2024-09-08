/**
 * Класс, представляющий узел односвязного списка.
 * 
 * @property {*} value - Значение узла.
 * @property {_LinkedListNode|null} next - Ссылка на следующий узел в списке.
 */
class _LinkedListNode {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }
  
  /**
   * Класс, представляющий односвязный список.
   * Содержит методы для добавления, удаления и поиска узлов в списке.
   */
  class LinkedList {
    constructor() {
      this.head = null; // Голова списка, изначально равна null
      this.length = 0; // Длина списка, изначально равна 0
    }
  
    /**
     * Добавляет новый узел в начало списка.
     * Сложность по времени: O(1), так как вставка происходит на начало списка.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение, которое нужно добавить в список.
     */
    prepend(value) {
      const current = this.head;
      if (!current) return this.add(value); // Если список пуст, используем метод add
      const newNode = new _LinkedListNode(value, current);
      this.head = newNode;
      this.length++;
    }
  
    /**
     * Добавляет новый узел в конец списка.
     * Сложность по времени: O(n), так как нужно пройти по всему списку для добавления в конец.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение, которое нужно добавить в список.
     */
    add(value) {
      let current = this.head;
      if (!current) {
        this.head = new _LinkedListNode(value);
        this.length++;
        return current;
      }
      while (current) {
        if (!current.next) {
          ++this.length;
          current.next = new _LinkedListNode(value);
          return current.next;
        }
        current = current.next;
      }
    }
  
    /**
     * Удаляет узел с головы списка и возвращает его значение.
     * Сложность по времени: O(1), так как удаление происходит с головы списка.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @returns {*} Значение удаленного узла или undefined, если список пуст.
     */
    remove() {
      if (!this.length) return undefined;
      const value = this.head.value;
      this.head = this.head.next;
      this.length--;
  
      return value;
    }
  
    /**
     * Удаляет первый узел, содержащий указанное значение.
     * Сложность по времени: O(n), так как нужно пройти по всему списку для поиска узла.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение узла, который нужно удалить.
     * @returns {*} Значение удаленного узла или undefined, если значение не найдено.
     */
    removeByValue(value) {
      if (!this.length) return undefined;
  
      let current = this.head;
      let previous = null;
  
      while (current) {
        if (current.value === value) {
          if(!previous) this.head = current.next; // Удаление головы списка
          else previous.next = current.next;
          current.next = null;
          this.length--;
          return current.value;
        }
        previous = current;
        current = current.next;
      }
      return undefined;
    }
  
    /**
     * Проверяет, существует ли узел со указанным значением в списке.
     * Сложность по времени: O(n), так как нужно пройти по всему списку для поиска узла.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @param {*} value - Значение, которое нужно найти в списке.
     * @returns {_LinkedListNode|undefined} Узел с указанным значением или undefined, если значение не найдено.
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
     * Возвращает количество узлов в списке.
     * Сложность по времени: O(1), так как значение длины хранится отдельно.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @returns {number} Количество узлов в списке.
     */
    size() {
      return this.length;
    }
  
    /**
     * Возвращает голову списка.
     * Сложность по времени: O(1), так как возвращается ссылка на голову списка.
     * Сложность по памяти: O(1), так как используется фиксированное количество памяти.
     * 
     * @returns {_LinkedListNode|null} Голова списка или null, если список пуст.
     */
    showAllList() {
      return this.head;
    }
  }
  