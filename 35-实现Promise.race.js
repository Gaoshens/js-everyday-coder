Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      Promise.resolve(promise)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }
  });
};

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise1');
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(Promise.reject('promise2'));
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise3');
  }, 3000);
});

Promise.myRace([p1, p2, p3])
  .then(res => {
    console.log('res:', res);
  })
  .catch(err => {
    console.log('err:', err);
  });
