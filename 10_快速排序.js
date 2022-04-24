const array = [8, 10, 1, 4, 3, 6, 2, 7, 9, 5];

// 快速排序
function quickSort(arr) {

  if (arr.length <= 1) return arr;
  // 寻找中间项 
  let maddleIndex = Math.floor(arr.length / 2);
  let middleItem = arr.splice(maddleIndex, 1)[0];
  // 大于中间项的放入右边的数组 小于的放入左边数组
  let rightArr = [], leftArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > middleItem) {
      rightArr.push(arr[i])
    } else {
      leftArr.push(arr[i])
    }
  }

  // 因为此时右边数组和左边数组依然需要进行排序 此时采用递归即可
  return quickSort(leftArr).concat(middleItem, quickSort(rightArr));
}

// console.log(quickSort(array));