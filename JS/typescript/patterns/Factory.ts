// Паттерн фабрика(Factory)  

interface Aircon {
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
  
  
  class ElectroluxAircon extends Aircon {}
  
  class LGAircon extends Aircon {}
  
  class GreenAircon extends Aircon {}
  
  class GreeAircon {};
  
  
  class GreeFactory {
    public static createAircon(brand: string, power: number, color: string, inverter: boolean) {
      return {
        'Gree': new GreeAircon(power, color, inverter, 'Gree'),
        'Green': new GreenAircon(power, color, inverter, 'Green'),
        'LG': new LGAircon(power, color, inverter, 'LG'),
        'Electrolux': new ElectroluxAircon(power, color, inverter, 'Electrolux')
      }[brand]
    }
  }
  
  const lb15ProL: Aircon = GreeFactory.createAircon('Electrolux', 87, 'Yellow', true);