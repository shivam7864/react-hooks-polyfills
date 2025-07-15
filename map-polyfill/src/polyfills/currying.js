//When we do not have all the required data then we use currying to pass data in steps.

// Type 1
// function sum(a) {
//   return function (b) {
//     return a + b;
//   };
// }
// const result = sum(2)(4);
// console.log(result);

//Type 2 - Infinite currying pproblem
// function sum(a) {
//   return function (b) {
//     if (b === undefined) {
//       return a;
//     } else {
//       return sum(a + b);
//     }
//   };
// }

// const result = sum(2)(4)(3)(5)(1)(9)();
// console.log(result);


function sum(...a) {
  return function (...b) {
    if (b?.length ===0 ) {
      return a?.[0] || 0;
    } else {
      return sum(a?.reduce((a,b)=>a+b,0) + b?.reduce((a,b)=>a+b,0));
    }
  };
}

const result = sum(2,3,5)(4,3)(3,34,3)(5,5)(1)(9)();
// console.log(result);
