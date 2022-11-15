import { linearEquation } from "./"

// Функция жля решения системы из двух линейных уравнений с двумя неизвестными.
/* 
Сигнатура аргументов:
  equation1/2 -> { a: a(x), b: b(y), c: -c }, -> с по умолчанию находится в правой стороне, за знаком рпвенства. 
  equationForm:  
    1 -> явная форма записи уравненя(по умолчанию), с перенесеным за знак равенства свободным членом c - [ax + bx = c]. 
    0 -> неявная форма записи, с не перенесеным за знак равенства c - [ax + bx -c = 0].
*/



const linearEquationSystem = (equation1, equation2, explicitForm = 1) => {
    
    const c1 = explicitForm ? equation1.c : -equation1.c;
    const c2 = explicitForm ? equation2.c : -equation2.c;
    const [a1, a2, b1, b2 ] = [equation1.a, equation2.a, equation1.b, equation2.b];
  
  // ? Вероятный результат для первого уравнения с 1 неизвестным; ->
  if (y1 + b2 === 0) {
    console.warn(`Неопределенность:  y1 = ${y1}; y2 = ${b2} -> y = 0;`);
    const x = linearEquation(a1, 0, -c1);
    const y = y1 + b2;
    
    return { x, y, 
            answer2: `Результат второго уравнения ${ x } = ${c2};` 
    }
  }
  
    const x1 = c1 / a1; // Находим значение первого [x], для подстановки во второе уравнение;
    const y1 = ( -b1 / a1 ) * a2; // Коэффициэнт первого [y] для сложения со вторым.
    
    const y = (-(a2 * x1) + c2) / (b2 + y1); // Находим [y].
    const x = (-(b2 * y) + c2) / a2; // Находим x через  подстановку [y] во второе уравнение.  
    
    return { x, y }
  
  };
  
  const testAnswer = linearEquationSystem(
    { a: 1, b: 2, c: 16 },
    { a: 1, b: 2, c: 16 }
  );
  
  console.log(testAnswer);