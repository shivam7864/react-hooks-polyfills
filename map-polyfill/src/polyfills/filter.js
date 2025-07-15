const arr = [1, 2, 3, 4, 5];

//adding the filter function to array prototype chain
function transformFunction(value, index, arr) {
  return value % 2 === 0;
}

Array.prototype.myFilter = function (callbackFn, thisArg) {
  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback function is not a function");
  }

  let finalArray = [];
  let flag = 0;

  //filter does not uses for  loop it uses while loop;

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
      const newValue = callbackFn.call(thisArg, value, flag, this);
      newValue && finalArray.push(value);
    }
    flag++;
  }

  return finalArray;
};

const newArray = arr.myFilter(transformFunction);
// console.log(newArray);

// const obj = {name:"magic"};
// function transformFunction(value,index,arr){
//     console.log(this);

//     return value % 2 === 0;
// }

// //if we want to control the value of this keyword then pass the obj here in this function
// const newArray = filterFunction(arr,transformFunction,obj);
// console.log(newArray);

// // to link thisArg to the callbackFn we can use the call,apply,bind we have used call.
// function filterFunction(dataArray,callbackFn,thisArg){
//     let result=[];
//     for(let i=0;i<arr.length;i++){
//         const value = dataArray[i];
//         const needToAdd = callbackFn.call(thisArg,value,i,dataArray);
//         needToAdd && result.push(value);
//     }
//     return result;
// }

//1.Without Prototype chain
// function transformFunction(value,index,arr){
//     return value % 2 === 0;
// }

//if we want
// const newArray = filterFunction(arr,transformFunction);
// console.log(newArray);

// function filterFunction(dataArray,callbackFn,thisArg){
//     let result=[];
//     for(let i=0;i<arr.length;i++){
//         const value = dataArray[i];
//         const needToAdd = transformFunction(value,i,dataArray);
//         needToAdd && result.push(value);
//     }
//     return result;
// }
