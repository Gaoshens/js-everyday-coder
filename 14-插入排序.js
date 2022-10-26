let arr = new Array(10000)
  .fill(1)
  .map((_, i) => i + 1)
  .sort((a, b) => Math.random() - 0.5);

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    // 从下表为1的元素开始 向前相互查找 找到更大的则直接交换位置
    let temp = arr[i];
    let j = i;
    while (arr[j - 1] > temp && j > 0) {
      arr[j] = arr[--j];
    }
    arr[j] = temp;
  }
  return arr;
}

console.time();
console.log(insertionSort(arr));
console.timeEnd();
