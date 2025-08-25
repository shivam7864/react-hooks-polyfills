const arr = [1, 2, 3, 4, 5, 6, 7, 8];

Array.prototype.mySlice = function (start, end) { 
  const length = this.length;
  if (start === undefined) {
    start = 0;
  } else if (start < 0) {
    const newIndex = length + start;
    start = Math.max(newIndex, 0);
  } else {
    start = Math.min(start, length);
  }

  if (end === undefined) {
    end = length;
  } else if (end < 0) {
    const newIndex = length + end;
    end = Math.max(newIndex, 0);
  } else {
    end = Math.min(end, length);
  }

  const result=[];
  for(let i=start;i<end;i++){
    const value = this[i];
    result.push(value);
  }
  return result;
};

const result = arr.mySlice(2);
// console.log(result);

