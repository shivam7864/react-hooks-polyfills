window.intervalIdTracker = 1000;
window.intervals = {};

window.setInterval = function (callback, interval, ...args) {
  const intervalId = window.intervalIdTracker++;
  const timeToCall = Date.now() + interval;

  function execute() {
    callback(...args);
    window.intervals[intervalId].interval += interval;
  }

  window.intervals[intervalId] = {
    callback: execute,
    interval: timeToCall,
    args,
  };

  if(Object.keys(window.intervals).length === 1){
    processIntervals();
  }
  return intervalId;
};

function processIntervals() {
  function executeIntervals(key) {
    const { callback, args, interval } = window.intervals[key];

    if (Date.now() >= interval) {
      callback();
    } else {
      requestIdleCallback(processIntervals);
    }
  }

  Object.keys(window.intervals).forEach(executeIntervals)
}
window.clearInterval = function () {
  delete window.intervals[id];
};

setInterval(()=>{
    // console.log("Hello")
},1000)

function showName(name){
    // console.log("Name is", name); 
}
// console.log("!");

setInterval(showName,1000,"Shivam")
