const array = [8, 10, 1, 4, 3, 6, 2, 7, 9, 5];

function insertionSort(arr) {
  // 从下标为1的元素开始循环 和前面所有的元素进行对比 找到更大的元素时进行位置交换
  for (let i = 1; i < arr.length; i++) {
    // 当前元素
    let temp = arr[i];
    let j = i;
    // 如果 前面的元素大于当前元素 则交换位置
    while (arr[j - 1] > temp && j > 0) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[j] = temp;
  }
  return arr;
}

console.log(insertionSort(array));

