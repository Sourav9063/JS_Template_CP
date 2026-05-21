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

function lowerBound(arr, target) {
    let l = 0;
    let r = arr.length;

    while (l < r) {
        const m = (l + r) >> 1;

        if (arr[m] >= target) r = m;
        else l = m + 1;
    }

    return l;
}

function query(rights, values, pos) {
    return values[lowerBound(rights, pos)];
}

function solve(n, a, b) {
    const posA = Array.from({ length: n + 2 }, () => []);
    const posB = Array.from({ length: n + 2 }, () => []);

    for (let i = 1; i <= n; i++) {
        posA[a[i]].push(i);
        posB[b[i]].push(i);
    }

    let nextRights = [n + 1];
    let nextValues = [n + 1];

    for (let value = n; value >= 1; value--) {
        const listA = posA[value];
        const listB = posB[value];
        const rights = [];
        const values = [];
        let i = 0;
        let j = 0;

        while (i < listA.length || j < listB.length) {
            let pos;
            let same = false;

            if (j === listB.length || (i < listA.length && listA[i] < listB[j])) {
                pos = listA[i++];
            } else if (i === listA.length || listB[j] < listA[i]) {
                pos = listB[j++];
            } else {
                pos = listA[i];
                i++;
                j++;
                same = true;
            }

            rights.push(pos);
            values.push(same ? query(nextRights, nextValues, pos + 1) : pos);
        }

        rights.push(n + 1);
        values.push(n + 1);
        nextRights = rights;
        nextValues = values;
    }

    let answer = 0;
    let left = 1;

    for (let i = 0; i < nextRights.length && left <= n; i++) {
        const right = Math.min(nextRights[i], n);
        const len = right - left + 1;

        if (len > 0) {
            answer += len * nextValues[i] - ((left + right) * len) / 2;
        }

        left = right + 1;
    }

    return answer;
}

function main() {
    const out = [];
    
    let multTestQ = readInt();
    if (multTestQ === null) return;

    while (multTestQ-- > 0) {
        const n = readInt();
        const a = new Array(n + 1);
        const b = new Array(n + 1);

        for (let i = 1; i <= n; i++) {
            a[i] = readInt();
        }

        for (let i = 1; i <= n; i++) {
            b[i] = readInt();
        }

        const result = solve(n, a, b);
        out.push(result);
    }

    process.stdout.write(out.join("\n") + "\n");
}

main();
