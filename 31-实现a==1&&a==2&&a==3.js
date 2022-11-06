// 1. a是对象 实现valueOf toString方法即可(隐式转换)

let a = {
  value: 1,
  valueOf() {
    return a.value++;
  },
};

console.log(a == 1 && a == 2 && a == 3);

// 2. 是数组,隐式转化时,除了调用valueOf toString还会调用join方法
let b = [1, 2, 3];
b.join = Array.prototype.shift;
console.log(b == 1 && b == 2 && b == 3);
