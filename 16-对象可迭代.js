let obj = {
  name: 'randian',
  age: 18,
  addrenss: '上海市',
};

obj[Symbol.iterator] = function() {
  let values = Object.values(this);
  let i = 0;
  return {
    next() {
      return { value: values[i], done: i++ >= values.length };
    },
  };
};
