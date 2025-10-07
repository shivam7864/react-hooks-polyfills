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

Promise.race = function (promises = []) {
  return new Promise(function (resolve, reject) {
    if (!promises.length) return; // never settle for empty array

    promises.forEach(function (promise) {
      promise
        .then((data) => {
          resolve(data); // first fulfilled wins
        })
        .catch((error) => {
          reject(error); // first rejected wins if it happens before any fulfill
        });
    });
  });
};


const p1 = fakeFetcher("P1", 5000,true);
const p2 = fakeFetcher("P2", 2000,true);
const p3 = fakeFetcher("P3", 2000);

const allData = Promise.race([p1(), p2(), p3()]);

allData
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
