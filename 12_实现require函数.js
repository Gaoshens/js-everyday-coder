const path = require('path');
const fs = require('fs');
const vm = require('vm');


class Module {
  constructor(id) {
    this.id = id;
    this.exports = {};
  }
  load() {
    // 获取文件后缀名
    const ext = path.extname(this.id);
    Module._extensions[ext](this);
  }
}

Module._extensions = {
  '.js'(module) {
    // 读取文件内容
    const content = fs.readFileSync(module.id, 'utf-8');
    // 包装参数
    const contentFn = Module._wrapper[0] + content + Module._wrapper[1];
    // 使用vm执行
    const compileFn = vm.runInThisContext(contentFn);
    const _exports = module.exports;
    const _filename = module.id;
    const _dirname = path.dirname(module.id);

    compileFn.call(_exports, _exports, myRequire, module, _filename, _dirname);
  },
  '.json'() { },
}
Module._wrapper = ['(function(exports,require,module,_filename,_dirname){', '})']

// 缓存
Module._cache = {

}

Module._requreFilename = function (filename) {
  // 获取文件的绝对路径
  const absPath = path.resolve(__dirname, filename);
  // 判读当前文件是否存在
  if (fs.existsSync(absPath)) return absPath;

  // 为当前文件补充后缀
  const exts = Object.keys(Module._extensions);
  for (let ext of exts) {
    const supplyPath = absPath + ext;
    if (fs.existsSync(supplyPath)) return supplyPath
  }

  throw new Error(`❎ ${filename} is not defind`)

}


// 实现requrie函数
function myRequire(filename) {
  // 读取路径
  const mPath = Module._requreFilename(filename);

  // 使用vm加载

  // 优先读取缓存
  const cacheModule = Module._cache[mPath];
  if (cacheModule) return cacheModule.exports;

  const module = new Module(mPath);
  // 开始执行
  module.load();
  return module.exports;
}


const v = myRequire('./vindex');

console.log(v);