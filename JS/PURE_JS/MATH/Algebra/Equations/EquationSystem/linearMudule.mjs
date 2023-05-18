import { linearEquation } from "../exports.mjs"


// Модуль для решения системы из двух линейных уравнений с двумя неизвестными.
const linearModule = (rawParmas, primaryX, combainedCoefY) => {
  const [a2, b2, c2, y1] = rawParmas;

  if (combainedCoefY === 0) return { x: undefined, y:  undefined, answer2: `Нет корней` }

  const y = linearEquation((b2 + y1), ((a2 * primaryX) + c2)); // Находим [y].
  const x = linearEquation ( 2, ((b2 * y) + c2)); // Находим [x] через  подстановку [y] во второе уравнение.  

  return { x, y }

};

  export { linearModule };

