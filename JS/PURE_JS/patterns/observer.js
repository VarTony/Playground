
class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(...action) {
    this.observers.push(...action);
  }

  unsubscribe(action) {
    this.observers = this.observers.filter(act => act !== action);
  } 

  broadcast(data) {
    this.observers.forEach(action => {
      data = action(data);
      return data;
    });
    console.log(typeof data, data);
    return data;
  }

}


const observe = new Observer();
const squard = v => v ** 2;
const cub = v => (v ** 3);
const toString = v => String(v);
const something = [(57873)];

observe.subscribe(squard, cub, toString);
observe.broadcast(something);

/* Дает возможность данным подписываться на множество обработчиков. */
