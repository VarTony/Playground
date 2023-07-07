/* 
 Пример как тяжелая функция отправленная в очередь с макротасками через таймер, может
  повесить работу событийного иттератора. Происходит это потому, что код который вернулся в
  колбеке из таймера придется выполнять в основном потоке, т.к исполнять js код больше некому.
*/

const waiter = (n) => { // <-- Блокатор
    setTimeout(() => {
      const start = Date.now();
      while((Date.now() - start) < 20000) {}
    }, 0)
  }
  
const start = Date.now();
waiter(155); // <-- Заблокирует работу воркера на следущем цикле событий
const finish = (Date.now() - start);
  
console.log('Finish: ', finish); // Отработает в первой итерации событий
  
const afterTwoEventCycle = async () => {
    process.nextTick(() => console.log('Hello after two cycle'));
} 
  
const afterOneEventCycle = async () => {
    console.log('Hello from next cycle');
} 

afterTwoEventCycle(); // <-- Подождет еще 20 секунд
afterOneEventCycle(); // <-- Отработает из очереди микротаск, 
// в начале следущего цикла перед блокировкой. 

/*
    Вывод:
        'Finish: ~0'
        'Hello from next cycle'
          <20 seconds later>
        'Hello after two cycle'
 */

/*
    Итоги:
        Данный пример наглядно показывает, что тяжелым вычислениям не место в js коде
         даже если пытаться их оборачивать макро/микро-таскама.
*/