function myNew(fn, ...args) {
  // 创建一个新的对象继承fn的原型链
  const obj = Object.create(fn.prototype);
  // 执行构造函数 绑定参数
  const result = fn.apply(obj, args);
  // 返回结果
  return typeof result === 'object' ? result : obj;
}