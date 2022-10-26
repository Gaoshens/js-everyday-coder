const path = require('path');
const fs = require('fs');
const vm = require('vm');
class Module {
  constructor(id) {
    this.id = id; // 保存模块绝对路径
    this.exports = {};
  }
  load() {
    // 获取后缀名
    const ext = path.extname(this.id);
    Module._extensions[ext](this);
  }
}

Module._extensions = {
  '.js'(module) {
    // 读取文件内容
    const content = fs.readFileSync(module.id, 'utf-8');
    // 包装成函数
    const contentFn = Module._compiler[0] + content + Module._compiler[1];
    // 创建一个执行韩式
    const compilerFn = vm.runInThisContext(contentFn);
    const exports = module.exports;
    const _filename = module.id;
    const _dirname = path.dirname(module.id);
    compilerFn.call(exports, exports, module, myRequire, _filename, _dirname);
  },
  '.json'() {},
};

Module._compiler = ['(function(exports,module,require,_filename,_dirname){', '})'];

Module._getAbsPath = function(id) {
  // 补全路径
  const absPath = path.resolve(__dirname, id);
  // 判断文件是否存在
  const isExists = fs.existsSync(absPath);
  if (isExists) return absPath;
  // 尝试补全后缀信息
  let extensions = ['.js', '.json'];
  if (!isExists) {
    for (let ext of extensions) {
      if (fs.existsSync(absPath + ext)) {
        return absPath + ext;
      }
    }
  }
  throw new EvalError(`${id} is not defind`);
};

Module._cache = {};

function myRequire(id) {
  // 获取绝对路径
  const abs = Module._getAbsPath(id);
  // 读取缓存
  const cacheModule = Module._cache[id];
  if (cacheModule) return cacheModule.exports;
  // 创建模块对象
  const module = new Module(abs);
  // 加载模块
  module.load();
  return module.exports;
}

const m = myRequire('./01-实现call');
const c = myRequire('./01-实现call');
console.log(m);
console.log(c);
