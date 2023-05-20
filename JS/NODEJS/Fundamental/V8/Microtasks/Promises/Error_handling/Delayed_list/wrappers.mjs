/**
 * Вспомогательные функции обертки для использлвания в примере
 *  очереди отложенного исполнения ошибок:
 */
const timersWrapper = (fn, count = 0) => () => setTimeout(fn, count);
const logsWrapper = data => () => console.log(data);

export { timersWrapper, logsWrapper };