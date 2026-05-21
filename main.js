"use strict";

const fs = require("fs");

const buffer = fs.readFileSync(0);
const inputLength = buffer.length;
let offset = 0;

// Use when you need a normal JavaScript string token.
// Example input token: "alice" or "12345"
// Example use: const name = readNext(); const digits = readNext();
function readNext() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] > 32) offset++;

    return buffer.toString("utf8", start, offset);
}

// Use when you want the fastest token read and can work with character codes.
// Example input token: "123"
// token[0] is 49 ('1'), token[1] is 50 ('2'), token[2] is 51 ('3').
// Example use: const s = readToken(); if (s[i] === 49) countOnes++;
function readToken() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] > 32) offset++;

    return buffer.subarray(start, offset);
}

// Use when the value can contain spaces and you need the whole remaining line.
// Example input line: "hello world from codeforces"
// Example use: const sentence = readLine();
function readLine() {
    while (offset < inputLength && (buffer[offset] === 10 || buffer[offset] === 13)) {
        offset++;
    }
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] !== 10 && buffer[offset] !== 13) {
        offset++;
    }

    return buffer.toString("utf8", start, offset);
}

function readUInt() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    let value = 0;
    while (offset < inputLength) {
        const c = buffer[offset];
        if (c <= 32) break;
        value = value * 10 + c - 48;
        offset++;
    }

    return value;
}

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

// Use for integer values larger than Number.MAX_SAFE_INTEGER.
// Example use: const n = readBigInt();
function readBigInt() {
    const token = readNext();
    return token === null ? null : BigInt(token);
}

// Main function handles I/O and test case looping.
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

// Solve function strictly handles the logic for a single test case.
function solveCase() {
    // Use readUInt() for positive integers, readInt() for signed integers,
    // readToken() for byte-level string work, and readNext() only when a JS string is needed.
    return "";
}
