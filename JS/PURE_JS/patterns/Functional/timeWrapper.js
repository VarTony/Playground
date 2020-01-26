
const timeWrapper = (ms, fn) => {
  let timer = setTimeout(() => { timer = null }, ms);
  return (...args) => {
    if(timer) {
     clearTimeout(timer);
     timer = null;
     return fn(...args);
    }
    return 'lost time';
  }
}


const someFunc = arg => arg;

const singleRun1 = timeWrapper(10, someFunc);
const singleRun2 = timeWrapper(100, someFunc);
const singleRun3 = timeWrapper(1000, someFunc);


setTimeout(() => {
  console.log(singleRun1('A1'));
  console.log(singleRun2('B2'));
  console.log(singleRun3('C3'));
}, 250);

singleRun1('After');

//Позволит тебе управлять потоком времени. 
