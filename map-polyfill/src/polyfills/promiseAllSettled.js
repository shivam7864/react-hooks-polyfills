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

Promise.allSettled = function (promises = []) {
  return new Promise(function (resolve, reject) {
    const result = [];
    let completed = 0;

    if (!promises.length) {
      resolve([]);
    }

    promises.forEach(function (promise, index) {
      promise
        .then((data) => {
          result[index] = { status: "fulfilled", value: data };
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch((error) => {
          result[index] = { status: "rejected", reason: error };
          completed++;
          if (completed === promises.length) {
            resolve(result);
          }
        });
    });
  });
};

const p1 = fakeFetcher("P1", 1000);
const p2 = fakeFetcher("P2", 2000);
const p3 = fakeFetcher("P3", 3000);

const allData = Promise.allSettled([p1(), p2(), p3()]);

allData
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
