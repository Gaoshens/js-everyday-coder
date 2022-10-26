// 实现new
function _new(fn, ...args) {
  // 1. 基于构造函数的原型链创建一个新的函数
  const newObj = Object.create(fn.prototype);
  // 2. 调用构造函数
  const res = fn.apply(newObj, args);
  // 判断返回值类型
  return res instanceof Object ? res : newObj;
}
