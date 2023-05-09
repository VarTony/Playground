

/**
 * Фасад — это структурный паттерн проектирования, который предоставляет простой интерфейс к 
 * сложной системе классов, библиотеке или фреймворку.
 * 
 * Фасад — это простой интерфейс для работы со сложной подсистемой, содержащей множество классов. 
 * Фасад может иметь урезанный интерфейс, не имеющий 100% функциональности, которой можно достичь, 
 * используя сложную подсистему напрямую.
 * Но он предоставляет именно те фичи, которые нужны клиенту, и скрывает все остальные.
 * 
 * Описание взято с refactoring.guru
 */
class PCI {
    private static data: any; 
    
    public static setData(data: any) {
      this.data =  data;
    }
  
    public static getData() {
      return this.data;
    }
  }
  
  
  class CPU {
    private static data: any;
    private static numInSys: string;
    
    public static calculation() {
      this.data = PCI.getData();
      // ... Something details
    }
  
    public static connectWithMotherboard(numInSys: string) {
      this.numInSys = numInSys;
    }
  }
  
  
  class RAM {
    private static numInSys: string;
    
    public static connectWithMotherboard(numInSys: string) {
      this.numInSys = numInSys;
    }
    
    //... Something details
  }
  
  
  class GPU {
    private static data: any;
    private static numInSys: string;
    
    public static setDataFromPci() {
      this.data = PCI.getData();
    }
  
    public static getDataToPci() {
      PCI.setData(this.data);
    }
  
    public static connectWithMotherboard(numInSys: string) {
      this.numInSys = numInSys;
    }
  
    //...
  }
  
  
  class Motherbroad {
    private static initialData: any = '28b8c8f9a....10e';
    private static numsDevices: any = { 
      cpu: '0000000',
      ram: '0000001',
      gpu: '0000010'
      // ...
    };
    
    public static initialBlockLoading() {
      return this.initialData;
    }
  
    public static BIOS() {
      this.deviceEnumeration();
      return this.numsDevices;
    }
  
    public static deviceEnumeration() {
      CPU.connectWithMotherboard(this.numsDevices.cpu);
      RAM.connectWithMotherboard(this.numsDevices.ram);
      GPU.connectWithMotherboard(this.numsDevices.gpu);
      // ...
    }
  
    public static getNumsDevices() {
      return this.numsDevices;
    }
    // ...
  } 
  
  
  // Facade
  class Computer {
    private static initialData: any;
    private static numsDevices: {};
    
    public static on() {
      this.bootstap();
  }
  
    private static bootstap() {
      this.initialData = Motherbroad.initialBlockLoading();
      Motherbroad.BIOS();
      this.numsDevices = Motherbroad.getNumsDevices();
      // ...
    }
  
    // ...
  }
  
  
  Computer.on();