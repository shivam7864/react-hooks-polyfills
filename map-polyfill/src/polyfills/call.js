// Create an object with a 'name' property
const villain = {
  name: "Shivam",
};

// Set global name (used when no context is passed)
window.name = "Tiwari"; // In Node.js use: global.name = "Tiwari"

// Another object with a different name
const anotherVillain = {
  name: "Prashant",
};

// A simple function that logs 'this.name'
function showVillain() {
//   console.log(this.name);
}

// ------------------------------
// ✅ Custom myCall implementation (manual method)
// ------------------------------
Function.prototype.myCall = function (thisArg, ...args) {
  // If no thisArg is passed, use globalThis (window in browser, global in Node.js)
  const context = thisArg || globalThis;

  // Create a unique key to avoid property name collision
  const key = Symbol();

  // Temporarily assign the function to the context object
  context[key] = this;

  // Call the function with provided arguments
  const result = context[key](...args);

  // Clean up: remove the temporary property
  delete context[key];

  // Return result of the function
  return result;
};

// ------------------------------
// ✅ Alternatively: Use apply inside myCall (shorter)
// ------------------------------
/*
Function.prototype.myCall = function (thisArg, ...args) {
  // Reuse built-in or custom apply implementation
  return this.apply(thisArg, args);
};
*/

// ------------------------------
// 🧪 Testing custom myCall
// ------------------------------
showVillain.myCall(window);           // Output: "Tiwari" (global context)
showVillain.myCall(villain);          // Output: "Shivam"
showVillain.myCall(anotherVillain);   // Output: "Prashant"

// ------------------------------
// ⚠️ Unsafe version without Symbol (not recommended) wihtout prototype chain
// ------------------------------
/*
function myCall(fn, thisArg, ...args) {
  // This can overwrite existing 'fn' property if present
  thisArg.fn = fn;
  const result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
}

myCall(showVillain, window);         // Output: "Tiwari"
myCall(showVillain, villain);        // Output: "Shivam"
myCall(showVillain, anotherVillain); // Output: "Prashant"
*/

//If we pass primitve value then they will be converted to respective object like if we pass string value then it will be converted to object of string