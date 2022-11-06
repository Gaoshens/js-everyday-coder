// 实现一个retry方法,接收fn,timers,time三个参数,分别表示需要重试的方法,重试的次数和间隔时间

// 待实现的retry函数
function retry(fn, timers, time) {
  const dealy = time => {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  };
  return async () => {
    for (let i = timers; i > 0; i--) {
      try {
        const res = await fn();
        return res;
      } catch (err) {
        console.log('发生错误,重试次数为:' + i);
        if (i === 1) throw err;
        else await dealy(time);
      }
    }
  };
}

// 模拟一个fetch函数
// 如果fetch返回成功,则整个方法返回成功,如果fetch失败,则按照指定的次数和时间进行重试
// 重试中有一次成功,则整个方法进入成功的回调,超过指定次数则失败
function fetch() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.9) resolve({ message: '请求成功' });
    else reject({ message: '请求失败' });
  });
}

let retryFn = retry(fetch, 3, 1000);

retryFn()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
