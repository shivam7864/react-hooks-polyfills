const arr = [1, 2, 3, 4, 5];

const thisIsThis = { hey: 1 };

const result = myMap(arr, transformArray, thisIsThis);
console.log(result);

function transformArray(elem, index, myArray) {
  console.log(this);

  return elem * elem;
}

function myMap(dataArray, callbackFn, thisArg) {
  let finalArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    const value = dataArray[i];
    const newValue = callbackFn(value, i, dataArray);
    finalArray.push(newValue);
  }
  return finalArray;
}
