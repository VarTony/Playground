// Тестовое задание skillbox.


// Написать преобразователь функцию которая на вход получает список объекто { id: number },
//  а возвращает ассоциативный массив, в котором key это id из объекта входящего списка, а value
//  объект из входящего списка.
const f = list => list.reduce(
    (map, obj) => ({ ...map, [obj.id]: obj })
    , {});



/* Реализовать свою версию Promise.all. */

// Создание тестового списка 'обещаний'
const promiseTestList = [ ...Array(15).keys() ]
    .map(() =>
        (new Promise((res, rej) => {
            res('C 8.00 до 17.00');
            rej(new Error('Закрыты на обед'));
        }))
    );


// Реализация кастомного Promise.all:
const promiseAll = async promiseList => {
    const resultList = [];
    await promiseList.map((promise) => {
         promise.then(data => resultList.push(data));
         promise.catch(err => new Error(err));
    })
    return {  resultList };
}

const customResult = list => console.log('Custom result: ', list);

promiseAll(promiseTestList)
    .then(list => customResult(list)) //  Output: * Список вернувшихся из промисов данных * 
