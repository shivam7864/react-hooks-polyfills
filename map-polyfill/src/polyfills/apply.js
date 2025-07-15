// Define an object 'villain' with a property 'name'
const villain = {
  name: "Shivam",
};

// Set a global variable 'name' on the window (browser) or global object (Node.js)
window.name = "Tiwari"; // In Node.js, use: global.name = "Tiwari";

// Another object with a different 'name'
const anotherVillain = {
  name: "Prashant",
};

// A regular function that logs 'this.name'
function showVillain() {
//   console.log(this.name); // Will log the name depending on how 'this' is bound
}

//we are spreading context[key](...args) so as showVillain will need args as n1,n2,n3 otherwise it will put all the args in n1;

// Custom implementation of the Function.prototype.apply method
Function.prototype.myApply = function (thisArg, args = []) {
  // If thisArg is null or undefined, use globalThis (window/global in browser/Node)
  const context = thisArg || globalThis;

  // Create a unique symbol to avoid key conflicts on the context object
  const key = Symbol();

  // Temporarily assign the function (on which myApply is called) to the context object
  context[key] = this;

  // Call the function with the spread arguments and store the result
  const result = context[key](...args);

  // Clean up: remove the temporary function reference
  delete context[key];

  // Return the result of the function call (if any)
  return result;
}

// ------------------------------
// ✅ Alternatively: Use call inside myApply (shorter)
// ------------------------------
/*
Function.prototype.myApply = function (thisArg, args = []) {
  // If thisArg is null or undefined, use globalThis (window/global in browser/Node)
  const context = thisArg || globalThis;

  return this.call(context,...args);
}

// Call 'showVillain' with 'this' set to 'villain', and some dummy arguments
showVillain.myApply(villain, [2, 3, 3]); // Output: "Shivam"

// Call 'showVillain' with 'this' set to 'anotherVillain'
showVillain.myApply(anotherVillain);     // Output: "Prashant"

// Call 'showVillain' with no context (undefined/null), so 'this' refers to globalThis
showVillain.myApply();

*/
