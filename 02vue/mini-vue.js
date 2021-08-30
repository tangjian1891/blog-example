function MiniVue(options) {
  this.$options = options;
  this.$data = options.data; //挂载数据 到实例上(不考虑函数情况)
  //劫持数据
  observe(this.$data);

  // 代理数据
  proxy(this, this.$data);

  // 编译模板
  new Compile(this);
}

// 观察数据。对象才进行劫持。会被多次调用
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return; //非对象，直接跳出
  }

  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]); //对象的每个key都需要做劫持
  });
}

// 核心函数，此处会形成一个闭包，val形参会做为最终数据值get/set
function defineReactive(obj, key, val) {
  // 每个数据应该有自己的依赖
  const dep = new Dep(); //单个字段都有一个dep依赖，在闭包中长存
  Object.defineProperty(obj, key, {
    get() {
      // 编译的一次触发get，需要收集
      Dep.target && dep.addDep(Dep.target); //将watcher收集起来
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return; //相同数据直接跳过
      }
      // 赋的新值可能是新的对象
      observe(newVal);
      val = newVal;
      dep.notify(); // 赋值后，需要通知依赖中的所有watcher更新

      console.log("触发set", `key为${key}，新值为${newVal}`);
    },
  });
}

// 代理数据，这样就能直接在this[key]上取整，而不是this.$data[key] .这里无须递归，因为只需要最外层就行
function proxy(vm, $data) {
  Object.keys($data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return $data[key];
      },
      set(newVal) {
        $data[key] = newVal;
      },
    });
  });
}

// 编译模板
function Compile(vm) {
  vm.$el = document.querySelector(vm.$options.el); //目标DOM
  vm.$el.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      //元素
      // 元素节点.需要查看元素的attrs 上是否含有v-指令
      Array.from(node.attributes).forEach((attr) => {
        const attrName = attr.name;
        const exp = attr.value;
        //如果是以v开头的，那就是指令了
        if (attrName.startsWith("v-")) {
          const dir = attrName.substring(2); //只要text html
          this[dir] && this[dir](node, vm, exp);
        }
      });
    } else if (node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)) {
      //文本 只要解析插值表达式{{}}  正则解析后，可以直接渠道数据 RegExp.$1
      this.text(node, vm, RegExp.$1);
    }
  });
}
// 编译解析v-text指令
Compile.prototype.text = function (node, vm, exp) {
  // 取值

  //更新函数
  const updateFn = (vm, node, exp) => {
    node.textContent = vm[exp];
  };
  // 手动执行一下
  updateFn.call(vm, vm, node, exp);

  // 将此更新函数收集起来
  new Watcher(vm, exp, node, updateFn);
};
// 编译解析v-html指令
Compile.prototype.html = function (node, vm, exp) {
  //更新函数
  const updateFn = (vm, node, exp) => {
    node.innerHTML = vm[exp];
  };
  // 手动执行一下
  updateFn.call(vm, vm, node, exp);

  // 将此更新函数收集起来
  new Watcher(vm, exp, node, updateFn);
};

function Watcher(vm, exp, node, fn) {
  this.$vm = vm;
  this.$exp = exp;
  this.$node = node;
  this.$updateFn = fn;
  // 此时读一下表达式的值,触发响应式劫持的get，将此watcher对象收集进去
  Dep.target = this; //this就是这个watcher对象，里面有updateFn
  vm[exp];
  Dep.target = null;
}

Watcher.prototype.update = function () {
  this.$updateFn.call(this.$vm, this.$vm, this.$node, this.$exp);
};

function Dep() {
  this.dep = [];
}

Dep.prototype.addDep = function (watcher) {
  this.dep.push(watcher);
};

Dep.prototype.notify = function () {
  this.dep.forEach((watcher) => {
    watcher.update();
  });
};

// -----------额外实现 $set,实际上调用的就是defineReactive

function $set(obj, key, val) {
  defineReactive(obj, key, val);
}

// export { observe, $set };
