/**
 * 01. 定义Promise的三个状态
 * 02. 初始化promise的状态和结果
 * 03. 使用queueMicrotack模拟微任务
 * 04. 保存异步的回调,在resolve或reject后进行调用
 * 05. then方法支持链式调用,内部应返回一个promise
 * 06. then方法需要支持穿透
 * 07. 实现promsie的解决程序resolvePromise
 * 08. 实现catch方法
 * 09. 实现静态方法 resolve reject
 * 10. 实现finally方法
 * 11. 实现all方法
 */

const PROMISE_PEDDING = 'pedding';
const PROMISE_FULFILLED = 'fulfilled';
const PROMISE_REJECTED = 'rejected';

const isObject = x => Object.prototype.toString.call(x) === '[object Object]';
const isFunction = x => typeof x === 'function';

class MyPromise {
  constructor(exectuor) {
    // 初始化promise的状态
    this.status = PROMISE_PEDDING;
    this.value = undefined; // 成功的结果
    this.reason = undefined; // 失败的结果
    this.onFulfilledFns = []; // 成功的回调
    this.onRejectedFns = []; // 失败的回调
    exectuor(this.resolve.bind(this), this.reject.bind(this));
  }
  resolve(value) {
    if (this.status !== PROMISE_PEDDING) return;
    // 保存成功的结果
    this.value = value;
    // 更改成功状态
    this.status = PROMISE_FULFILLED;
    // 执行保存的成功的回调
    this.onFulfilledFns.forEach(fn => fn(this.value));
  }
  reject(reason) {
    if (this.status !== PROMISE_PEDDING) return;
    // 保存失败的结果
    this.reason = reason;
    // 更改失败状态
    this.status = PROMISE_REJECTED;
    // 执行保存的失败的回调
    this.onRejectedFns.forEach(fn => fn(this.reason));
  }
  resolvePromise(promise, x, resolve, reject) {
    // 1. 如果 promise 和 x 指向同一个对象，则以 TypeError 作为原因拒绝 promise
    if (promise === x) throw new TypeError('Chaining cycle detected for promise');
    let isCalled = false;
    // 2.1 如果 x 是一个对象或函数
    if (isObject(x) || isFunction(x)) {
      const resolvePromiseFn = y => {
        if (isCalled) return;
        isCalled = true;
        this.resolvePromise(promise, y, resolve, reject);
      };
      const rejectPromise = r => {
        if (isCalled) return;
        isCalled = true;
        reject(r);
      };
      try {
        // 3.1 如果检索属性 x.then 导致抛出异常 e，则以 e 为 value 拒绝 promise
        const then = x.then;
        if (isFunction(then)) {
          then.call(x, resolvePromiseFn, rejectPromise);
        } else {
          resolve(x);
        }
      } catch (err) {
        if (isCalled) return;
        isCalled = true;
        reject(err);
      }
    } else {
      resolve(x);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value;
    onRejected = isFunction(onRejected)
      ? onRejected
      : err => {
          throw err;
        };
    const promsie2 = new MyPromise((resolve, reject) => {
      if (this.status === PROMISE_FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            // 运行Promise解决程序 [[Resolve]](promise2, x)
            this.resolvePromise(promsie2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.status === PROMISE_REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promsie2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      }
      if (this.status === PROMISE_PEDDING) {
        this.onFulfilledFns.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              this.resolvePromise(promsie2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedFns.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              this.resolvePromise(promsie2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return promsie2;
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  static resolve(value) {
    // 如果是promise对象 直接返回
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve, reject) => {
      // 可能是thenable对象
      if (value.then && isFunction(value.then)) {
        value.then(resolve, reject);
      }
    });
  }
  static reject(value) {
    return new MyPromise((_, reject) => reject(value));
  }
  finally(onFinally) {
    return this.then(
      value => {
        return MyPromise.resolve(onFinally()).then(() => value);
      },
      reason => {
        return MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        });
      }
    );
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let index = 0;
      let result = [];
      for (let i = 0; i < promises.length; i++) {
        let promise = promises[i];
        MyPromise.resolve(promise)
          .then(res => {
            result[i] = res;
            if (++index === promises.length) resolve(result);
          })
          .catch(err => {
            console.log(err, 'err');
            reject(err);
          });
      }
    });
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功的结果');
    // reject('失败的结果');
  }, 1000);
});

// promise
//   .then(res => {
//     console.log(res);
//     return new MyPromise((resolve, reject) => resolve(new MyPromise((resolve, reject) => reject('千层饼'))));
//   })
//   .then(res => {
//     console.log('res2', res);
//   })
//   .catch(err => {
//     console.log('err', err);
//   });

// 测试静态方法 resolve reject
// MyPromise.resolve('静态resolve成功了')
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// MyPromise.reject('静态resolve失败了')
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// 10. 测试finally
// promise
//   .then()
//   .then()
//   .then(res => {
//     console.log(res);
//   })
//   .finally(() => {
//     console.log('finally');
//   });

// promise
//   .then()
//   .then(res => {
//     console.log('穿透res', res);
//     return '测试finally- res';
//   })
//   .catch(err => {
//     console.log('catch', err);
//     return '测试finally- catch';
//   })
//   .finally(() => {
//     console.log('finally');
//   })
//   .then(res => {
//     console.log('finally穿透res', res);
//   });

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1');
  }, 1000);
});
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2');
  }, 2000);
});
const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('p3');
  }, 3000);
});

MyPromise.all([p1, p2, p3])
  .then(res => {
    console.log(res, 'res');
  })
  .catch(err => {
    console.log(err, 'err');
  });
