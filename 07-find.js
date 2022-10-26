Array.prototype._find = function(fn) {
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) return this[i];
  }
};
