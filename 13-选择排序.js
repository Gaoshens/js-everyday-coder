let arr = new Array(10000)
  .fill(1)
  .map((_, i) => i + 1)
  .sort((a, b) => Math.random() - 0.5);
function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    // 寻找最小元素下标 找到则进行位置交换
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

console.time();
console.log(selectionSort(arr));
console.timeEnd();
