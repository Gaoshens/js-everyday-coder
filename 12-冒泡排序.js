let arr = new Array(10000)
  .fill(1)
  .map((_, i) => i + 1)
  .sort((a, b) => Math.random() - 0.5);
function bobbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.time();
console.log(bobbleSort(arr));
console.timeEnd();
