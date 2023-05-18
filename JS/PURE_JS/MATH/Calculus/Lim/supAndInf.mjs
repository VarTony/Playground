import { listToSet } from "../../Some functions/exports";


// Верхняя грань (Преобразует список в множество)
const sup = X => Math.max(...X);


// Нижняя грань (Преобразует список в множество)
const inf = X => Math.min(...X);


/*  Находит супремум и инфимум (верхнюю и нижнюю грань) числового множества,
    работает только с закрытыми множествами.
    Сигнатура:
     X: Потенциальное множество
     isList: По умолчанию считает, что первый аргумент множество, а не список. 
 */
const sideDefiner = (X, isSet = true) => {
    const set = isSet ? X : listToSet(X);
    
    return ({ infimum: inf(set), supremum: sup(set) })
} 

export { sideDefiner };