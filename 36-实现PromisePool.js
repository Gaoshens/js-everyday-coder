// Promise并发控制 实现asyncPool

/**
 *
 * @param {*} poolLimt 最大并发数量
 * @param {*} promises 待解决的promise
 * @param {*} fn promise的解决程序
 */
async function asyncPool(poolLimt, promises, fn) {
  const result = []; // 结果
  const delayPromises = []; // 待执行的promise

  for (let item of promises) {
    // 使用fn函数执行 并返回一个新的promise
    const res = Promise.resolve().then(() => fn(item, item));
    result.push(res);

    if (promises.length >= poolLimt) {
      // 执行后从待执行集合中删除自身
      const e = res.then(() => delayPromises.splice(delayPromises.indexOf(e), 1));
      delayPromises.push(e);

      if (delayPromises.length >= poolLimt) {
        await Promise.race(delayPromises);
      }
    }
  }
  return Promise.all(result);
}

// fn是一个promise的解决程序,他返回一个delay毫秒成功解决的promise
function fn(result, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(result);
      resolve(result);
    }, delay);
  });
}

asyncPool(2, [1000, 5000, 3000, 2000], fn).then(res => {
  console.log(res);
});
