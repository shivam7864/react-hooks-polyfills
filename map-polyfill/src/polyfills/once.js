function once(func, context) {
  let hasBeenCalled = false;
  let result;
  return function (...args) {
    if (!hasBeenCalled) {
      result = fn(...args);
      hasBeenCalled = true;
      return result;
    } else {
      return null;
    }
  };
}

// function once(func, context){
//     let ran;
//     return function(){
//         if(func){
//             ran = func.apply(context || this,arguments)
//             func=null
//         }
//         return ran;
//     }
// }

let fn = (a, b, c) => console.log(a + b + c);
let onceFn = once(fn);
onceFn(1, 2, 3);
onceFn(2, 3, 6);
