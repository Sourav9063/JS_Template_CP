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

function solve(n, a, b) {
    const groups = Math.floor(n / 3);
    const rem = n % 3;

    const fullGroupCost = Math.min(3 * a, b);
    const remCost = Math.min(rem * a, b);

    return BigInt(groups) * BigInt(fullGroupCost) + BigInt(remCost);
}

function main() {
    const t = readInt();
    const out = new Array(t);

    for (let tc = 0; tc < t; tc++) {
        const n = readInt();
        const a = readInt();
        const b = readInt();

        out[tc] = solve(n, a, b).toString();
    }

    process.stdout.write(out.join("\n"));
}

main();
