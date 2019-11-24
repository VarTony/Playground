class Tea {
  constructor(temperature, cost, color) {
    this.temperature = temperature;
    this.cost = cost;
    this.color = color;
  }
  getPrice() {
    this.cost += this.temperature < 15 ?  5 : 0;
    return this.cost;
  }
}



class blackTea extends Tea {
  constructor(temperature = 85, cost = 21){
    super(temperature, cost, 'black');
  }
}



class greenTea extends Tea {
  constructor(temperature = 85, cost = 23){
    super(temperature, cost, 'green');
  }
}


const sugarMixin = tea => {
  tea.addSugar = function() {
    this.sugar = true;
    this.cost += 0.89; 
  }
  return tea;
}

const cupOfGreenTea = sugarMixin(new greenTea(8));
const cupOfBlackTea = sugarMixin(new blackTea(10));

console.log(cupOfGreenTea.getPrice());
cupOfBlackTea.addSugar();
console.log(cupOfBlackTea.getPrice());
