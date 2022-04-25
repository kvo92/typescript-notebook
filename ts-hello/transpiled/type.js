"use strict";
let a;
let b;
let c;
let d;
let e = [1, 2, 3];
let f = [1, true, "a", false];
// enum
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["GREEN"] = 1] = "GREEN";
    Color[Color["BLUE"] = 2] = "BLUE";
})(Color || (Color = {}));
let backgroundColor = Color.BLUE;
