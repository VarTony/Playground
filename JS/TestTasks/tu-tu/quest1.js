// Написать функцию dscount, которая подсчитывает количество идущих подряд символов s1 и s2 
// в строке, без учёта регистра. Функция должна пройти следующие тесты, как минимум:

// "use strict";

// Yor code here ...
// Ваш код реализации функции dscount
// ... //


    // test(dscount, ['ab___ab__', 'a', 'b'], 2);
    // test(dscount, ['___cd____', 'c', 'd'], 1);
    // test(dscount, ['de_______', 'd', 'e'], 1);
    // test(dscount, ['12_12__12', '1', '2'], 3);
    // test(dscount, ['_ba______', 'a', 'b'], 0);
    // test(dscount, ['_a__b____', 'a', 'b'], 0);
    // test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    // test(dscount, ['aAa', 'a', 'a'], 2);



// Обратите внимание на производительность вашего решения.
// Решение должно быть компактным.
// Решение должно быть простым, умещаться в 1м файле и содержать не более 20 строк кода.
// Идеальное время решения на задачу не более 15 минут (задачу можно решить и за 5 минут).

const dscount = (string, char1, char2) => {

    let arr = string.split('');
    arr = arr.map(char => char.toLowerCase());
    let i = 0;
    let j = 1;
    let count = 0;
 
    while(i <= arr.length) {

      if(arr[i] === char1 && arr[j] === char2) {
        i++;
        j++;
        count++;
      }

      else {
        i++;
        j++;
      }
    }
    return count;

}


const test = (f, params, result) =>  f(...params) === result ? true : false;


    test(dscount, ['ab___ab__', 'a', 'b'], 2);
    test(dscount, ['___cd____', 'c', 'd'], 1);
    test(dscount, ['de_______', 'd', 'e'], 1);
    test(dscount, ['12_12__12', '1', '2'], 3);
    test(dscount, ['_ba______', 'a', 'b'], 0);
    test(dscount, ['_a__b____', 'a', 'b'], 0);
    test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    test(dscount, ['aAa', 'a', 'a'], 2);


    // 7 минут с учетом написания теста;