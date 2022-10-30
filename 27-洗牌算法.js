// 一副扑克牌 尽可能的洗乱

let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'jokers', 'Jokers'];

// 1. 随机排序
function shuffle1(arr) {
  return arr.sort(_ => Math.random() - 0.5);
}

console.log(shuffle1(arr));

// 2. 随机数
function shuffle2(arr) {
  let result = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    // 生成0到 数组长度随机数
    const random = Math.round(Math.random() * i);
    result.push(arr.splice(random, 1)[0]);
  }
  return result;
}

console.log(shuffle2(arr));
