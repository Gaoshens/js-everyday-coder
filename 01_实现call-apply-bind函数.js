// 实现call方法
Function.prototype.aCall = function (context, ...args) {
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn]
  return result;
}

// 实现apply方法
Function.prototype.aApply = function (context, argsArray) {
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...argsArray);
  delete context[fn]
  return result;
}

// 实现bind方法
Function.prototype.aBind = function (context, ...argsOne) {
  const fn = Symbol();
  context[fn] = this;
  // 返回一个函数
  return function _bind(...argsTwo) {
    // 调用外界函数 返回结果
    const result = context[fn](...argsOne, ...argsTwo);
    delete context[fn];
    return result;
  }
}