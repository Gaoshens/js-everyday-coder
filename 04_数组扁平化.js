const array = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];

// 1. 使用toString()
console.log(array.toString());

// 2. 使用flat函数
console.log(array.flat(Infinity));

// 3.递归处理
Array.prototype.flatArray = function () {
  return this.reduce((pre, cur) => {
    return pre.concat(cur instanceof Array ? cur.flatArray() : cur);
  }, [])
}
console.log(array.flatArray());