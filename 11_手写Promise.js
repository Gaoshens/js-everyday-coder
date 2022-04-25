// 1. 实现then方法
// 2. 实现链式调用
// 3. 实现catch方法
// 4. 实现finally方法



class MyPromise {

  PROMISE_STATUS_PENDING = 'pending';
  PROMISE_STATUS_FULFILLED = 'fulfilled';
  PROMISE_STATUS_REJECTED = 'rejected';

  constructor(excutor) {
    // 初始化状态
    this.status = this.PROMISE_STATUS_PENDING;
    // 初始化结果
    this.value = undefined;
    this.reason = undefined;
    // 管理成功回调的数组
    this.onFulfilledFns = [];
    // 管理失败回调的数组
    this.onRejectedFns = [];
    excutor(this.resolve.bind(this), this.reject.bind(this))
  }


  // resulve方法
  resolve(value) {

    this.value = value;
    if (this.status === this.PROMISE_STATUS_PENDING) {

      queueMicrotask(() => {
        this.status = this.PROMISE_STATUS_FULFILLED;
        this.onFulfilledFns.forEach(fn => fn(this.value))
      })
    }

  }
  reject(reason) {

    this.reason = reason;
    if (this.status === this.PROMISE_STATUS_PENDING) {

      queueMicrotask(() => {
        this.status = this.PROMISE_STATUS_REJECTED;
        this.onRejectedFns.forEach(fn => fn(this.reason))
      })
    }

  }


  withPromiseCatch(fn, value, resolve, reject) {
    try {
      const result = fn(value);
      resolve(result);
    } catch (err) {
      reject(err)
    }
  }

  /**
   * Promise then方法
   * @param {Function} onFulfilled 
   * @param {Function} onRejected 
   */
  then(onFulfilled, onRejected) {
    onFulfilled = onFulfilled || (value => value)
    onRejected = onRejected || (err => { throw err })

    return new Promise((resolve, reject) => {
      if (this.status === this.PROMISE_STATUS_PENDING) {
        this.onFulfilledFns.push(() => {
          this.withPromiseCatch(onFulfilled, this.value, resolve, reject)
        });
        this.onRejectedFns.push(() => {
          this.withPromiseCatch(onRejected, this.reason, resolve, reject)
        })
      }
      if (this.status === this.PROMISE_STATUS_FULFILLED) {
        this.withPromiseCatch(onFulfilled, this.value, resolve, reject)
      }
      if (this.status === this.PROMISE_STATUS_REJECTED) {
        this.withPromiseCatch(onRejected, this.reason, resolve, reject)
      }
    })
  }

  /**
   * Promise catch方法
   * @param {Function} onRejected 
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * Promise finally方法
   * @param {Function} onFinally 
   * @returns 
   */
  finally(onFinally) {
    return this.then(onFinally, onFinally)
  }

  /**
   * 静态 resolve 方法
   * @param {*} onFulfilled 
   */
  static resolve(value) {
    return new MyPromise((resolve, reject) => { resolve(value) })
  }

  /**
   * 静态 reject 方法
   * @param {*} reason 
   */
  static reject(reason) {
    return new MyPromise((resolve, reject) => { reject(reason) })
  }

  /**
   * Promise all 方法
   * @param {Array<MyPromise>} promises 
   */
  static all(promises) {

    return new Promise((resolve, reject) => {
      let count = 0;
      const result = new Array(promises.length);

      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i] instanceof MyPromise ? promises[i] : MyPromise.resolve(promises[i]);
        promise.then(res => {
          result[i] = res;
          count++;
          if (promises.length === count) {
            resolve(result);
          }
        }, err => {
          reject(err);
        })
      }
    })
  }

  /**
   * Promise allSettled方法
   * @param {Array<MyPromise>} promises 
   */
  static allSettled(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const result = new Array(promises.length);

      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i] instanceof MyPromise ? promises[i] : MyPromise.resolve(promises[i]);
        promise.then(res => {
          result[i] = { status: 'fulfilled', value: res };
          count++;
          if (promises.length === count) {
            resolve(result);
          }
        }, err => {
          result[i] = { status: 'rejected', value: err };
          count++;
          if (promises.length === count) {
            resolve(result);
          }
        })
      }
    })
  }

  /**
   * Promise race方法
   * @param {Array<MyPromise>} promises 
   * @returns 
   */
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i] instanceof MyPromise ? promises[i] : MyPromise.resolve(promises[i]);
        promise.then(res => {
          resolve(res);
        }, err => {
          reject(err)
        })
      }
    })
  }
  static any(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const result = new Array(promises.length);

      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i] instanceof MyPromise ? promises[i] : MyPromise.resolve(promises[i]);
        promise.then(res => {
          resolve(res)
        }, err => {
          result[i] = err;
          count++;
          if (promises.length === count) {
            reject(result);
          }
        })
      }
    })
  }
}


const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功")
    reject("失败")
  })
})
const mypromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功")
    // reject("失败")
  })
})


setTimeout(() => {
  promise.then(res => {
    console.log('promises', res);
    return '链式调用'
  })
    .catch(err => {
      console.log(err, 'catch');
    }).finally(() => {
      console.log('finally');
    })
}, 200)

setTimeout(() => {
  mypromise.then(res => {
    console.log('mypromise', res);
    return '链式调用'
  })
    .catch(err => {
      console.log(err, 'catch');
    }).finally(() => {
      console.log('finally');
    })
}, 200)





const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(3000)
  }, 3000)
})
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(2000)
  }, 2000)
})
const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1000)
  }, 1000)
})

// Promise all方法

Promise.all([p1, p2, p3]).then(res => {
  console.log('promise', res);
}).catch(err => {
  console.log(err);
})


MyPromise.all([p1, p2, p3]).then(res => {
  console.log('mypromise', res);
}).catch(err => {
  console.log(err);
})


Promise.allSettled([p1, p2, p3]).then(res => {
  console.log('promise', res);
})

MyPromise.allSettled([p1, p2, p3]).then(res => {
  console.log('mypromise', res);
})

Promise.race([p1, p2, p3]).then(res => {
  console.log('promise', res);
}).catch(err => { console.log(err, 'err'); })

MyPromise.race([p1, p2, p3]).then(res => {
  console.log('mypromise', res);
}).catch(err => { console.log(err, 'err'); })



// Promise.any([p1, p2, p3]).then(res => {
//   console.log('mypromise', res);
// }).catch(err => { console.log(err, 'err'); })

MyPromise.any([p1, p2, p3]).then(res => {
  console.log('mypromise', res);
}).catch(err => { console.log(err, 'err'); })