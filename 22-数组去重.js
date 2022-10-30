let arr = [1, 2, 2, '3', 4, '3', false, true, false, 5];

// reduce
function repeatFilter1() {
  return this.reduce((prev, curr) => (prev.indexOf(curr) === -1 && prev.push(curr), prev), []);
}

// set
function repeatFilter2(arr) {
  return [...new Set(arr)];
}
