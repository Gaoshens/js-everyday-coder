let arr = [1, 2, [3, 4, [5, 6, [7, 8]]]];

// 1. 原生flat方法
let arr1 = arr.flat(Infinity);

// 2. toString
let arr2 = arr.toString().split(',');

// 3. reduce
Array.prototype.myFlat = function() {
  return this.reduce((prev, curr) => {
    return prev.concat(Array.isArray(curr) ? curr.myFlat() : curr);
  }, []);
};
let arr3 = arr.myFlat();
