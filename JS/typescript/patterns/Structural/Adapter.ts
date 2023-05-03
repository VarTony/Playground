/**
 * Паттерн Адаптер - Используется для например для адаптации новыъ библиотек под
 * интерфейсы старого проекта.
 */


interface ITarget {
    native: string;
    stringInArray(string: string): [];
    getNative(): string;
  }
  
  
  // Цель мимикрии
  class Target {
    public native: string = '15ab3c85';

    public stringInArray(str: string) {
      const arr: [] = [];
      for(let i: number = 0; i < str.length - 1; i++) {
        arr[i] = str[i];
      }
      return arr;
    }

    public getNative(): string {
        return this.native;
      }
  }
  
  // Адаптируемый класс
  class Adaptee {
    public stringInList(string: string) {
      return string.split('');
    }
  }
  
  
  class Adapter extends Target {
    private adaptee;
    
    constructor(adaptee: Adaptee ) {
      super();
      super.getNative();
      this.adaptee = adaptee
    }
    
    public stringInArray(string: string) {
      return this.adaptee.stringInList(string);
    }
  }
  
  // Использование
  const targ: ITarget = new Adapter(new Adaptee());
  
  console.log(targ.stringInArray('123, 543'));
  console.log(targ.getNative());