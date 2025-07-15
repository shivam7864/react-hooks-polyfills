function deepCompare(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (obj1 === null || obj2 === null) return false;

  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  return keys1.every(function (key) {
    // return obj1[key] === obj2[key];
    return deepCompare(obj1[key],obj2[key])
  });
}

// console.log(deepCompare([1,2,3],[1,2]));

