"use strict";

// solve.js
var fs = require("fs");
var buffer = fs.readFileSync(0);
var inputLength = buffer.length;
var offset = 0;
function readInt() {
  while (offset < inputLength && buffer[offset] <= 32) offset++;
  if (offset >= inputLength) return null;
  let value = 0;
  let sign = 1;
  if (buffer[offset] === 45) {
    sign = -1;
    offset++;
  }
  while (offset < inputLength) {
    const c = buffer[offset];
    if (c <= 32) break;
    value = value * 10 + c - 48;
    offset++;
  }
  return value * sign;
}
function main() {
  const t = readInt();
  if (t === null) return;
  const out = new Array(t);
  for (let tc = 0; tc < t; tc++) {
    out[tc] = String(solveCase());
  }
  process.stdout.write(out.join("\n"));
}
main();
function solveCase() {
  return "";
}
