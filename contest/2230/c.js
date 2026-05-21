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


function solve(n, arr) {
    let ones = 0;
    let others = 0;
    let total = 0;
    let capacity = 0;

    for (let i = 0; i < n; i++) {
        if (arr[i] === 1) {
            ones++;
        } else {
            total += arr[i];
            others++;
            capacity += Math.floor(arr[i] / 2) - 1;
        }
    }

    let lastVal = arr[ n-1 ];

    if (others === 0) return 0;

    if (others === 1) {
        const answer = lastVal + Math.min(ones, Math.floor(lastVal / 2));
        return answer >= 3 ? answer : 0;
    }

    return total + Math.min(ones, capacity);
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
