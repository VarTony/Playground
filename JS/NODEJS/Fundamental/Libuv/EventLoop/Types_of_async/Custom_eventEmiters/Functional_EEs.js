/**
 * На основании замыканий.
 */
const clojEventEmiter = () => {
    const events = {};

    // Вешает на события функции:
    const on = (name, fn) => {
        const isEvent = Boolean(events.name);

        if (isEvent) events[name].push(fn);
        else events[name] = [ fn ];
    }

    // Обрабатывает событие пропуская аргументы через все обработчики:
    const emit = (name, ...data) => {
        const isEvent = Boolean(events.name);

        if(isEvent) events[name].forEach(fn => fn(...data));
        return;
    }

    return { on, emit }
}

// Получили объект с двумя методами и замкнутой хеш таблицей:
const myEmiter = clojEventEmiter();



/**
 * Примерно тоже самое, что и версия выше, только в функциональном стиле.
 */
const funcEventEmiter = (events = {}) => ({
   on: (name, fn) => (events[name] = events[name] ? [...events[name], fn] : [fn]),
   emit: (name, ...data) => events[name] ? events[name].forEach(fn => fn(...data)) : null
});

const myFuncEmiter = funcEventEmiter();