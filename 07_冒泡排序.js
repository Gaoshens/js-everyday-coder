const array = [8, 10, 1, 4, 3, 6, 2, 7, 9, 5];

function bubbleSort(arr) {
  // 第一层循环 根据元素个数
  for (let i = 0; i < arr.length; i++) {
    // 第二层循环对比次数
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 前面的元素大于后面的元素 则交换位置
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr
}

console.log(bubbleSort(array));