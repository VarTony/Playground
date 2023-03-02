import { factorial } from '../Some functions/exports';


// Бином Ньютона, - позволят расчитать колличество сочетаний из выборки(n) по (k) раз (без повторов).
const binTheorem = (n, k) => factorial(n) / factorial(k) * factorial(n - k);

export { binTheorem as binomialTheorem };