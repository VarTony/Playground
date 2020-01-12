let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


const replacer = (list, step, counts) => {
  list = [...list];
  let {i, j} = counts;
  [list[i], list[j]] = [list[j], list[i]];
  j = i - step;

  while(j) {
    if(list[i] < list[j]) {
      [list[i], list[j]] = [list[j], list[i]];
      i -= step
      j -= step;
    } else {
      break
    }

  }

  return list;
}


const shellSort = (list, step) => {
  if(step === undefined) step = Math.floor(list.length / 2)
  if(step <= 0) return list;
  let i = 0;
  let j = step;

  while(i < list.length) {
    if(list[i] > list[j]) list = replacer(list, step, {i, j});
    i++;
    j++;
  }

  return shellSort(list, Math.floor(step / 2))
}


const sortedData = shellSort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);
