
const num0 = [1,1,1,1,0,1,1,0,1,1,0,1,1,1,1];
const num1 = [0,0,1,0,0,1,0,0,1,0,0,1,0,0,1];
const num2 = [1,1,1,0,0,1,1,1,1,1,0,0,1,1,1];
const num3 = [1,1,1,0,0,1,1,1,1,0,0,1,1,1,1];
const num4 = [1,0,1,1,0,1,1,1,1,0,0,1,0,0,1];
const num5 = [1,1,1,1,0,0,1,1,1,0,0,1,1,1,1];
const num6 = [1,1,1,1,0,0,1,1,1,1,0,1,1,1,1];
const num7 = [1,1,1,0,0,1,0,0,1,0,0,1,0,0,1];
const num8 = [1,1,1,1,0,1,1,1,1,1,0,1,1,1,1];
const num9 = [1,1,1,1,0,1,1,1,1,0,0,1,1,1,1];
const num51 = [1,1,1,1,0,0,1,1,1,0,0,0,1,1,1];
const num52 = [1,1,1,1,0,0,0,1,0,0,0,1,1,1,1];
const num53 = [1,1,1,1,0,0,0,1,1,0,0,1,1,1,1];
const num54 = [1,1,0,1,0,0,1,1,1,0,0,1,1,1,1];
const num55 = [1,1,0,1,0,0,1,1,1,0,0,1,0,1,1];
const num5s = {
  "5-1": num51,
      "5-2": num52,
        "5-3": num53,
          "5-4": num54,
              "5-5": num55
            };

//..............................Обработка значений массива для визуализации ->

const ICanSeeForever = (list) => {  
 result = list.reduce((acc, value, i = 0) => {
      if(i % 3  === 0){
        i = 0;
        acc += " \n";
      }

    acc += value <= 0 ? " ": "■";
    i++;
    return acc;
  }, "");
  return result;
}
console.log("0", "_______________", "\n", ICanSeeForever(num0), "\n");
console.log("1","_______________", "\n", ICanSeeForever(num1), "\n");
console.log("2","_______________", "\n", ICanSeeForever(num2), "\n");
console.log("3","_______________", "\n", ICanSeeForever(num3), "\n");
console.log("4","_______________", "\n", ICanSeeForever(num4), "\n");
console.log("5","_______________", "\n", ICanSeeForever(num5), "\n");
console.log("6","_______________", "\n", ICanSeeForever(num6), "\n");
console.log("7","_______________", "\n", ICanSeeForever(num7));
console.log("8","_______________", "\n", ICanSeeForever(num8), "\n");
console.log("9","_______________", "\n", ICanSeeForever(num9), "\n");
console.log("5-1","_______________", "\n", ICanSeeForever(num51), "\n");
console.log("5-2","_______________", "\n", ICanSeeForever(num52), "\n");
console.log("5-3","_______________", "\n", ICanSeeForever(num53), "\n");
console.log("5-4","_______________", "\n", ICanSeeForever(num54), "\n");
console.log("5-5","_______________", "\n", ICanSeeForever(num55), "\n", "_______________", "\n");

//......................................//


//......................Подготавительные данные ->

const nums = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];

//Веса;

//const weights = [ 0, 0, 0, 2, 0, -2, 1, 1, 0, -2, 0, 0, 1, 1, 0 ]; 
// Взвешенный вес для порогового значения 5, на всякий случай можно провести через 500 итераций;

const weights =  num0.reduce((acc, value, i = 0) => { 
// Для подбора более менее верных значений
//  требует около 11500 итераций, но для
//   точного результата 150 000;
  acc[i] = 0;
  i++;
  return acc;
  }, []);

// console.log(weights);


//Пороговая сумма;
const bias = 5;

//............................................................//

const proceed = (num, net = 0) => {         //Больше ли значение суммы перемноженного на веса, порогового значения.
  net = num.reduce((acc, value, i = 0) => {
    acc += value * weights[i]; 
    i++;
    return acc;
  }, 0);

  return bias <= net;

}


const decrease = (num, i = 0) => {

  while(i <= num.length - 1) {
      if(num[i] === 1) weights[i] -= 1;
      i++;
  }
   return weights;
}

const increase = (num, i = 0) =>{

  while(i <= num.length - 1) {
      if(num[i] === 1) weights[i] += 1; //     num[1,1,1,1,0,1,1,1,1,1...][i] === 1 ? weights[0,0,0,0,0,0,0...][i] += 1 : weights[0,0,0,0,0,0,0...][i];
      i++;
  }
     return weights;
}


const train = (num, i = 0) => {

  while(i <= 500){ 

    let option = Math.floor(Math.random() * (10 - 0) + 0);
    if(option !== 5) {
      if(proceed(num[option])) decrease(num[option]);
  }

    else {
      if(!proceed(num[option])) increase(num[option]);
  }
    i++;
  }

  // console.log("W - ","_______________", "\n", maping(weights), "\n");

  return weights;

}

train(nums);

// console.log(weights); 
console.log(`\n  Эталон пяти для сети : \n  ${ICanSeeForever(weights)}`);


const choice = +prompt("Введите число от 0 до 9 :", "");
// console.log(choice);
const whatChoice = nums[choice]; 

// console.log(whatChoice);


console.log(!proceed(whatChoice)? `\n\n\n\n\n\n\n\nэто не 5 \n ${ICanSeeForever(whatChoice)}`: `\n\n\n\n\n\n\nЭто 5 \n ${ICanSeeForever(whatChoice)}`);


const secondChoice = (choice = "") => {

  const question = +prompt("Проверить похожие символы? \n Для выбора введите 0 или 1 : ", "");

  if(question) {
    choice = prompt("Введите значение от 5-1 до 5-5 в формате 5-...", '');
    console.log(proceed(num5s[choice])? `\n\n\n\n\n\n${ICanSeeForever(num5s[choice])} \t Оно похоже на 5.`: `\n\n\n\n\n\n\n${ICanSeeForever(num5s[choice])} \t Это не похоже на 5.`);
  }
}

secondChoice();


const fullChange = () => {

  let value1 = train(nums, 1);
  let value2 = train(nums, 2);
  let value3 = train(nums, 3);
  let value4 = train(nums, 4);
  let value5 = train(nums, 5);
  let value6 = train(nums, 6);
  let value7 = train(nums, 7);
  let value8 = train(nums, 8);
  let value9 = train(nums, 9);
  let value0 = train(nums, 0);

  const values = [value1, value2, value3, value4, value5, value6, value7, value8, value9, value0];

  for(let i = 0; i <= 9; i++) {

      if(values === 1) {

        console.log(`Это {i}`);
        return ICanSeeForever(nums[i]);

      }


  }

}
















