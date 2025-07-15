class EventEmitter {
  // Stores all events and their associated callbacks
  events = {};

  // Registers a callback for the given event name
  on(eventName, callback) {
    // If callbacks already exist for this event, add to the array
    if (this.events[eventName]) {
      this.events[eventName].push(callback);
    } else {
      // Otherwise, create a new array for this event
      this.events[eventName] = [callback];
    }
  }

  // Triggers all callbacks associated with an event
  emit(event, ...args) {
    const callbacks = this.events[event];
    // If callbacks exist for this event, call each one with provided args
    callbacks &&
      callbacks.forEach(function (cb) {
        cb(...args);
      });
  }

  // Registers a callback that should run only once
  once = (eventName, callback) => {
    // Wrapper function that runs the callback and removes it
    const execute = (...args) => {
      callback(...args); // Execute the original callback
      this.remove(eventName, execute); // Remove the wrapper after first run
    };
    this.on(eventName, execute); // Register the wrapper as a regular event listener
  };

  // Removes a specific callback for a given event
  remove(eventName, callback) {
    // Filter out the callback that matches (does not modify others)
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }
}

// Example usage:

const ev = new EventEmitter();

// Define listener functions
function orderDelivered(orderId) {
  console.log("Order Delivered", orderId);
}

function orderPlaced(orders) {
  console.log("Order placed", orders);
}

function orderPlacedByOtherUser(orders) {
  console.log("Order placed by", orders);
}

// Register listeners
ev.on("orderDelivered", orderDelivered);          // Add listener for 'orderDelivered'
ev.on("orderPlaced", orderPlaced);                // Add listener for 'orderPlaced'
ev.on("orderPlaced", orderPlacedByOtherUser);     // Add another listener to same event

// Remove one specific listener from 'orderPlaced'
ev.remove("orderPlaced", orderPlacedByOtherUser);

// Emit events (trigger callbacks)
ev.emit("orderPlaced", "ABC");        // Only 'orderPlaced' listener runs (one removed)
ev.emit("orderDelivered", "X123D");   // Triggers the delivery callback
