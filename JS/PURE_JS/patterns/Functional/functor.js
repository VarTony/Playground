const functor = x => f => functor(x && f ? f(x): null);

functor(5)(x => x * (x / 50))(x => x + 5)(x => String(x))(x => [x])(x => {
console.log(x);
return(x);
});  // ['5.5'];






//Version 2.
//При отсоствии переданного обработчика, считает что зто последний вызов и возвращает результирующие значение.
// Не является канноничным.

const customFunctor = x => f => f 
    ? functor(x && f ? f(x): null) 
    : x;

const result = customFunctor(5)(x => x * (x / 50))(x => x + 5)(x => String(x))(x => [x])(x => {
console.log(x);
return(x);
})();

console.log(result);
