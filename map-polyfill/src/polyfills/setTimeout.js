window.timerId = 11233;
window.timers = {};
window.setTimeout = function (callback, delay, ...args) {
  const timerId = window.timerId;
  window.timerId += 1;
  const time = Date.now() + delay;

  window.timers[timerId] = {
    callback,
    time,
    args: [...args],
  };
  if(Object.keys(window.timers).length === 1){
requestIdleCallback(processTimers)
  }
  
  return timerId;
};

function processTimers() {
  function executeTimers(key) {
    const { callback, time, args } = window.timers[key];
    if (Date.now() >= time) {
      callback(...args);
      delete window.timers[key];
    }else{
        requestIdleCallback(processTimers)
    }
  }

  Object.keys(window.timers).forEach(executeTimers);
}

window.clearTimeout = function (key) {
  if (window.timers[key]) {
    delete window.timers[key];
  }
};

setTimeout(
  function (name) {
    // console.log("name", name);
  },
  1000,
  "Shivam Tiwari"
);

setTimeout(
  function (name) {
    // console.log("name", name);
  },
  2000,
  "Shivam"
);
