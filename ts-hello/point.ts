// interface Point {
//   x: number;
//   y: number;
//   draw: () => void;
// }

// let drawPoint = (point: Point) => {};
export class Point {
  // private x?: number;
  // y?: number;
  // constructor(x?: number, y?: number) {
  //   this.x = x;
  //   this.y = y;
  // }
  constructor(public x: number, private y?: number) {}
  draw() {
    console.log("X: " + this.x + ", Y: " + this.y);
  }
  getDistance(another: Point) {}

  get X() {
    return this.x;
  }
  set X(value: number) {
    if (value < 0) throw new Error("value can't be less than 0.");

    this.x = value;
  }
}
