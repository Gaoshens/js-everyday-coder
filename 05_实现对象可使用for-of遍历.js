const result = {
  name: 'wilen',
  age: 24,
  addres: '上海',
  ocp: '开发'
}

// 实现 Symbol.iterator方法
result[Symbol.iterator] = function () {
  const values = Object.values(result);
  let index = 0;
  return {
    next() {
      return { value: values[index], done: index++ >= values.length }
    }
  }
}

for (let item of result) {
  console.log(item);
}