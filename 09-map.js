Array.prototype._map = function(fn) {
  let result = [];
  for (let i = 0; i < this.length; i++) {
    result[i] = fn(this[i], i, this);
  }
  return result;
};
