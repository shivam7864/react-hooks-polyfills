// Constructor function for Superhero
function Superhero(name) {
    this.name = name;             // Set the name property from the argument
    this.villain = "Shivam";      // Default villain property
}

// Custom implementation of the `new` keyword
function myNew(ConstructorFn, ...args) {
    const newObj = {};  // 1. Create an empty object

    // 2. Set the prototype of newObj to ConstructorFn's prototype
    Object.setPrototypeOf(newObj, ConstructorFn.prototype);

    // 3. Call the constructor function with newObj as 'this'
    const result = ConstructorFn.apply(newObj, args);

    // 4. If the constructor returns an object, use it; otherwise use newObj
    return result instanceof Object ? result : newObj;
}

// Using the real `new` operator
const superhero = new Superhero("Silver Surfer");

// Using the custom `myNew` function to simulate `new`
const newSuperhero = myNew(Superhero, "Iron Man");

// Testing the results
console.log(superhero);      // Superhero { name: 'Silver Surfer', villain: 'Shivam' }
console.log(newSuperhero);   // Superhero { name: 'Iron Man', villain: 'Shivam' }
