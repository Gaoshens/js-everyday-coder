const d1 = { 'a.b.c': 1, 'a.b.d': 2 };
const d2 = { 'a.b.e': 3, 'a.b.f': 4 };
// 合并后的结果 { a: { b: { c: 1, d: 2, e: 3, f: 4 } } }

function mergeRecord(...args) {
  return args.reduce((prev, curr) => {
    Object.keys(curr).forEach(path => {
      const paths = path.split('.');
      let data = prev;
      paths.forEach((item, index) => {
        data = data[item] || (data[item] = index === paths.length - 1 ? curr[path] : {});
      });
    });
    return prev;
  }, {});
}

console.log(mergeRecord(d1, d2)); // { a: { b: { c: 1, d: 2, e: 3, f: 4 } } }
