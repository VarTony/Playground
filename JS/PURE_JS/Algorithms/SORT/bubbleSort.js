let testData = '2412 7 8 9 121 50 -18 37 1231 1 31 212 38 25'.split(' ');
testData = testData.map(char => +char);


const bubbleSort = (list) => {
  list = [...list];
  let i = j = 0;
  const listSize = list.length;

  while(i < listSize) {
    while(j < listSize) {
      if(list[j] > list[j + 1]) [list[j + 1], list[j]] = [list[j], list[j + 1]];
      j++;
    }
    j = 0;
    i++;
  }
  return list;
}


const sortedData = bubbleSort(testData);
console.log('Data : ', testData);
console.log('Sorted_data : ', sortedData);
