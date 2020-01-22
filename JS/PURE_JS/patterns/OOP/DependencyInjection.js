class DependencyInc {

  constructor() {
    this.registry = [];
  }

 register(name, resolve) {
    this.registry[name]=resolve;
    return;
  }

 resolve(name) {
    if(this.registry[name]) return this.registry[name]();

    else throw new Error('Нет такого решения.')   
  }

 registered(name) {
    return Boolean(this.registry[name])
  }
}



class IClass {
  constructor() {
    this.preview = 'I`m a Class';
    this.db;
    this.config;
  }

  setDB(db) {
    this.db=db;
  }

  setConfig(config) {
    this.config=config;
  }

  getDB() {
    console.log(this.db);
  }

  getConfig() {
    console.log(this.config);
  }
}



const dependencyInc = new DependencyInc();


dependencyInc.registered('something');
// dependencyInc.resolve('enybody');
dependencyInc.register('IClass', () => {
  const iClass = new IClass();
  iClass.setDB('moonDb every night');
  iClass.setConfig('port: 1023');
  return iClass;
});

const iClass1 = dependencyInc.resolve('IClass');

iClass1.getDB();
iClass1.getConfig();
