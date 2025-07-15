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
  console.log(this.name); // Will log the name depending on how 'this' is bound
}

Function.prototype.myBind = function (thisArg, ...args) {
  // If thisArg is null or undefined, use globalThis (window/global in browser/Node)
  const context = thisArg || globalThis;

  const self = this;
  return function () {
    const key = Symbol();
    context[key] = self;
    const result = context[key](...args);
    delete context[key];
    return result;
  };
};

//Using inbuilt call function
// Function.prototype.myBind = function(thisArg,...args){
// // If thisArg is null or undefined, use globalThis (window/global in browser/Node)
//   const context = thisArg || globalThis;

//   const self = this;
//   return function (){
//     self.call(thisArg,...args);
//   }
// }

const fn = showVillain.myBind(villain);
fn();
