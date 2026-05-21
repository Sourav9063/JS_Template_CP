"use strict";

const fs = require("fs");
const buffer = fs.readFileSync(0);
let offset = 0;

function readNext() {
  while (offset < buffer.length && buffer[offset] <= 32) offset++;
  if (offset >= buffer.length) return null;
  const start = offset;
  while (offset < buffer.length && buffer[offset] > 32) offset++;
  return buffer.toString("utf8", start, offset);
}

function minForLength(len, digits) {
  if (len <= 0) return null;
  if (len === 1) return String(digits[0]);

  let first = null;
  for (const d of digits) {
    if (d !== 0) {
      first = d;
      break;
    }
  }
  if (first === null) return null;
  return String(first) + String(digits[0]).repeat(len - 1);
}

function maxForLength(len, digits) {
  if (len <= 0) return null;
  if (len === 1) return String(digits[digits.length - 1]);

  let first = null;
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 0) {
      first = digits[i];
      break;
    }
  }
  if (first === null) return null;
  return String(first) + String(digits[digits.length - 1]).repeat(len - 1);
}

function choicesAt(pos, len, digits) {
  if (pos === 0 && len > 1) return digits.filter((d) => d !== 0);
  return digits;
}

function nextGE(s, digits) {
  const len = s.length;
  const res = [];

  for (let i = 0; i < len; i++) {
    const cur = s.charCodeAt(i) - 48;
    const choices = choicesAt(i, len, digits);

    if (choices.includes(cur)) {
      res.push(cur);
      continue;
    }

    for (const d of choices) {
      if (d > cur) {
        return res.join("") + String(d) + String(digits[0]).repeat(len - i - 1);
      }
    }

    for (let j = i - 1; j >= 0; j--) {
      const prevChoices = choicesAt(j, len, digits);
      for (const d of prevChoices) {
        if (d > res[j]) {
          return res.slice(0, j).join("") + String(d) + String(digits[0]).repeat(len - j - 1);
        }
      }
    }
    return minForLength(len + 1, digits);
  }

  return s;
}

function prevLE(s, digits) {
  const len = s.length;
  const res = [];

  for (let i = 0; i < len; i++) {
    const cur = s.charCodeAt(i) - 48;
    const choices = choicesAt(i, len, digits);

    if (choices.includes(cur)) {
      res.push(cur);
      continue;
    }

    for (let j = choices.length - 1; j >= 0; j--) {
      const d = choices[j];
      if (d < cur) {
        return res.join("") + String(d) + String(digits[digits.length - 1]).repeat(len - i - 1);
      }
    }

    for (let j = i - 1; j >= 0; j--) {
      const prevChoices = choicesAt(j, len, digits);
      for (let p = prevChoices.length - 1; p >= 0; p--) {
        const d = prevChoices[p];
        if (d < res[j]) {
          return res.slice(0, j).join("") + String(d) + String(digits[digits.length - 1]).repeat(len - j - 1);
        }
      }
    }
    return maxForLength(len - 1, digits);
  }

  return s;
}

function absDiff(a, b) {
  const x = BigInt(a);
  const y = BigInt(b);
  return x > y ? x - y : y - x;
}

function solve(a, digits) {
  const candidates = [prevLE(a, digits), nextGE(a, digits)].filter((x) => x !== null);
  let best = null;

  for (const candidate of candidates) {
    const diff = absDiff(a, candidate);
    if (best === null || diff < best) best = diff;
  }

  return best.toString();
}

function main() {
  const out = [];
  let t = Number(readNext());
  if (t === null) return;

  while (t-- > 0) {
    const a = readNext();
    const n = Number(readNext());
    const digits = new Array(n);

    for (let i = 0; i < n; i++) {
      digits[i] = Number(readNext());
    }

    out.push(solve(a, digits));
  }

  process.stdout.write(out.join("\n") + "\n");
}

main();
