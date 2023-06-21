// Реализация кастомной 'лайт' версии промиса, для лучшего понимания его функционирования;


const STATE = {
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
}



class CustomPromise {
    constructor(executor) {
      this.callbacks = [];
      this.executorState = STATE.PENDING;
      this.cbState = STATE.PENDING;

      executor(this.resolve.bind(this));
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
     * Создает отложеный вызов в начале следующего цикла петли событий.
     */
    _callbacksDispather(data = this.promiseData) {
      process.nextTick(() => { this._queueResolver(data) });
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
      return executorState !== STATE.FULFILLED
        ? process.nextTick(() => this._observer())
        : this._callbacksDispather();
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
      this._callbacksDispather();
    }


    /**
     * Обработывает по цепочке в хронологическом порядке переданные функции обратного вызова.
     * 
     * @param {*} data 
     * @returns 
     */
    _queueResolver(data) {
      if (!this.callbacks.length) {
        this.cbState = STATE.FULFILLED;
        return;
      }
      const [ cb, ...cbs ] = this.callbacks;
    
      if (this._isAsyncCallback(cb)) {
        cb(data).then(result => { 
          this.callbacks = cbs;
          this.queueResolver(result);
      });
      // Если callback является асинхронным создает отложенный рекурсивный вызов, 
      // через метод посредник.
      return this._callbacksDispather(data);
      }
      else { 
        this.callbacks = cbs;
        return this.queueResolver(cb(data));
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
      this.cbState = STATE.PENDING;
      this._observer();
      return this;
    }
  }