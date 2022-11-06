let arr = ['a', 'b', 'c', 'd'];
// ['a', 'b', 'c', 'd']  => { a:{ b:{ c:{ d:null } } } }

function arrayToObject(arr) {
  let data = null;
  return arr.reduce((prev, curr, index) => {
    console.log(curr, arr.length - 1, index);
    data = data ? (data[curr] = index === arr.length - 1 ? null : {}) : (prev[curr] = {});
    return prev;
  }, {});
}

console.log(arrayToObject(arr).a.b.c);
