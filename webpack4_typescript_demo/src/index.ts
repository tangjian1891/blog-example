console.log("123");
let s = "123";
document.title = "webpack还是方便啊";
console.log(s);
let a: symbol = Symbol();
console.log(a);
// console.log(a);

interface addFn {
  (num1: number, num2: string): void;
}
type addFn2 = (num1: string, num2: string) => number;

const foo: addFn2 = function(num1, num2) {
  return num2 + num1 + "123";
};
