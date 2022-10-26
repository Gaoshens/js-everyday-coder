Array.prototype._reduce = function(fn, initial) {
  // 初始值为undefined时,初始值置为undefined
  initial = initial === undefined ? this[0] : initial;

  for (let i = 0; i < this.length; i++) {
    initial = fn(initial, this[i], i, this);
  }
  return initial;
};
