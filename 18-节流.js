function throttle(fn, delay, options = { leading: false }) {
  const { leading } = options;
  // 上一次执行的时间 初始是否需要执行
  let prevTime = leading ? null : new Date();
  const _throttle = function(...args) {
    let nowTime = new Date();
    if (nowTime - prevTime >= delay) {
      fn.apply(this, args);
      prevTime = nowTime;
    }
  };

  return _throttle;
}
