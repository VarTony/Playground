// Структура данных - Дэк:

function Deque(list) {
  this.deque = [...list];
};



// Проверяет пуст ли дэк(список):

Deque.prototype.empty = function() {
  return this.deque.length > 0;
};


// Добавляет элемент в конец списка:

Deque.prototype.pushBack = function(value) {
  this.deque = [...this.deque, value];
};


// Добавляет элемент в начало списка:

Deque.prototype.pushFront = function(value) {
  this.deque = [value, ...this.deque];
};


// Извлекает элемент из конца списка:

Deque.prototype.popBack = function() {
  const lastIndex = this.deque.length - 1;
  const lastElement = this.deque[lastIndex];

  this.deque = this.deque.slice(0, lastIndex);
  return lastElement;
};


// Извлекает элемент из начала списка:

Deque.prototype.popFront = function() {
  const lengthDeque = this.deque.length;
  const firstElement = this.deque[0];

  this.deque = this.deque.slice(1, lengthDeque);
  return firstElement;
};



// Блок мануального тестирования:

const deque1 = new Deque([1,2,3,4,5,6,7,8,9,0, 'sacasca', 'deque']);
console.log(deque1);
console.log(deque1.empty());
console.log(deque1.popBack());
console.log(deque1.popFront());
console.log(deque1);
deque1.pushBack('last');
deque1.pushFront('first');
console.log(deque1);
