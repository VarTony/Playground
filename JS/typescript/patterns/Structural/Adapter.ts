/**
 * Паттерн Адаптер - Используется, например, для адаптации новых библиотек под
 * интерфейсы старого проекта.
 */


//Интерфейс цели
interface ITarget {
    native: string;
    stringInArray(string: string): [];
    getNative(): string;
  }
  
  
  //Цель мимикрии
  class Target {
    public native: string = '15ab3c85';

    public stringInArray(str: string): string[] {
      const arr: string[] = [];
      for(let i: number = 0; i < str.length - 1; i++) {
        arr[i] = str[i];
      }
      return arr;
    }

    public getNative(): string {
        return this.native;
      }
  }
  
  //Адаптируемый класс
  class Adaptee {
    public stringInList(string: string): string[] {
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
  
  //Использование
  const targ: ITarget = new Adapter(new Adaptee());
  
  console.log(targ.stringInArray('123, 543'));
  console.log(targ.getNative());