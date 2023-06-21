// Реализация кастомной 'лайт' версии промиса, для лучшего понимания функционирования нативной версии;
// В данный момент не поддерживает ослеживание новой цепочки событий(Воспринимает цепочки как одну)


const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}


class CustomPromise {
    constructor(executor) {
      this.callbacks = [];
      this.executorState = STATE.PENDING;
      this.callbackState = STATE.PENDING;

      executor(this.resolve.bind(this));
    }

    
    /**
     * Записывает результат выполнения executor(a) и 
     * иницирует запуск диспечера очереди колбеков.
     * 
     * @param {*} data 
     */
    resolve(data) {
      this.promiseData = typeof data === 'object' ? { ...data } : data; 
      this.executorState = STATE.FULFILLED;
      this.callbackState = STATE.FULFILLED;
    
      this._callbacksDispather();
    }


    /**
     * Проверяет завершеность исполнения executor(a),
     *  если видит состояние ожидания, создает запланированный самовызов
     *  в начале слудующего цикла event loop, если состояние 'FULFILLED',
     *  вызывает диспетчера очереди обратных вызовов.
     * 
     * @returns 
     */
    _observer() {
      return this.executorState !== STATE.FULFILLED
        ? process.nextTick(() => this._observer())
        : this._callbacksDispather();
    }


    /**
     * Создает отложеный вызов для следующего цикла петли событий.
     */
    _callbacksDispather(data = this.promiseData) {
      setImmediate(() => { this._queueResolver(data) });
    }


    /**
     * Определяет является ли функция ассинхронной
     * 
     * @param { Function } cb 
     * @returns 
     */
    _isAsyncCallback(cb) {
      return cb.constructor.name === 'AsyncFunction';
    }


    /**
     * Обработывает по цепочке в хронологическом порядке переданные функции обратного вызова.
     * 
     * @param {*} data 
     * @returns 
     */
    _queueResolver(data) {
      if (!this.callbacks.length) {
        this.callbackState = STATE.FULFILLED;
        return;
      }
      const [ cb, ...cbs ] = this.callbacks;
    
      if (this._isAsyncCallback(cb)) {
        if(this.callbacksState === STATE.FULFILLED) cb(data)
          .then(result => { 
            this.callbacks = cbs;
            this.callbackState = STATE.FULFILLED;
            this._queueResolver(result);
          });
      // Если callback является асинхронным создает отложенный рекурсивный вызов, 
      // через метод посредник.
      this.callbacksState = STATE.PENDING;
      return this._callbacksDispather(data);
      }
      else { 
        const resultOfCb = cb(data);
        this.callbacks = cbs;
        this.callbackState = STATE.FULFILLED;
        return this._queueResolver(resultOfCb);
      }
    }
  

    /**
     * Метод добавляет функцию обратного вызова в список колбеков
     * и запускает наблюдателя для дальнейшией обработки формируемой очереди.
     * 
     * @param {Function} cb 
     * @returns 
     */
    then(cb) {
      this.callbacks.push(cb);
      this._observer();
      return this;
    }
  }