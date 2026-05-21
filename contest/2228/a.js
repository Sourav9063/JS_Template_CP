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
  let c0 = 0, c1 = 0, c2 = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] === 0) c0++;
    else if (arr[i] === 1) c1++;
    else c2++;
  }
  return c0 + Math.min(c1, c2) + Math.floor(Math.abs(c1 - c2) / 3);
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