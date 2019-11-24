class Observer {
  constructor() {
    this.observers = {};
  }

  subscribe(event, ...action) {
    this.observers[event] = this.observers[event] || [];
    this.observers[event].push(...action);
  }

  unsubscribe(event, action) {
    this.observers = this.observers[event].filter(act => act !== action);
  } 

  broadcast(event, data) {
    if(!this.observers[event]) {
      console.error('Нет подписок на данное событие');
      return;
    }
    
    this.observers[event].forEach(action => {
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
const something = 57873;

observe.subscribe('event', squard, cub, toString);
observe.broadcast('event', something);
observe.broadcast('something', something);


//Создает подписки обработчиков на одно собитие..
//P.S Является расширением предыдущей версии из личных соображений.
