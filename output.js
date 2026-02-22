"use strict";

// main.js
var fs = require("fs");
var buffer = fs.readFileSync(0);
var offset = 0;
function readInt() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  if (offset >= buffer.length) return null;
  let res = 0, sign = 1;
  if (buffer[offset] === 45) {
    sign = -1;
    offset++;
  }
  while (offset < buffer.length && buffer[offset] > 32) {
    res = res * 10 + (buffer[offset] - 48);
    offset++;
  }
  return res * sign;
}
function solve(n, arr) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += arr[i];
  }
  return sum;
}
function main() {
  const out = [];
  let t = readInt();
  if (t === null) return;
  while (t-- > 0) {
    const n = readInt();
    const arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = readInt();
    }
    const result = solve(n, arr);
    out.push(result);
  }
  process.stdout.write(out.join("\n") + "\n");
}
main();
