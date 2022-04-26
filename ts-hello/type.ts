let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1, 2, 3];
let f: any[] = [1, true, "a", false];

// enum

enum Color {
  RED = 0,
  GREEN = 1,
  BLUE = 2,
}
let backgroundColor = Color.BLUE;

let message = "abc";
let endWithC = message.endsWith("c");
console.log(message.anchor);

// type assertion used for type any, for intellisense
(<string>message).endsWith("c");
(message as string).endsWith("c");
