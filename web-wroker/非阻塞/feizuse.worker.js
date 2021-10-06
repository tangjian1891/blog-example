function foo() {
  // 主线程开始阻塞操作
  let index = 0;
  console.time();
  // 根据自己电脑性能，调节时间
  while (index < 1000000000 * 5) {
    index++;
  }
  console.log("结束了");
  // console.log(index);
  console.timeEnd();
}


self.addEventListener('message',()=>{
  foo()
})