/**
 * Паттерн Стратегия - позволяет инкапсулировать некоторое поведение
 * в группу классов с общим интерфейсом, которая легко расширяется при необходимости.
 * Иначе говоря изменяемая часть логики вынесена в отдельные классы, а статическая 
 * остается в родительском.
 */

// Костыль
interface IConstructable<T> {
    new(...args: any) : T;
}


/**
 * Основной класс
 */
class Duck {
    quackBehavior: IQuackBehavior;
    flyBehavior: IFlyBehavior;
    
    
    public performFly(): void {
      this.flyBehavior.fly();
    }
  
    public performQuack(): void {
      this.quackBehavior.quack();
    }
  
    public setQuack(Quack: IConstructable<IQuackBehavior>): void {
        this.quackBehavior = new Quack();
    }
  
    public setFly(Fly: IConstructable<IFlyBehavior>): void {
      this.flyBehavior = new Fly();
    }
    
    public swim(): void {
      console.log('All ducks float, even decoys!');
    }
  }
  
  
  
  /** 
  * Реализация полета и его видов;
  */
  interface IFlyBehavior {
    fly(): void;
  }
  
  
  class FlyWithWings implements IFlyBehavior {
    public fly(): void {
      console.log('I’m flying!!');
    }
  }
  
  
  class FlyNoWay implements IFlyBehavior {
    public fly(): void {
      console.log('I can’t fly');
    }
  }
  
  
  class FlyRocketPowered implements IFlyBehavior {
    public fly(): void {
      console.log('I’m flying with a rocket!');
    }
  }
  
  
  
  /** 
  * Реализация кряканья и его видов;
  */
  interface IQuackBehavior {
    quack(): void;
  }
  
  
  class Quack implements IQuackBehavior {
    public quack(): void {
      console.log('Quaaaaaaaack!!!');
    }
  }
  
  
  class MuteQuack implements IQuackBehavior {
    public quack(): void {
      console.log('<< Silence >>');
    }
  }
  
  
  class Squeak implements IQuackBehavior {
    public quack(): void {
      console.log('Squeak');
    }
  }
  
  
  class Silence implements IQuackBehavior {
    public quack(): void {
        console.log('...');
    }
  } 
  
  
  
  /**
  * Классы видов уток;
  */
  class MallardDuck extends Duck {
    constructor() {
      super();
      this.setQuack(Squeak);
      this.setFly(FlyWithWings);
    }
  }
  
  
  class ModelDuck extends Duck {
    constructor() {
      super();
      this.setQuack(Silence);
      this.setFly(FlyNoWay);
    }
  }
  
  
  class RoboDuck extends Duck {
    constructor() {
      super();
      this.setQuack(Quack);
      this.setFly(FlyRocketPowered);
    }
  }
  


  /**
   * Экземпляры и тестирование 
   */
  const myMallardDuck: Duck = new MallardDuck();
  myMallardDuck.performQuack(); // Squeak
  
  const myRoboDuck: Duck = new RoboDuck();
  myRoboDuck.performQuack(); // Quaaaaaaaack!!!
  myRoboDuck.performFly();  // I’m flying with a rocket!
  myRoboDuck.setQuack(Squeak);
  myRoboDuck.performQuack(); // Squeak