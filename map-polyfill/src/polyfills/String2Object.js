const inputString = "a.b.c.d.e";

// function unpack(str) {
//   const strArray = str.split(".");
//   let obj = {};
//   let init = "";
//   strArray.forEach(function (char) {
//     if (init || Object.keys(obj).length) {
//       const n = { [char]: init || obj };
//       init = "";
//       obj = n;
//     } else {
//       init = char;
//     }
//   });
//   return obj;
// }

function unpack(str){
    // return str.split(".").reduce(function(acc,next){
    //     return {[next]:acc};
    // },{})

    //To return array as it is in string
    return str.split(".").reduceRight(function(acc,next){
        return {[next]:acc};
    },{})

    //to keep last ibject in key value pair remove the {};
}


function pack(obj) {
  const result = [];

  while (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const keys = Object.keys(obj);
    if (keys.length !== 1) break;

    const key = keys[0];
    result.push(key);
    obj = obj[key];
  }

  // If final value is primitive (like string "e"), include it
  if (typeof obj !== 'object' || obj === null) {
    result.push(String(obj));
  }

  return result.join(".");
}

const output = unpack(inputString);
// console.log(output);

const packed = pack(output);
// console.log(packed);

