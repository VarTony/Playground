
const createMethods = (scope = this, methods = ['get', 'post', 'put', 'del']) => {
  for(const method of methods) {
    scope[method] = () => console.log(`This is method ${method}`);
  }
}

const obj = {
  create : function(scope = this) {
     createMethods(scope);
  }
}
obj.create();
obj.get();
obj.post();
obj.put();
obj.del();

createMethods();
get();
post();
put();
del();
