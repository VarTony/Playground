
// Реализация 'в лоб', находит характеристику и мантиссу логарифма просто перебором степеных значений.

//-----\.....version 2...../-----> //Считает логарифм до 50000 с отклонением до 0.01%;

const log = (x, a = 2.71828) => { //логарифм х по оснаванию а;
  
  console.log('Основание идет вторым параметром, по умолчанию ~e.');
	if(x < 0 || a < 0) 
    return 'Это так не работает, функция не принимает отрицательных значений.';
  if(typeof(x) !== 'number' || typeof(a) !== 'number') 
    return 'Аргументами могут выступать только положительные числа';
	let j = i = n = 0;
  let qn = 0.9;
  let q2 = q1 = 0.01;
	
  while(true) {

		if((a ** n)  >= (x * 0.9999) && (a ** n)  <= x) break;
		
    if((a ** n) > (x * qn) && (a ** n) < (x)) {
			i++;
     	if(i >= 100) {
        	qn = (qn * 0.1) + qn;
        	i = 0;
        	q1 = q1 * 0.1;
      	
      		}

     		// console.log(n, q1, i);
     	n +=  n * q1;
			continue;
		} 

		if((a ** n) < x) {
			n++;
			continue;
		}

		if((a ** n) > x) {
      j++;
      if(j >= 100) {
        j = 0;
        q2 *= 0.1;  
      }

      	// console.log('with q2 : ', n, q2, j);
		n -= n * q2;
		continue;

	  }
  }

	return ` Результат приблизительно равен : ${n} \n с погрешностью <= 0.01%`

}
console.log('Основание идет вторым параметром, по умолчанию ~e.');

// log(50032);
