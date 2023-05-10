/**
 * Паттерн Стратегия - позволяет реализовать полиморфизм методов экземпляров
 * через вынос их алгоритмов в собственные классы.
 * Иначе говоря изменяемая часть логики вынесена в отдельные классы, а статическая 
 * остается в родительском классе.
 */

// Костыль
interface Constructable<T> {
    new(...args: any) : T;
}

class Duck {
    quackBehavior: QuackBehavior;
    flyBehavior: FlyBehavior;
    
    // public abstract display(): void;
    
    public performFly(): void {
      this.flyBehavior.fly();
    }
  
    public performQuack(): void {
      this.quackBehavior.quack();
    }
  
    public setQuack(Quack: Constructable<QuackBehavior>): void {
        this.quackBehavior = new Quack();
    }
  
    public setFly(Fly: Constructable<FlyBehavior>): void {
      this.flyBehavior = new Fly();
    }
    
    public swim(): void {
      console.log('All ducks float, even decoys!');
    }
  }
  
  
  
  /** 
  * Реализация полета и его видов;
  */
  interface FlyBehavior {
    fly(): void;
  }
  
  
  class FlyWithWings implements FlyBehavior {
    public fly(): void {
      console.log('I’m flying!!');
    }
  }
  
  
  class FlyNoWay implements FlyBehavior {
    public fly(): void {
      console.log('I can’t fly');
    }
  }
  
  
  class FlyRocketPowered implements FlyBehavior {
    public fly(): void {
      console.log('I’m flying with a rocket!');
    }
  }
  
  
  
  /** 
  * Реализация кряканья и его видов;
  */
  interface QuackBehavior {
    quack(): void;
  }
  
  
  class Quack implements QuackBehavior {
    public quack(): void {
      console.log('Quaaaaaaaack!!!');
    }
  }
  
  
  class MuteQuack implements QuackBehavior {
    public quack(): void {
      console.log('<< Silence >>');
    }
  }
  
  
  class Squeak implements QuackBehavior {
    public quack(): void {
      console.log('Squeak');
    }
  }
  
  
  class Silence implements QuackBehavior {
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
    
    // public display(): void {
    //   console.log('I`m duck from a lake.');
    // }
  }
  
  
  class ModelDuck extends Duck {
    constructor() {
      super();
      this.setQuack(Silence);
      this.setFly(FlyNoWay);
    }
    
    // public display(): void {
    //   console.log('I’m a model duck');
    // }
  }
  
  
  class RoboDuck extends Duck {
    constructor() {
      super();
      this.setQuack(Quack);
      this.setFly(FlyRocketPowered);
    }
    
    // public display(): void {
    //   console.log('I’m a robo-duck');
    // }
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