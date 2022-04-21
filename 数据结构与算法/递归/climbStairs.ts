const resultMap: Map<number, number> = new Map();

function climbStairs(n: number): number {
  if (n === 1) return 1;
  if (n === 2) return 2;

  if (resultMap.has(n)) {
    const result: number = resultMap.get(n) as number;
    return result;
  } else {
    const result: number = climbStairs(n - 1) + climbStairs(n - 2);
    resultMap.set(n, result);
    return result;
  }
}

console.log(climbStairs(14));
