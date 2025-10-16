

// 0 
// Ну это промисификация
// Главная идея снизить нагруженость кода убрав лестницу из колбеков за абстракцию
// Здесь callback это res
const delay = ms => new Promise((res) => setTimeout(() => res, ms));



// async/await развивают тему абстракции дальше, делая код еще более декларативным пряча с глаз цепочки .then/.catch
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: "George" }), 500);
  });
}

function fetchOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([`order1 for ${userId}`, `order2 for ${userId}`]), 500);
  });
}


// Вариант с then-цепочками
fetchUser(1)
  .then(user => {
    console.log("User:", user);
    return fetchOrders(user.id);
  })
  .then(orders => {
    console.log("Orders:", orders);
  })
  .catch(err => {
    console.error("Error:", err);
  })
  .finally(() => console.log("done")); // сработает всегда


// То же самое с async/await
async function main() {
  try {
    const user = await fetchUser(1);
    console.log("User:", user);

    const orders = await fetchOrders(user.id);
    console.log("Orders:", orders);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    console.log("done"); // выполнится и при успехе, и при ошибке
  }
}


// main()


// tasks — это массив функций, каждая при вызове возвращает промис.
// Нужно выполнить их по очереди: сначала дождаться первой, потом второй, потом третьей.
// Если запустить их через map или Promise.all, они будут работать параллельно — а нам нужно строго цепочка await.
// Алгоритм сводится к:
// создать пустой массив для результатов,
// пройтись циклом по tasks,
// вызывать каждую функцию, делать await и добавлять результат в массив,
// вернуть финальный массив.
// Если какая-то из задач кидает ошибку → выполнение цепочки прерывается, промис runSequential уходит в состояние rejected.


// Нужно написать функцию runSequential(tasks), 
// которая принимает массив функций (каждая возвращает промис) и выполняет их
// строго последовательно, возвращая массив результатов.


// Реализация:

async function runSequential(asyncTasks) {
    const result = [];

    for (let task of asyncTasks) {
        result.push(await task());
    }
    return result;
}


// Пример использования:

// js
const tasks = [
  () => delay(100).then(() => 1),
  () => delay(50).then(() => 2),
  () => delay(10).then(() => 3),
];

await runSequential(tasks); // [1, 2, 3]



// Тесты:

it('должна запускать задачи строго по порядку', async () => {
  const tasks = [
    () => delay(100, 'first'),
    () => delay(50, 'second'),
    () => delay(10, 'third'),
  ];
  const result = await runSequential(tasks);
  expect(result).toEqual(['first', 'second', 'third']);
});


it('должна корректно работать с одной задачей', async () => {
  const tasks = [() => delay(20, 42)];
  const result = await runSequential(tasks);
  expect(result).toEqual([42]);
});


it('должна вернуть пустой массив, если задач нет', async () => {
  const result = await runSequential([]);
  expect(result).toEqual([]);
});


it('должна пробрасывать ошибку, если задача упала', async () => {
  const tasks = [
    () => delay(10, 'ok'),
    () => Promise.reject(new Error('fail')),
    () => delay(10, 'skip'),
  ];
  await expect(runSequential(tasks)).rejects.toThrow('fail');
});



// 2. Параллельное выполнение с ограничением по concurrency **Задача:** 
// Сделайте функцию runWithLimit(tasks, limit), которая запускает промисы максимум по limit штук одновременно. 
// Пример:
// js
// const tasks = Array.from({ length: 5 }, (_, i) => 
//   () => delay(100 * (i+1)).then(() => i+1)
// );

// await runWithLimit(tasks, 2);
// // должно вернуть [1,2,3,4,5], но одновременно максимум 2 промиса в работе
// ---


const runWithLimit = async (asyncTasks, limit) => {
    const result = [];
    if (!asyncTasks.length) return result;

    for (let i = 0; i < asyncTasks.length; i += limit ) {
        const chank = asyncTasks.slice(i, i + limit); // отдаст «хвост» массива (меньше, чем limit), если элементов осталось мало.
        result.push(...(await Promise.all(chank.map(f => f()))));
    }

    return result;
}

it('должна запускать задачи с ограничением concurrency', async () => {
  const tasks = Array.from({ length: 5 }, (_, i) => 
    () => delay(50, i + 1)
  );
  const result = await runWithLimit(tasks, 2);
  expect(result).toEqual([1, 2, 3, 4, 5]);
});


it('должна работать корректно, если limit больше длины массива', async () => {
  const tasks = [
    () => delay(20, 'a'),
    () => delay(10, 'b')
  ];
  const result = await runWithLimit(tasks, 10);
  expect(result).toEqual(['a', 'b']);
});


it('должна выполнять задачи строго последовательно, если limit = 1', async () => {
  const tasks = [
    () => delay(30, 'x'),
    () => delay(10, 'y'),
    () => delay(5, 'z')
  ];
  const result = await runWithLimit(tasks, 1);
  expect(result).toEqual(['x', 'y', 'z']);
});



// 3


const arr = [
  new Promise(() => 1),
  new Promise(() => 1),
  new Promise(() => 1)
];

arr.asyncMap = async function(cb) {
  return Promise.all(this.map(cb));
};