/* Состояние — это поведенческий паттерн проектирования, который позволяет объектам
    менять поведение в зависимости от своего состояния. Извне создаётся впечатление,
    что изменился класс объекта. 
    В целом паттерн реализует базовые идеи автоматного программирования.

    Поведения:

    // Ip-адрес и порт несут сугубо декаративную роль.
    connection = new TcpConnection('128.111.253.1', 3851); 
    connection.connect();
    connection.getCurrentState(); // connected
    connection.write('data');
    connection.disconnect();
    connection.getCurrentState(); // disconnected
    // Выбрасывает исключение если нет соединения
    connection.disconnect(); // Error

    Поведение реализовано без единой конструкции, но в основе своей это 
     просто реализация диспечеризации(Специальный полиморфизм) в содействие с декомпозицией задачи на 
     поведенчиские классы(Полиморфизм подтипов).
*/


export default class TcpConnection {
    private states = {
        connected: Connected,
        disconnected: Disconnected  
    }
    state = 'disconnected';
    
    constructor(protected ip: string, protected port: number) {}
  
    getCurrentState = () => this.state;
  
    /*
     f(state) => {
        Error, state == 'connected'
        state = 'connected', state == disconected
     }
    */
    connect = () => {
      const handler = new this.states[this.state](this);
      handler.connect();
    }
  
    /*
     f(state) => {
        state = 'disconnected', state == 'connected'
        Error, state == 'disconected'
     }
    */
    disconnect = () => {
      const handler = new this.states[this.state](this);
      handler.disconnect();
    }
    
    /*
     f(state) => {
        console.log(data), state == 'connected'
        Error, state == 'disconected'
     }
    */
    write = data => {
      const handler = new this.states[this.state](this);
      handler.write(data);
    }
  }


// Класс реализующий поведение про соединение
class Connected {
    constructor(private tcpConnection: TcpConnection) {}
    
    connect = () => { throw new Error('Already connected') };
    
    disconnect = () =>  { this.tcpConnection.state = 'disconnected' };
  
    write = data => console.log(data);
}


// Класс реализующий поведение про рассоединение
class Disconnected {
    constructor(private tcpConnection: TcpConnection) {}

    connect = () => { this.tcpConnection.state = 'connected' };
  
    disconnect = () => { throw new Error('Already disconnected') };
  
    write = _data => { throw new Error('Connection lost') };
  }