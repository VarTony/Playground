// ===============================
// УЧЕБНАЯ РЕАЛИЗАЦИЯ PROMISE
// ===============================
//
// Задача: понять механику состояний, then/catch, цепочек и асинхронного запуска.
//
// Поддержка:
//  - new CustomPromise((resolve, reject) => { ... })
//  - .then(onFulfilled, onRejected)
//  - .catch(onRejected)
//  - .finally(onFinally)
//  - CustomPromise.resolve / reject
//
// Ограничения:
//  - не реализованы thenable-объекты по спецификации
//  - не реализованы race / all / allSettled
//  - без особых оптимизаций
//

const STATE = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

class CustomPromise {
  constructor(executor) {
    this.state = STATE.PENDING;   // начальное состояние
    this.value;                   // значение для resolve
    this.reason;                  // причина для reject

    // Очереди колбэков для then/catch (потому что промис может зарезолвиться позже)
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // Оборачиваем resolve/reject
    const resolve = (value) => {
      if (this.state !== STATE.PENDING) return; // промис может завершиться только 1 раз
      this.state = STATE.FULFILLED;
      this.value = value;

      // асинхронный запуск: колбэки должны вызываться только после окончания текущего стека 
      // (ранее для отправки в очередь микро задач использовался NextTick)
      queueMicrotask(() => {
        this.onFulfilledCallbacks.forEach((cb) => cb(value));
      });
    };

    const reject = (reason) => {
      if (this.state !== STATE.PENDING) return;
      this.state = STATE.REJECTED;
      this.reason = reason;

      queueMicrotask(() => {
        if (this.onRejectedCallbacks.length === 0) {
          // если нет обработчиков — то, как в нативном Promise: "UnhandledPromiseRejection"
          console.error("Unhandled rejection:", reason);
        }
        this.onRejectedCallbacks.forEach((cb) => cb(reason));
      });
    };

    // Сразу запускаем executor
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then возвращает НОВЫЙ промис (это ключевое отличие от простых реализаций)
  then(onFulfilled, onRejected) {
    return new CustomPromise((resolve, reject) => {
      const fulfilledTask = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value);
            // если обработчик вернул промис — ждём его
            result instanceof CustomPromise
              ? result.then(resolve, reject)
              : resolve(result);
          } else {
            // если обработчик не передан — пробрасываем значение дальше
            resolve(value);
          }
        } catch (err) {
          reject(err);
        }
      };

      const rejectedTask = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason);
            result instanceof CustomPromise
              ? result.then(resolve, reject)
              : resolve(result); // обратим внимание: resolve, а не reject — чтобы работало восстановление в catch
          } else {
            reject(reason);
          }
        } catch (err) {
          reject(err);
        }
      };

      // Если промис ещё в ожидании → пушим колбэки в очередь
      if (this.state === STATE.PENDING) {
        this.onFulfilledCallbacks.push(fulfilledTask);
        this.onRejectedCallbacks.push(rejectedTask);
      }

      // Если уже fulfilled → вызываем обработчик асинхронно
      if (this.state === STATE.FULFILLED) {
        queueMicrotask(() => fulfilledTask(this.value));
      }

      // Если уже rejected → аналогично
      if (this.state === STATE.REJECTED) {
        queueMicrotask(() => rejectedTask(this.reason));
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally && onFinally();
        return value; // пробрасываем значение дальше
      },
      (reason) => {
        onFinally && onFinally();
        throw reason; // пробрасываем ошибку дальше
      }
    );
  }

  // статические методы
  static resolve(value) {
    return new CustomPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new CustomPromise((_, reject) => reject(reason));
  }
}



// =============================== ТЕСТЫ ===============================

// 1. Простая цепочка
CustomPromise.resolve(1)
  .then((x) => x + 1)
  .then((y) => {
    console.log("Result:", y); // 2
    return y * 10;
  })
  .then((z) => console.log("Next:", z)); // 20

// 2. Ошибка и восстановление
CustomPromise.reject("fail")
  .then(() => console.log("не дойдёт"))
  .catch((err) => {
    console.error("Caught:", err); // "fail"
    return 42; // восстановление
  })
  .then((x) => console.log("Recovered:", x)); // 42

// 3. Finally
CustomPromise.resolve("ok")
  .finally(() => console.log("Cleanup")) // вызовется всегда
  .then((v) => console.log("Value:", v)); // "ok"