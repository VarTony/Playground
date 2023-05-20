import { timersWrapper, logsWrapper } from './wrappers.mjs';

/**
 * Здесь представлена одна, из реализаций отложенной обработки списка ошибок,
 *  'обещаний'. Может быть полезна когда мы не хотим обрабатывать ошибки 
 *  (напр. логировать их в файл) сразу же, а допускаем более поздней обработки
 *  отдавая вычислительные ресурсы в пользу основных операций ввода/вывода,
 *  предполагая обработку ошибок, сразу же, как только у нас появится свободные
 *  от основных процессов вычислительные ресурсы.
 */


// В процедурном стиле, задаются список и обработчик ошибок:
const listOfPromiseErrs = [];
const errorsHandler = () => listOfPromiseErrs.forEach(fn => fn());


// Оснавная функция для генерации примеров:
const expoPromise = int => new Promise((resolve, reject) => {
    if(typeof int !== 'number') 
      reject(new Error('Int must have type Number'));
  
    resolve(int ** 2);
});



/**
 * Блок тестирования и использования
 */
const myExpoPromise = expoPromise(2)
const myErrExpoPromise_1 = expoPromise('5');
const myErrExpoPromise_2 = expoPromise(false);
const myErrExpoPromise_3 = expoPromise({});

myExpoPromise.then(exp => console.log(exp));
myErrExpoPromise_1.then(exp => console.log(exp));
myErrExpoPromise_2.then(exp => console.log(exp));
myErrExpoPromise_3.then(exp => console.log(exp));
  

/** 
 * Используя встроенный в ноду event emiter подписывамся на
 *  события, на необработанные ошибки промисов и инкапсулируем их в
 *  список обернувши во враперы, для дальнейшей обработки:
 * 
 *  P.S Обертка таймерами нужна для перемещения ошибок в очередь с макротасками. 
 */ 
process.on('unhandledRejection', err => { 
    listOfPromiseErrs.push(timersWrapper(logsWrapper(err)));
    console.table(listOfPromiseErrs);
});

// Обработка списка ошибок, выполнится сразу как только появятся свободные ресурсы:
const executeErrorsHandler = timersWrapper(errorsHandler, 1000);
executeErrorsHandler();