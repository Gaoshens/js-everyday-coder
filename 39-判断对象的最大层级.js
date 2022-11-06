let obj = {
  a: {
    aa: {},
  },
  b: {
    bb: {
      bbb: {},
    },
  },
  c: {
    cc: {
      ddd: [
        {
          dddd: {},
        },
      ],
    },
  },
};

const isObject = x => typeof x === 'object' && x !== null;

function deep(obj) {
  let max = 0;
  for (let key in obj) {
    max = Math.max(max, deepCount(obj[key]));
  }
  return max;
}

function deepCount(obj, count = 0) {
  count += 1; // 每次进入一层则count+1
  let max = count;
  if (!isObject(obj)) return max;

  for (let key in obj) {
    max = Math.max(max, deepCount(obj[key], count));
  }
  return max;
}

console.log(deep(obj));
