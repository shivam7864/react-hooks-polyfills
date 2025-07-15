const arr = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.myReduce = function (callbackFn, initialValue) {
  if (typeof callbackFn !== "function") {
    throw new TypeError("Callback function is not a function");
  }

  if (this === null) {
    throw new Error("Invalid Data");
  }

  if (!this.length && !initialValue) {
    throw new Error("Reduce of empty array with no initial value.");
  }
  const initValue = initialValue ? initialValue : this[0];
  const startIndex = initialValue ? 0 : 1;

  let accumulator = initValue;
  for (let i = startIndex; i < this.length; i++) {
    const nextValue = this[i];
    accumulator = callbackFn(accumulator, nextValue, i, this);
  }
  return accumulator
};

let result = arr.myReduce(function (acc, next, i, array) {
  return acc + next;
});
// console.log(result);
