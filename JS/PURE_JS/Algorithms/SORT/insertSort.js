let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


const leveler = (list, i) => {
  list = [...list];

  if(list[i] > list[i+1] && i >= 0) {
    [list[i], list[i + 1]] = [list[i + 1], list[i]];
    return leveler(list, --i);
  }
  return list;
}


const insertSort = list => {
  let listSize = list.length;
  let i = 0;

  while(i < listSize) {
    if(list[i] > list[i+1]) list = leveler(list, i);
    i++;
  }
  return list
}


const sortedData = insertSort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);

