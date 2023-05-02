 /**
  * Паттерн Прототип - данный подход позволяет создавать клонированные
  * копии любых объектов. Может пригодится в случаях когда нужно создавать
  * много однотипных объектов.
  * Сложности могут возникнуть в случае сложно составных объектов,
  * таких например как заказ в интернет магазине, так как, прямое
  * копирование так же приведет и к копированию id и даты, что вызовет
  * конфликт/ы.
 */

 interface anyObject {
    [key: string]: any;
 }


class Config {
    public ip: string;
    public mask: string;

    constructor(
     ip: string,
     mask: string,
    ) {
      this.ip = ip;
      this.mask = mask;
    }
  }
  
  class CloneFactory {
    public static getClone(prototype: {}): anyObject {
      return { ...prototype }
    }
  }
  
  const protoOfUserConf = new Config('192.168.0.1', '255.255.255.0');
  
  const confForUser_217 = CloneFactory.getClone(protoOfUserConf);
  
  confForUser_217.ip = '192.217.15.0';
  
  console.log('\n', protoOfUserConf, '\n', confForUser_217);