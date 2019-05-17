const testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);

const qsort = list => {
  if(list.length <= 1) return list;

  const pivot = list[Math.floor(Math.random() * list.length)];
  const less = list.filter(value => value < pivot);
  const greater = list.filter(value => value > pivot);
  return [...qsort(less), pivot, ...qsort(greater)];
}

let sortedData = qsort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);
