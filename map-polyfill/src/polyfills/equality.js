function abstractEquality(a, b) {
  if (typeof a === typeof b) return a === b;
  if (a === null && b === undefined) return true;
  if (a === undefined && b === null) return true;

  if (typeof a === "object") {
    return abstractEquality(String(a), b);
  }
  if (typeof b === "object") {
    return abstractEquality(a, String(b));
  }

  return Number(a) === Number(b);
}

function checker(a, b) {
  const result = abstractEquality(a, b);
  // console.log(result);
}

checker(1,1);
checker("1",1);
checker([],{});
checker(NaN,undefined);
checker("hi",["hi"]);
checker(null,undefined);
checker([],false);
checker({},"[object Object]");
checker("",false);
checker(true,1);