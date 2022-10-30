let a = '88888888888888888888888888';
let b = '333333333333388888888888888888888888888';

function computeMaxNumber(a, b) {
  let maxLength = Math.max(a.length, b.length);
  // 补位
  a = a.padStart(maxLength, '0');
  b = b.padStart(maxLength, '0');
  let res = '';
  let c = 0; // 进制
  // 从最后一位进行相加
  while (--maxLength >= 0) {
    const s = Number(a[maxLength]) + Number(b[maxLength]) + c;
    c = Math.floor(s / 10);
    res = (s % 10) + res;
  }
  if (c === 1) res = c + res;
  return res;
}

console.log(computeMaxNumber(a, b));
