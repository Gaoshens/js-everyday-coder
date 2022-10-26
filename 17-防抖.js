function debounce(fn, delay, options = { leading: false }) {
  // 初始化定时器
  let timer = null;

  let { leading } = options;

  let invoker = false;

  const _debounce = function(...args) {
    // 判断第一次是否需要执行
    if (leading && !invoker) {
      fn.apply(this, args);
      invoker = true;
      return;
    }

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  // 取消操作
  _debounce.about = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return _debounce;
}
