const debounceAPICall = debounce(makeAPICallFor,2000);

function handleInput(event) {
  const value = event.target.value;
  console.log("value", value);

  const searchTermDom = document.getElementById("search");
  searchTermDom.innerText = value;
  console.log(value);
  
  debounceAPICall(value);
}

function makeAPICallFor(data){
    console.log("searched data for",data);
    
}

function debounce(callbackFn, delay) {
  // Used to store the timeout ID between function calls
  let timeOutId = "";

  // Return a new function that wraps the original callback
  return function (...args) {
    // Save the current 'this' context (in case it's needed inside callbackFn)
    let self = this;

    // Clear any previously scheduled execution of the callback
    clearTimeout(timeOutId);

    // Schedule a new execution after the specified delay
    timeOutId = setTimeout(function () {
      // WHY WE USE apply():
      // ---------------------
      // 1. We want to call the original callbackFn with the same 'this' context
      //    as the debounced function was called with.
      // 2. We also want to pass any arguments provided to the debounced function.
      // 
      // Example: If callbackFn uses 'this', it will break without apply.
      //
      // apply(self, args) is equivalent to: callbackFn(...args) with correct 'this'
      callbackFn.apply(self, args);
    }, delay);
  };
}
