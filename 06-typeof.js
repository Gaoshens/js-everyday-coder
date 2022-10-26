function _typeof(x) {
  return Object.prototype.toString
    .call(x)
    .slice(8, -1)
    .toLowerCase();
}

console.log(_typeof('123'));
console.log(_typeof(123));
console.log(_typeof([]));
console.log(_typeof({}));
console.log(_typeof(Symbol()));
