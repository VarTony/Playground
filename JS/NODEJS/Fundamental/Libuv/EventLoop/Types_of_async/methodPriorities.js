const fs = require('node:fs');


/**
 * Timers
 * 
 * Блок таймеров которые исполнятся после вызова функции sleep,
 *  так как, являются асинхронными, тоисполнятся в лучшем случае
 *  только в следующей итерации петли событий, при условии, 
 *  что основной воркер будет свободен, а в очереди колбеков не 
 *  окажется очериди из микротаск, например таких как обещания.
 * 
 *  Порядок исполнения закомментирован числами напротив вызовов функций
 * 
 * P.S преоритетность очередей изображена в файле - a-eventloop.txt,
 *  но там отсутствует отображения очередей микро и макро задач.
 */

// SetTimeout имеют более высокий приоритет в очереди.
setTimeout(() => console.log('callback #1 setTimeout 0'), 0); // VIII

setTimeout(() => console.log('callback #2 setTimeout 0'), 0); // IX

setTimeout(() => console.log('callback #3 setTimeout 1'), 1); // X

setTimeout(() => console.log('callback #4 setTimeout 1'), 1); // XI


// SetInterval вторые по приоритету исполнения.
const t7 = setInterval(() => {
    clearInterval(t7);
    console.log('callback #5 setInterval 0');
  }, 0);                                                       // XII

const t8 = setInterval(() => {
    clearInterval(t8);
    console.log('callback #6 setInterval 0');
  }, 0);                                                       // XIII



/**
 * Простейшая реализация создающая задержку исполнения, посредствам
 *  блокировки выполнения основного процесса
 * @param { number } msec 
 */
const sleep = msec => {
    const end = new Date().getTime() + msec;
    
    while (new Date().getTime() < end);

    console.log('Wake up!');
}

sleep(2000);                                                   // I



/**
 * Idle, prepare
 * 
 * Сборщик мусора
 */
//gc()  // Был бы между XIII - XIV



/**
 * Poll
 * 
 * Работа через I/O с операционной системой.
 * 
 * В данном случае выполнятся после setImmediate, по причине что сами процессы 
 *  выполняются дольше, и попадут в очередь на более поздней итерации EventLoop.S
 */
fs.readFile('./a-eventloop.txt', 'utf8', () => console.log('callback #7 readFile')); // XV
  
fs.readFile('./a-eventloop.tx', 'utf8', () => console.log('callback #8 readFile')); // XVI


/**
 * Check
 * 
 * SetImmediate
 */
setImmediate(() => console.log('callback #9 setImmediate'));  //  XIV


/**
 * Микротаски, пройдут вне очереди в следущем событийном цикле.
 * Имеют более высокий приоритет, чем 'обещания', но меньший чем async колбеки.
 */
process.nextTick(() => console.log('callback #10 process.nextTick')); //  V

process.nextTick(() => console.log('callback #11 process.nextTick')); // VI
  

/**
 * Обычный вызов callback функций, поэтому исполнятся сразу после sleep
 *  в основном процессе.
 */
((callback) => callback())(() => console.log('callback #12 callback')); // II

((callback) => callback())(() => console.log('callback #13 callback')); // III


/**
 * V8 microtask queue
 * 
 * Очередь микро задач не находится в матрице libuv 
 *  исполняется полностью перед любыми колбеками макротаск,
 *  в случае существования наполнения
 * 
 *  Предположительно async функции имеют более высокий приоритет на выполнение
 *  (хотя по сути должно просто являться синтаксических подсластителем промисов). 
 *  
 */
const microTask_01 = new Promise(res => res())
  .then(() => console.log('callback #14 promise'));                              // VII


const microTask_2 = async () => console.log('callback #15 promise')
microTask_2();                                                                  // IV
