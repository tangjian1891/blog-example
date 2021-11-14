//  元组标识 长度是固定的，（内容的类型也要规定好）
let tuple: [string, number, boolean] = ["北京", 18, true];

// 联合类型 let r:number|boolean|undefined
let r = tuple.pop();

// 数组类型:存放“一类”类型
let arr: number[] = [1, 2, 3];

// 数组类型多种,使用联合类型
let arr3: (string | number)[] = [1, "213"];
let arr4: Array<boolean | string> = [true, "1dd"];//泛型

// 枚举，其实就是使用两个变相互做key，做value
enum OK{
  qwer,
  ok
}
const enum OK2{
  haha
}
let name="niao"

console.log(OK.ok);
console.log(OK.qwer);
console.log(OK[1]);
console.log(OK2.haha==0);

export {}