// self.addEventListener('message', function (e) {
// }, false);



let index=0
console.time()
while(index<10000000000){
    index++
    console.log(index)
}
console.log('结束了')
// console.log(index);
console.timeEnd()