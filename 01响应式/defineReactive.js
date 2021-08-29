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
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return; //相同数据直接跳过
      }
      // 赋的新值可能是新的对象
      observe(newVal);
      val = newVal;
      console.log('触发set',`key为${key}，新值为${newVal}`)
    },
  });
}

// -----------额外实现 $set,实际上调用的就是defineReactive

function $set(obj, key, val) {
  defineReactive(obj, key, val);
}

export { observe, $set };
