const array = [1, 2, 2, 3, 4, 4, false, false, true, true, 'a', 'a', 'b', 'b']



// 1. set去重
function set(array) {
  return Array.from(new Set(array))
}
console.log(set(array));

// 2. reduce去重
const removalReduce = (array) => {
  return array.reduce((pre, cur) => {
    !pre.includes(cur) && pre.push(cur)
    return pre
  }, [])
}
console.log(removalReduce(array));

// 3. 循环过滤
const removalMap = (array) => {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    !newArray.includes(array[i]) && newArray.push(array[i])
  }
  return newArray;
}
console.log(removalMap(array));

