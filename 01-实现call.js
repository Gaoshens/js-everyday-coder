// 实现call函数
Function.prototype.myCall = function(content, ...args) {
  // 上下文对象content必须是包装类型
  content = content === undefined || content === null ? window : Object(content);
  const fn = Symbol();
  content[fn] = this;
  // 调用函数 参数对应的参数
  const res = content[fn](...args);
  delete content[fn];
  return res;
};

const a = { xx: 11 };

// 测试require函数
module.exports = {
  a,
};
