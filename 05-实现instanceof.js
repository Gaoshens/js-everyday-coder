function _instanceof(a, b) {
  // 判断a是否是b的实例对象或子实例对象 通过原型链
  let A = a.__proto__;
  let B = b.prototype;
  while (A !== B) {
    if (A.__proto__ == null) return false;
    A = A.__proto__;
  }
  return true;
}

console.log(_instanceof({}, Object));
console.log(_instanceof([], Object));
console.log(_instanceof({}, Array));
console.log(_instanceof(/\^/, RegExp));
console.log(_instanceof(new Date(), Date));
