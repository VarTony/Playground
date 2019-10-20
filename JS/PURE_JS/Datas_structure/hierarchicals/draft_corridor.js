
//Test data

const rageList = (len = 500, list = []) => len
? rageList(--len, list = [...list, len])  
: list;

const testList = rageList(800, []);


//Draft realisation 

function Corridor(list = []) {
  this.corridor = list;
}

Corridor.prototype.backToFlat = function() {
  if(this.corridor[0][0]) {
      this.corridor = [...this.corridor[0], ...this.corridor[1]];
  } 
}

Corridor.prototype.goToForward = function() {
  this.backToFlat();
  const right = this.corridor.filter(value => !(value % 2));
  const left = this.corridor.filter(value => (value % 2));
  this.corridor = [[...right], [...left]];
  return this.corridor;
}

Corridor.prototype.goToBack = function() {
  this.backToFlat();
  const right = this.corridor.filter(value => !(value % 2));
  const left = this.corridor.filter(value => (value % 2));
  this.corridor = [[...left], [...right]];
  return this.corridor;
}

const corridor1 = new Corridor(testList);

corridor1.goToForward();
corridor1.goToBack();
