let arr = [4, 6, 8, 1, 5, 7, 3, 2];
function quickSortGroup(arr) {
  if (arr.length <= 1) return arr;
  // 寻找中间点下标和元素,以中间点元素作为基点
  let middleIndex = Math.floor(arr.length / 2);
  let middle = arr.splice(middleIndex, 1)[0];

  let leftArr = [],
    rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    arr[i] >= middle ? rightArr.push(arr[i]) : leftArr.push(arr[i]);
  }
  return quickSortGroup(leftArr).concat(middle, quickSortGroup(rightArr));
}

// console.time();
// console.log(quickSortGroup(arr));
// console.timeEnd();

function quickSort(arr) {
  let array = [...arr];
  return quick(array, 0, array.length - 1);
}

function quick(arr, l, r) {
  if (l >= r) return;
  let left = l;
  let right = r;
  // 基点
  let basic = left;
  let basicItem = arr[left];
  while (left < right) {
    while (left < right && arr[right] > basicItem) {
      right--;
    }
    if (left < right) {
      // 从右边找到了比基点小的元素
      [arr[basic], arr[right], basic] = [arr[right], basicItem, right];
      left++;
    }
  }
  while (left < right) {
    while (left < right && arr[left] < basicItem) {
      left++;
    }
    if (left < right) {
      // 从左边找到了比基点大的元素
      [arr[basic], arr[left], basic] = [arr[left], basicItem, left];
      right--;
    }
  }
  quick(arr, l, basic - 1);
  quick(arr, basic + 1, r);
  return arr;
}
// [4,6,8,1,5,7,3,2]
// // 基点4

// [2,6,8,1,5,7,3,4] // 基点下标6
// [2,4,8,1,5,7,3,6] // 基点4

console.time();
console.log(quickSort(arr));
console.timeEnd();
