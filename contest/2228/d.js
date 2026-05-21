"use strict";

const fs = require("fs");
const buffer = fs.readFileSync(0);
let offset = 0;

function readInt() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  if (offset >= buffer.length) return null;
  let value = 0;
  while (offset < buffer.length && buffer[offset] > 32) {
    value = value * 10 + buffer[offset] - 48;
    offset++;
  }
  return value;
}

function solveCase(n) {
  const head = new Int32Array(n + 2);
  head.fill(-1);
  const next = new Int32Array(n);
  const ys = new Int32Array(n);
  const countY = new Int32Array(n + 2);

  for (let i = 0; i < n; i++) {
    const x = readInt();
    const y = readInt();
    ys[i] = y;
    next[i] = head[x];
    head[x] = i;
    countY[y]++;
  }

  const prefixUniqueY = new Int32Array(n + 2);
  let uniqueY = 0;
  let rightMinY = n + 1;
  let rightMaxY = 0;

  for (let y = 1; y <= n; y++) {
    if (countY[y] > 0) {
      uniqueY++;
      if (rightMinY === n + 1) rightMinY = y;
      rightMaxY = y;
    }
    prefixUniqueY[y] = uniqueY;
  }

  let leftMinY = n + 1;
  let leftMaxY = 0;
  let rightCount = n;
  let answer = 0;

  for (let x = 1; x <= n; x++) {
    if (head[x] === -1) continue;

    for (let edge = head[x]; edge !== -1; edge = next[edge]) {
      const y = ys[edge];
      if (y < leftMinY) leftMinY = y;
      if (y > leftMaxY) leftMaxY = y;
      countY[y]--;
      rightCount--;
    }

    while (rightMinY <= n && countY[rightMinY] === 0) rightMinY++;
    while (rightMaxY >= 1 && countY[rightMaxY] === 0) rightMaxY--;

    if (rightCount === 0) break;

    const low = leftMinY > rightMinY ? leftMinY : rightMinY;
    const high = leftMaxY < rightMaxY ? leftMaxY : rightMaxY;

    if (low < high) {
      answer += prefixUniqueY[high - 1] - prefixUniqueY[low - 1];
    }
  }

  return String(answer);
}

function main() {
  const t = readInt();
  const out = new Array(t);

  for (let tc = 0; tc < t; tc++) {
    const n = readInt();
    out[tc] = solveCase(n);
  }

  process.stdout.write(out.join("\n"));
}

main();
