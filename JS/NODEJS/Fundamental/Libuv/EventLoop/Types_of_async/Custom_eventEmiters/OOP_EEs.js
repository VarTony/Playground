

/**
 * Версия на прототипах:
 */
const ProtoEventEmitter = function() {
    this.events = {}; // hash of array of function
  };
  

  // Вешает на события функции:
  ProtoEventEmitter.prototype.on = (name, fn) => {
    const event = this.events[name];

    if (event) event.push(fn);
    
    else this.events[name] = [fn];
  };
  

  // Обрабатывает событие пропуская аргументы через все обработчики:
  ProtoEventEmitter.prototype.emit = (name, ...data) => {
    const event = this.events[name];
    
    if (!event) return;
    
    for (const fn of event) fn(...data);
  };
  


  /**
   * Версия на классах:
   */
  class EventEmiter {
    #events;

    constructor(events = {}){
        this.#events = events;
    }
    
    // Вешает на события функции:
    on(name, fn) {
        const event = this.events[name];
        if (event) event.push(fn);
        else this.events[name] = [fn];
    }

    // Обрабатывает событие пропуская аргументы через все обработчики:
    emit(name, ...data) {
        const event = this.events[name];
        if (!event) return;
        for (const fn of event) fn(...data);

    }
  }