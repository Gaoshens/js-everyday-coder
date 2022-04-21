


// Promise失败后 根据预设的次数 进行重试
function fn() {
  let num = Math.floor(Math.random() * 100) / 100;
  return new Promise((resolve, reject) => {
    console.log("随机生成的数为:", num);
    if (num > .9) resolve(num)
    else reject(num)
  })
}

function retry(fn, count) {
  new Promise(async (resolve, reject) => {
    try {
      const result = await fn();
      resolve(result)
      console.log("成功了", result);
    } catch (err) {
      count--
      console.log("发生错误了,正在尝试...剩余尝试次数为:", count);
      if (count > 0) retry(fn, count);
      else reject(err)
    }
  })
    .catch(err => {
      console.log("尝试次数完毕依然失败,错误结果为:", err);
    })
}

retry(fn, 5)


