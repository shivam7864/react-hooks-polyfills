const arr1 = [1, 2, 3, 4, 5];
const arr2 = new Array(10);
const arr3 = [1, , , 2, , 3, , 4];
const arr4 = { length: 3, 0: 10, 1: 20, 2: 30,3:33 };

Array.prototype.myMap = function (callbackFn) {
  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback function is not a function");
  }

  let finalArray = new Array(this.length);
  let flag = 0;

  //map does not uses for  loop it uses while loop;

  //   for (let i = 0; i < this.length; i++) {
  //     if (this.hasOwnProperty(i)) {
  //       const value = this[i];
  //       const newValue = callbackFn(value, i, this);
  //       finalArray.push(newValue);
  //     }
  //   }

  //while loop
  while (flag < this.length) {
    if (this.hasOwnProperty(flag)) {
      const value = this[flag];
      const newValue = callbackFn(value, flag, this);
      finalArray[flag] = newValue;
    }
    flag++;
  }

  return finalArray;
};

function getSquareOfNumber(elem) {
  return elem * elem;
}

const r1 = arr1.map((d) => d * 2);
const r2 = arr2.map((d) => d * 2);
const r3 = arr3.map((d) => d * 2);
const r4 = Array.prototype.map.call(arr4, (d) => d * 2);
// console.log({r1,r2,r3,r4});

const result1 = arr1.myMap((d) => d * 2);
const result2 = arr2.myMap((d) => d * 2);
const result3 = arr3.myMap((d) => d * 2);
const result4 = Array.prototype.myMap.call(arr4, (d) => d * 2);
// console.log({ result1,result2,result3,result4});



// const thisIsThis = { hey: 1 };
// const result = myMap(arr, transformArray, thisIsThis);

// function transformArray(elem, index, myArray) {
//   return elem * elem;
// }

// function myMap(dataArray, callbackFn, thisArg) {
//   let finalArray = [];
//   for (let i = 0; i < dataArray.length; i++) {
//     const value = dataArray[i];
//     const newValue = callbackFn.call(thisArg,value, i, dataArray);
//     finalArray.push(newValue);
//   }
//   return finalArray;
// }
