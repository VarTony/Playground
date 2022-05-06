// Реализация логики линейного уравнения с 1м неизвестным.


const linearEquation = (a, ...elems) => {
  // Получаем сумму свободных членов и переносим вправо меняя знак.
  const sumOfArguments = ((-1) * elems.reduce((elem, sum) => sum + elem, 0)); 
  // Делим получившуюся сумму на множитель x, поумолчанию должен быть 1;
  const x = (sumOfArguments / a);

  console.log(`Ответ: x равен - [ ${x} ];`);
  return x;
}

// Для 15x - 8 + 10 = 0
linearEquation(15, -8, 10);