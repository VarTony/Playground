import { listToSet } from "../../Some functions/exports";


// Верхняя грань (Преобразует список в множество)
const sup = X => Math.max(listToSet(X));


// Нижняя грань (Преобразует список в множество)
const inf = X => Math.min(listToSet(X));


/* Находит супремум и инфимум (верхнюю и нижнюю грань) числового множества,
    по умолчанию считает что множество закрытое
 */
const sideDefiner = set => ({ infimum: inf(set), supremum: sup(set) })

export { sideDefiner };