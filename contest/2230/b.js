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

function readToken() {
    while (offset < buffer.length && buffer[offset] <= 32) offset++;
    const start = offset;

    while (offset < buffer.length && buffer[offset] > 32) offset++;

    return buffer.subarray(start, offset);
}

function solve(s) {
    let suffixOneOrThree = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 49 || s[i] === 51) suffixOneOrThree++;
    }

    let twosBefore = 0;
    let bestKeep = suffixOneOrThree;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 49 || s[i] === 51) {
            suffixOneOrThree--;
        } else if (s[i] === 50) {
            twosBefore++;
        }

        const keep = twosBefore + suffixOneOrThree;
        if (keep > bestKeep) bestKeep = keep;
    }

    return s.length - bestKeep;
}

function main() {
    const t = readInt();
    const out = new Array(t);

    for (let tc = 0; tc < t; tc++) {
        out[tc] = String(solve(readToken()));
    }

    process.stdout.write(out.join("\n"));
}

main();
