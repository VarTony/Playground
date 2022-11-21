//Загрузка модулей.
import { squareModule, linearModule } from './'


// Общая процедура для систкм квадратных уравнений с двумя неизвестными.
/* 
 Сигнатура аргументов:
  equation1/2 -> { a: a(x^n), b: b(y^n), c: -c }, -> с по умолчанию находится в правой стороне, за знаком равенства. 
  explicitForm:  
    1 -> Явная форма записи уравненя(по умолчанию), с перенесеным за знак равенства свободным членом c - [ax + bx = c]. 
    0 -> Неявная форма записи, с не перенесеным за знак равенства c - [ax + bx -c = 0].

  P.S При передаче аргументов вспомогательным функциям инверсируем [c]1/2, так как они работают с неявной формой уравнений.
*/
const templatEquationSystem = (equation1, equation2, explicitForm = 1, moduleOfEquationSystem = linearModule) => {

  const c1 = explicitForm ? equation1.c : -equation1.c;
  const c2 = explicitForm ? equation2.c : -equation2.c;
  const [a1, a2, b1, b2] = [equation1.a, equation2.a, equation1.b, equation2.b];
  // Находим значение коэффициэнта первого [x], для подстановки во второе уравнение ->
  const primaryX = c1 / a1; 
  // Коэффициэнт первого [y] для сложения с коэффициэнтом второго ->
  const y1 = (-b1 / a1) * a2; 
  const combainedCoefY = y1 + b2;

  const roots = moduleOfEquationSystem([a1, a2, b2, -c1, -c2, y1], primaryX, combainedCoefY  );

return roots;

}

export { templatEquationSystem };

  // Тестовые данные.
  const testAnswer = linearEquationSystem(
    { a: 1, b: 2, c: 16 },
    { a: 1, b: 2, c: 16 }
  );
  
  console.log(testAnswer);