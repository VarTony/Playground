/*
  *  Фабричный метод(Factory) — порождающий паттерн проектирования, 
  *   который определяет общий интерфейс для создания объектов в суперклассе, 
  *   позволяя подклассам изменять тип создаваемых объектов.
*/


type brandOfAircon = 'Gree' | 'Green' | 'Electrolux' | 'LG';

interface IAircon {
    brand: string;
    power: number;
    color: string;
    inverter: boolean;
  }
  
  class Aircon {
    brand: string;
    power: number;
    color: string;
    inverter: boolean;
  
    constructor(power: number, color: string, inverter: boolean, brand: string) {
      this.power = power;
      this.color = color;
      this.inverter = inverter;
      this.brand = brand;
    }
  
    public powerOn() {
      return `Aircon turned on, power consumption ${this.power}`;
    }
  }
  
  
  class ElectroluxAircon extends Aircon {};
  
  class LGAircon extends Aircon {};
  
  class GreenAircon extends Aircon {};
  
  class GreeAircon extends Aircon {};
  
  
  class GreeFactory {
    public static createAircon(brand: brandOfAircon, power: number, color: string, inverter: boolean): IAircon {
      return {
        Gree: new GreeAircon(power, color, inverter, brand),
        Green: new GreenAircon(power, color, inverter, brand),
        LG: new LGAircon(power, color, inverter, brand),
        Electrolux: new ElectroluxAircon(power, color, inverter, brand)
      }[brand];
    }
  }

  // Создает на фабрике экземпляр нужного бренда
  const lb15ProL: IAircon = GreeFactory.createAircon('Electrolux', 87, 'Yellow', true);