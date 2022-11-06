let arr = ['1.5.1', '1.04.9', '1.45.0', '6.0.0', '5.2'];

function versionSort(arr) {
  return arr.sort((a, b) => {
    let _a = a.split('.');
    let _b = b.split('.');
    let index = 0;
    while (index >= 0) {
      let s1 = _a[index];
      let s2 = _b[index];
      index++;
      // 前面的版本一致 跳过本次循环 比较后面的版本
      if (s1 === s2) continue;
      // 更短的版本在前面
      if (s1 === undefined || s2 === undefined) {
        return (s1.length = s2.length);
      }
      // 小版本在前面
      return s1 - s2;
    }
  });
}

console.log(versionSort(arr));
