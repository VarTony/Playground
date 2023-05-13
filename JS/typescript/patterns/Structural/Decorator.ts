/**
 * Паттерн Декоратор - позволяет добавлять объектам новые поведения на лету, помещая их в объекты-обёртки.
 * Можно часто встретить в TypeScript-коде, особенно в коде, работающем с потоками данных.
 * 
 * Описание взято с refactoring.guru
 */


/**
 * Основной Класс:
 */
interface IExoskeleton {
  getParametrs(): string;
}


class Exoskeleton implements IExoskeleton  {
  private loadСapacity: string = '30kg';
  private energyBattery: string = '35000mAh';

  getParametrs(): string {
    return `
      Energy battery: ${this.energyBattery};
      Load capacity: ${this.loadСapacity};`;
  };
}



/**
 *  Декораторы (обертки): 
 */
class ExoskeletonDecorator implements IExoskeleton {
  protected exoskeleton: IExoskeleton;

  constructor(exoskeleton: IExoskeleton) {
    this.exoskeleton = exoskeleton;
  }

  public getParametrs(): string {
    return this.exoskeleton.getParametrs();
  }
}


class BatteryUpgrade extends ExoskeletonDecorator {
  private batteryUpgrade: string = '12500 mAh';
  
  // Примешивает к базовой логике свое дополнение;
  public getParametrs(): string {
    return `
      ${super.getParametrs()}
      Battery upgrade: +${this.batteryUpgrade};`;
  } 
}


class ServoDrivesUpgrade extends ExoskeletonDecorator {
  private loadCapacityUpgrade: string = '8kg';
  private energyConsum: string = '~9100 mAh';
  
    // Примешивает к базовой логике свое дополнение;
  public getParametrs(): string {
    return `
      ${super.getParametrs()}
      Load capacity upgrade: +${this.loadCapacityUpgrade};
      Additional energy consumption: - (${this.energyConsum});`;
  };  
}



/**
 * Экземпляры и тестирование:
 */
const basicExoskeleton: IExoskeleton = new Exoskeleton();
const exoskeletonPowerPlus: IExoskeleton = new ServoDrivesUpgrade(basicExoskeleton);
const exoskeletonSuperEnergy: IExoskeleton = new BatteryUpgrade(basicExoskeleton);
const exoskeletonPro: IExoskeleton = new ServoDrivesUpgrade(exoskeletonSuperEnergy);

console.log(basicExoskeleton.getParametrs());
console.log(exoskeletonPowerPlus.getParametrs());
console.log(exoskeletonSuperEnergy.getParametrs());
console.log(exoskeletonPro.getParametrs()); /* -> 
      Energy battery: 35000mAh;
      Load capacity: 30kg;
      Battery upgrade: +12500 mAh;
      Load capacity upgrade: +8kg;
      Additional energy consumption: - (~9100 mAh);
  */