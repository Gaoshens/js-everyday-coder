let data = {
  a: {
    b: {
      c: {
        d: new Date(),
        e: () => {},
        f: /^/,
        g: Symbol('a'),
        h: [1, 2, 3, 4, false, () => {}],
      },
    },
  },
  i: new Map([[1, 2]]),
  j: new Set([1, 2, 2, 3, 3]),
};

data.k = data;

function deepClone(data, map = new WeakMap()) {
  // 处理Symbol
  if (typeof data === 'symbol') return Symbol(data.description);
  // 其他基本数据类型直接返回
  if (typeof data !== 'object' || data === null || typeof data === 'function') return data;

  if (map.has(data)) return map.get(data);
  if (data instanceof Date) return new Date(data); // Date类型
  if (data instanceof RegExp) return new RegExp(data);
  if (data instanceof Map) return new Map(data);
  if (data instanceof WeakMap) return new WeakMap(data);
  if (data instanceof Set) return new Set(data);

  let newData = Array.isArray(data) ? [] : {};
  map.set(data, newData);
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      newData[key] = deepClone(data[key], map);
    }
  }
  return newData;
}

let datas = deepClone(data);

console.log(datas);
