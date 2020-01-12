const woodWithBananas = [1,2, [1, {}], 2, 3, {key1: 3, key2 : 5}, null, [1,2,3, [15, [32, 12]]]];

const monkey = (wood) => {
  let result, keys, value;

  if(Array.isArray(wood)) result = wood.map(value => typeof value !== 'object'? 0: monkey(value));

  if(typeof wood === 'object' && !Array.isArray(wood) && wood !== null) {
    result = {};
    for(let key in wood) result[key] = 0;
  }

  if(wood === null) result = null

  return result;
}


console.log(monkey(woodWithBananas));
