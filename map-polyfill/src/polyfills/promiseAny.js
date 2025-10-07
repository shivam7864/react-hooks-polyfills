function fakeFetcher(url, time, failIt) {
  return () => {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        if (failIt) {
          reject("API failed for " + url);
        } else {
          resolve("Data fetched for " + url);
        }
      }, time);
    });
  };
}

Promise.any = function (promises = []) {
  return new Promise(function (resolve, reject) {
    if (!promises.length) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    const errors = [];
    let rejectedCount = 0;

    promises.forEach(function (promise, index) {
      promise
        .then((value) => {
          resolve(value); // first fulfilled wins
        })
        .catch((err) => {
          errors[index] = err;
          rejectedCount++;
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};



const p1 = fakeFetcher("P1", 5000,true);
const p2 = fakeFetcher("P2", 2000,true);
const p3 = fakeFetcher("P3", 1000,true);

const allData = Promise.any([p1(), p2(), p3()]);

allData
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
