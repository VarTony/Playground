const logger = (strategy, level, ...messages) => {
    messages.forEach(massage => strategy(level, massage))
}

const loggerStrategy = (level, massage) => console[level](massage);
logger(loggerStrategy, 'error', 'Error validate', 'Memory crash');


//Суть паттерна в том, что первым аргументом передаем функцию обратного вызова,
// а следующими значения для нее.
//Таким образом можно динамичски изменять, например, метод или другую функцию добавляя в нее логику извне.
