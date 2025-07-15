// Define constant states for internal tracking
const STATE = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
  PENDING: "pending",
};

class MyPromise {
  // Private fields to store current value, state, and callback queues
  #value = "";
  #state = STATE.PENDING;
  #thenCbs = [];  // Queue of success callbacks
  #catchCbs = []; // Queue of failure callbacks

  constructor(callback) {
    try {
      // Execute the promise executor function immediately
      callback(this.#onSuccess, this.#onFail);
    } catch (e) {
      // If an error is thrown in the executor, reject the promise
      this.#onFail(e);
    }
  }

  // Run the stored callbacks based on the current state
  #runCallbacks = () => {
    // Ensure callbacks run asynchronously (like real Promises)
    queueMicrotask(() => {
      if (this.#state === STATE.FULFILLED) {
        // Execute all success callbacks
        this.#thenCbs.forEach((cb) => cb(this.#value));
        this.#thenCbs = []; // Clear them after execution to prevent repeated calls and free memory
      }

      if (this.#state === STATE.REJECTED) {
        // Execute all failure callbacks
        this.#catchCbs.forEach((cb) => cb(this.#value));
        this.#catchCbs = []; // Clear them after execution to free memory and ensure one-time use
      }
    });
  };

  // Called when the promise is resolved
  #onSuccess = (value) => {
    if (this.#state !== STATE.PENDING) return; // Only allow state change once
    this.#value = value;
    this.#state = STATE.FULFILLED;

    this.#runCallbacks(); // Trigger success callbacks
  };

  // Called when the promise is rejected
  #onFail = (value) => {
    if (this.#state !== STATE.PENDING) return; // Only allow state change once

    // If no rejection handler is attached, throw an uncaught error (like native Promise behavior)
    if (!this.#catchCbs.length) {
      throw new Error("Uncaught Promise");
    }

    this.#value = value;
    this.#state = STATE.REJECTED;

    this.#runCallbacks(); // Trigger failure callbacks
  };

  // Register then (success) and optional catch (failure) callbacks
  then = (thenCb, catchCb) => {

    //normal code without chaining

     // if (thenCb) {
    //   this.#thenCbs.push(thenCb);
    // }

    // if (catchCb) {
    //   this.#catchCbs.push(catchCb);
    // }
    // this.#runCallbacks();


    // Return a new promise for chaining
    return new MyPromise((resolve, reject) => {
      // Store a wrapped success callback
      this.#thenCbs.push((value) => {
        if (thenCb == null) {
          resolve(value); // If no then callback provided, forward value
          return;
        }

        const res = thenCb(value); // Call the user-provided then callback
        resolve(res); // Resolve the new promise with its result
      });

      // Store a wrapped failure callback
      this.#catchCbs.push((result) => {
        if (catchCb == null) {
          reject(result); // If no catch callback provided, forward error
          return;
        }

        const res = catchCb(result); // Call the user-provided catch callback
        reject(res); // Reject the new promise with its result
      });
    });
  };

  // Shorthand for then(undefined, cb) — only register failure handler
  catch = (cb) => {
    return this.then(undefined, cb);
  };

  // Utility method to create a resolved promise
  static resolve = (data) => {
    return new MyPromise(function (resolve) {
      resolve(data);
    });
  };

  // Utility method to create a rejected promise
  static reject = (data) => {
    return new MyPromise(function (resolve, reject) {
      reject(data);
    });
  };
}

// Example usage:
const myPr = new MyPromise(function (resolve, reject) {
  setTimeout(() => {
    reject("Done without error"); // Reject the promise after 1 second
  }, 1000);
});

// Handle the rejection
myPr.catch((data) => {
  console.log(data); // Output: Done without error
});
