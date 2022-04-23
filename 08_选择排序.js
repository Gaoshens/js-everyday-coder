const array = [8, 10, 1, 4, 3, 6, 2, 7, 9, 5];

function selectionSort(arr) {
  // 假设开始位置是最小的元素 和后面的后缩元素进行对比 然后交换小标
  for (let i = 0; i < arr.length; i++) {
    // 记录最小的元素下标
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    // 此时min是当前循环找到的最小元素 交换位置
    let temp = arr[i]
    arr[i] = arr[min];
    arr[min] = temp;
  }
  return arr
}

console.log(selectionSort(array));