
class DependencyInjector {

  constructor() {
    this.registry = [];
  }

 register(name, resolve) {
    this.registry[name]=resolve;
    return;
  }

 resolve(name) {
    if(this.registry[name]) return this.registry[name]();

    else throw new Error('Нет такой зависимости.')   
  } 

  inject(someClass, type) {
   console.log(type, this.resolve(type));
   const exemplar = new someClass(this.resolve(type));
   return exemplar;
  }

 registered(name) {
    return Boolean(this.registry[name])
  }
}



class DbConnector {
    connection() {
      return 'Database is connected'
    }
}



class IClass {
  constructor(connector) {
    this.preview = 'I`m a Class';
    this.db = connector.connection();
  }

  getDB() {
    console.log(this.db);
  }

}



const dependencyInc = new DependencyInjector();

dependencyInc.registered('something');
dependencyInc.register('IClass', () => {
  return new DbConnector();
});



const iClass1 = dependencyInc.inject(IClass, 'IClass');
iClass1.getDB();
