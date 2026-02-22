"use strict";

const fs = require("fs");

/**
 * 1. FAST I/O (Crucial Optimization for Codeforces)
 * Note: Remove this entire section for LeetCode.
 */
const buffer = fs.readFileSync(0);
let offset = 0;

function readNext() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let start = offset;
    while (offset < buffer.length && buffer[offset] > 32) offset++;
    return buffer.toString("utf8", start, offset);
}

// Reads an entire line (including spaces) until the next newline
function readLine() {
    // Skip any leftover newlines (\n = 10) or carriage returns (\r = 13)
    while (offset < buffer.length && (buffer[offset] === 10 || buffer[offset] === 13)) {
        offset++;
    }
    if (offset >= buffer.length) return null;
    let start = offset;
    
    // Read until we hit the next newline or carriage return
    while (offset < buffer.length && buffer[offset] !== 10 && buffer[offset] !== 13) {
        offset++;
    }
    return buffer.toString("utf8", start, offset);
}

function readInt() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    if (offset >= buffer.length) return null;
    let res = 0, sign = 1;
    if (buffer[offset] === 45) { sign = -1; offset++; } // '-' is 45 in ASCII
    while (offset < buffer.length && buffer[offset] > 32) {
        res = res * 10 + (buffer[offset] - 48);
        offset++;
    }
    return res * sign;
}

function readBigInt() {
    const word = readNext();
    return word ? BigInt(word) : null;
}

module.exports = {
    readNext,
    readLine,
    readInt,
    readBigInt
};
