

function Constructor(value, name, price) {
  this.value = value;
  this.name = name;
  this.price = price;
}

const example = new Constructor('1024', 'mb', '1024000');
Constructor.prototype.getHash = () => '1f01b41268646ebac076b97e3bac466f589accdb salt : ffcc6c417067fc70b3920856a67d67b583e8ab5c0e1755c74e89600032b2d959';
console.log(example.getHash());

/*

class Constructor {
    constructor() {
        this.value = value;
        this.name = name;
        this.price = price;
    }
}

В общем, конструктор это тоже паттерн.

*/
