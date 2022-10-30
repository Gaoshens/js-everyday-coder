/**
 * 实现EventEmitter
 * on方法添加一个订阅事件
 * emit触发该事件
 * off卸载对应事件
 * once添加一个订阅事件 只允许触发一次
 */

class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(name, cb) {
    if (typeof cb !== 'function') {
      console.log(`${cb} is not a function`);
    }
    (this.events[name] || (this.events[name] = [])).push(cb);
  }
  emit(name, ...args) {
    const cbs = this.events[name] || [];
    cbs.forEach(cb => cb.call(this, ...args));
  }
  off(name, cb) {
    let cbs = this.events[name] || [];
    this.events[name] = cbs.filter(fn => {
      return fn !== cb && fn !== cb.link;
    });
    if (this.events[name].length === 0) delete this.events[name];
  }
  once(name, cb) {
    const callback = function(...args) {
      this.off(name, callback);
      cb.apply(this, args);
    };
    callback.link = cb;
    this.on(name, callback);
  }
}

const mitt = new EventEmitter();

const foo = (...args) => {
  console.log('foo', args);
};
const bar = (...args) => {
  console.log('bar', args);
};

// mitt.on('click', foo);
// mitt.on('click', bar);
// mitt.off('click', foo);
// mitt.off('click', bar);
// mitt.emit('click', 1, 2, 3, 4);

// 测试once
mitt.once('click', foo);
mitt.emit('click', 1, 2, 3, 4);
mitt.emit('click', 1, 2, 3, 4);
