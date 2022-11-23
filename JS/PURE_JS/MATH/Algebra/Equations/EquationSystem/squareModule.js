// Набор процедур для решения системы квадратных уравнений с двумя неизвестными (Не путать с уравнениями второй степени).

/* Вспомогательные функции */

// Процедура для решений квадратных уравнений через дискриминант.
import squareEquationViaD from '../squareEquationViaD'; 


// Находит по паре найденых корней [y], квадру [x] корней.
const findXsForPairY = (a, b, c, pairValues) => {
    const xRoots = pairValues.reduce((xRoots, y, i) => {
      // Наименование пары [x]`ов для конкретного значения [y] ->
      const nameForPairX = `xs_for_y${i + 1}`;  
      // Передаем процедуре квадратных уравнений в том числе домноженный y на коэфициэнт b ->
      const { result, message } = squareEquationViaD(a, (b * y), c);
      // Если в множестве действительных чисел нет корней([x]) для данного уравнения, возвращаем сообщение об этом -> 
      xRoots[nameForPairX] = result  
        ? result
        : message;
  
      return xRoots;
  
    }, {});
  
    return xRoots;
  
  };


/* Квадратный модуль для подстановки в систему уравнений */
const squareModule = (rawParmas, primaryX, combainedCoefY) => {
  
  const [a1, a2, b2, c1, c2] = rawParmas;

  // ? Вероятный результат для первого уравнения с 1 неизвестным; ->
  if (combainedCoefY === 0) {
    const xRoots = squareEquationViaD(a1, 0, c1);

    return {
      x: xRoots.result, y: combainedCoefY,
      answer2: `Результат второго уравнения [${ xRoots.result.x1 } || ${ xRoots.result.x2 }] = ${ -c2 };`
    }
  }

  const pairY = squareEquationViaD(combainedCoefY, (a2 * primaryX), c2, 'y');
  const quartetX = findXsForPairY(a2, b2, c2, Object.values(pairY.result));

  return { y: pairY.result, x: quartetX }
};

  export { squareModule };