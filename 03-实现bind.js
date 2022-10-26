// 实现apply函数
Function.prototype.myBind = function(content, args) {
  // 上下文对象content必须是包装类型
  content = content === undefined || content === null ? window : Object(content);
  const fn = Symbol();
  content[fn] = this;
  function _bind(thisArgs) {
    // 调用函数 参数对应的参数
    const res = content[fn](...args, ...thisArgs);
    delete content[fn];
    return res;
  }
  return _bind;
};
