import { getBaseTransformPreset } from "@vue/compiler-core";

//  元组标识 长度是固定的，（内容的类型也要规定好）
let tuple: [string, number, boolean] = ["北京", 18, true];

// 联合类型 let r:number|boolean|undefined
let r = tuple.pop();

// 数组类型:存放“一类”类型
let arr: number[] = [1, 2, 3];

// 数组类型多种,使用联合类型
let arr3: (string | number)[] = [1, "213"];
let arr4: Array<boolean | string> = [true, "1dd"]; //泛型

// 枚举，其实就是使用两个变相互做key，做value
enum OK {
  qwer,
  ok,
}
const enum OK2 {
  haha,
}
let name = "niao";

console.log(OK.ok);
console.log(OK.qwer);
console.log(OK[1]);
console.log(OK2.haha == 0);

function foo(str: string = "123") {}

let qwr: (str: string) => number = function (str) {
  return 123;
};

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

function getCache(key: string): any {
  return (window as any).cache[key];
}
interface IQ {
  name: string;
  run(): void;
}
let qwer = getCache("123") as IQ;
let fst: (a: any, b: any) => any;

let foo3: (s: string, a: string) => void;

function foo2<T>(a: T, b: string): void {}

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];

let sns = map((n) => n.toString(), [1, 2, 3]);
let str = "你好";
console.log(`${str}转换了吗`);
let sfo: any;

interface window {
  VError: any;
}

function foo12(a: { s: string; q?: string }) {
  console.log(a.q?.toUpperCase());
}
foo12({ s: "Nihao" });

interface IFoo {
  str: string;
}

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "left");

type Iq = {
  (s: number): boolean;
  show: boolean;
};

function getFirst<T>(arg: T[]): T {
  return arg[0];
}

function foo123({ x = 1, y = 12 }: { x: number; y: number }) {
  console.log(x, y);
}

foo123({  y: 3 });

export {};
