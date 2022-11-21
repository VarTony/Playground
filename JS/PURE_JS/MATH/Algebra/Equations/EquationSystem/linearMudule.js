import { linearEquation } from "./"

// Модуль для решения системы из двух линейных уравнений с двумя неизвестными.


const linearModule = (rawParmas, primaryX, combainedCoefY) => {
  const [a1, a2, b2, c1, c2, y1] = rawParmas;

  // ? Вероятный результат для первого уравнения с 1 неизвестным;
  if (y1 + b2 === 0) {
    console.warn(`Неопределенность:  y1 = ${ y1 }; y2 = ${ b2 } -> y = 0;`);
    const x = linearEquation(a1, 0, c1);

    return { x, y: combainedCoefY, 
        answer2: `Результат второго уравнения ${ x } = ${ -c2 };` 
      }
  }

  const y = linearEquation((b2 + y1), ((a2 * primaryX) + c2)); // Находим [y].
  const x = linearEquation ( 2, ((b2 * y) + c2)); // Находим [x] через  подстановку [y] во второе уравнение.  

  return { x, y }

};

  export { linearModule };

