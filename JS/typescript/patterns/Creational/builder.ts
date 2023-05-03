/*
 * Паттерн Строитель - Позволяет не перезагружать конструкторы при
 * потребности собрать новую конфигурацию объекта. 
 * Говоря иначе, отделяет конструирование сложного объекта от его представления, 
 * так что в результате одного и того же процесса конструирования могут получаться
 * разные представления.
*/


class MainConfig {
    private _ip: string;
    private _ipVersion: string;
    private _mask: string;
    private _location: string;
      
    constructor(
     ip: string,
     ipVersion: string,
     mask: string,
     location: string
    ) {
      this._ip = ip;
      this._ipVersion = ipVersion;
      this._mask = mask;
      this._location = location;
    }
    
    public static builder() {
      return ConfigBuilder;
    }
  
    public getConfig() {
      const allConfigData: {} = { 
        ip: this._ip, ipVersion: this._ipVersion,
        mask: this._mask, location: this._location 
    };
      
    const config: {} = Object
      .keys(allConfigData)
      .reduce((conf, key) => allConfigData[key] 
        ? {...conf, [key]: allConfigData[key] }
        :  conf
      , {});
      
      return config;
    }
  }
  
  
  class ConfigBuilder {
    private static  _ip: string;
    private static _ipVersion: string;
    private static _mask: string;
    private static _location: string;
    
    public static ip(ip: string) {
      this._ip = ip;
      return this;
    }
    
    public static ipVersion(ipVersion: string) {
      this._ipVersion = ipVersion;
      return this;
    }
    
    public static mask(mask: string) {
      this._mask = mask;
      return this;
    }
    
    public static location(location: string) {
      this._location = location;
      return this;
    }
  
    public static build() {
      return new MainConfig(this._ip, this._ipVersion, this._mask, this._location);
    }
  }
  
  
  const userConfig = MainConfig
    .builder()
    .ip('192.217.12.5')
    .mask('255.255.15.3')
    .build()
    .getConfig();
  
  const engineerConfig = MainConfig
    .builder()
    .ip('192.217.12.5')
    .ipVersion('IpV4')
    .mask('255.255.15.3')
    .location('Russia/St.Petersbug')
    .build()
    .getConfig();
  
  console.log('\nUser`s: ', userConfig);
  console.log('\nEngineer`s: ', engineerConfig)