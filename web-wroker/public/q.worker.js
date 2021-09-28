this.window = {}; //模拟对象，便于挂载axios

 

// let str = importScripts("./axios.min.js");
let str = importScripts("https://cdn.jsdelivr.net/npm/axios@0.21.4/dist/axios.min.js");
console.log(window.axios);
self.addEventListener(
  "message",
  (e) => {
     
    foo();
  },
  false
);

function foo() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/test");
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("成功获取数据");
      self.postMessage("ok" + xhr.responseText + xhr.status);
    }
  };
  xhr.send();

  // window.axios.request({
  //   url:"/test",
  //   data:{
  //     address:"你好啊"
  //   }
  // }).then(res=>{
  //   console.log(res)
  //   console.log(res.status)
  //   self.postMessage("ok" + res.data+res.status)
  // })
}
