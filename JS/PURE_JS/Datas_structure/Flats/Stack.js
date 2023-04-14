
// Структура данных - Стэк:

function Stack(list) {
  this.stack = [...list];
};


// Извлекает элемент из конца стэка (списка):

Stack.prototype.getOutput = function() {
  const lastIndex = this.stack.length - 1;
  const lastElement = this.stack[lastIndex];

  this.stack = this.stack.slice(0, lastIndex);
  return lastElement;
};


// Добавляет элемент в конец стэка (списка):

Stack.prototype.setInput = function(inputData) {

  this.stack = [...this.stack, inputData];

};


// Блок мануального тестирования:

const stack1 = new Stack([1,2,3,4,5,6,7,8,9,'acasc', 12]);

console.log(stack1.getOutput());
console.log(stack1.getOutput());
console.log(stack1.getOutput());
stack1.setInput('Данные');
stack1.setInput([1,2,3,4,5]);
console.log(stack1.getOutput());
console.log(stack1.getOutput());
console.log(stack1.getOutput());
console.log(stack1.getOutput());

console.log(stack1);
