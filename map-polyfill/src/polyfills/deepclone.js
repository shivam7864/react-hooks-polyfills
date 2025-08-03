/**
 * Performs a deep clone of an object or array, with cyclic reference detection.
 * @param {*} param - The object or array to clone.
 * @param {WeakMap} seen - Tracks visited objects to detect cycles.
 * @returns {*} - A deep cloned copy of the input.
 */

//ChatGPT Version
function deepClone2(param, seen = new WeakMap()) {
  // If param is not an object (primitive) or is null, return it directly.
  if (typeof param !== "object" || param === null) {
    return param;
  }

  // If we've already seen this object, it's a cyclic reference.
  if (seen.has(param)) {
    throw new Error("Cyclic Reference");
  }

  // Initialize result as an array or object depending on input type
  const result = Array.isArray(param) ? [] : {};

  // Mark the current object as seen before deep cloning its properties
  seen.set(param, result);

  // Recursively deep clone each key in the object
  Object.keys(param).forEach(function (key) {
    const value = param[key];
    result[key] = deepClone(value, seen);
  });

  // Return the final cloned object or array
  return result;
}

function deepClone(param, seen = new WeakMap()) {
  const result = {};

  //in order to support this function for arrays
  // const result = Array.isArray(param) ? [] : {}

  if (seen.has(param)) {
    throw new Error("Cyclic Reference");
  }
  seen.set(param, true);
  Object.keys(param).forEach(function (key) {
    const data = param[key];
    if (typeof data === "object" && data !== null) {
      result[key] = deepClone(data, seen);
    } else {
      result[key] = data;
    }
  });
  
  return result;
}

let obj = {
  grandSon: {
    name: "Shivam",
  },
};

let copyOfObj = deepClone(obj);
obj.grandSon.money = 12233323;

// console.log(copyOfObj);

//above code will fail if we do like this and for this we need to pass one more args.
// obj.ssss = obj
