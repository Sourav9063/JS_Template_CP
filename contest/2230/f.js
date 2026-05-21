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

function addTop(value, id, u, best1, best2, best3, id1, id2, id3) {
    if (value < best1[u]) {
        best3[u] = best2[u];
        id3[u] = id2[u];
        best2[u] = best1[u];
        id2[u] = id1[u];
        best1[u] = value;
        id1[u] = id;
    } else if (value < best2[u]) {
        best3[u] = best2[u];
        id3[u] = id2[u];
        best2[u] = value;
        id2[u] = id;
    } else if (value < best3[u]) {
        best3[u] = value;
        id3[u] = id;
    }
}

function solve(q, parents) {
    const n = q + 1;
    const edgeCount = q * 2;
    const head = new Int32Array(n + 1);
    const to = new Int32Array(edgeCount);
    const from = new Int32Array(edgeCount);
    const next = new Int32Array(edgeCount);
    head.fill(-1);

    for (let i = 0; i < q; i++) {
        const u = parents[i];
        const v = i + 2;
        const e = i * 2;

        from[e] = u;
        to[e] = v;
        next[e] = head[u];
        head[u] = e;

        from[e + 1] = v;
        to[e + 1] = u;
        next[e + 1] = head[v];
        head[v] = e + 1;
    }

    const thresholds = [0, 1];
    let prev = new Float64Array(edgeCount);

    for (let e = 0; e < edgeCount; e++) {
        prev[e] = from[e];
    }

    const inf = 1e18;

    while (edgeCount > 0) {
        const best1 = new Float64Array(n + 1);
        const best2 = new Float64Array(n + 1);
        const best3 = new Float64Array(n + 1);
        const id1 = new Int32Array(n + 1);
        const id2 = new Int32Array(n + 1);
        const id3 = new Int32Array(n + 1);
        best1.fill(inf);
        best2.fill(inf);
        best3.fill(inf);
        id1.fill(-1);
        id2.fill(-1);
        id3.fill(-1);

        for (let e = 0; e < edgeCount; e++) {
            addTop(prev[e], e, to[e], best1, best2, best3, id1, id2, id3);
        }

        let best = inf;

        for (let u = 1; u <= n; u++) {
            if (best2[u] < inf) {
                const cost = Math.max(u, best1[u], best2[u]);
                if (cost < best) best = cost;
            }
        }

        if (best === inf) break;

        thresholds.push(best);

        const curr = new Float64Array(edgeCount);
        curr.fill(inf);

        for (let u = 1; u <= n; u++) {
            for (let e = head[u]; e !== -1; e = next[e]) {
                const banned = e ^ 1;
                let first = inf;
                let second = inf;

                if (id1[u] !== banned) {
                    first = best1[u];
                }

                if (id2[u] !== banned) {
                    if (first === inf) first = best2[u];
                    else second = best2[u];
                }

                if (id3[u] !== banned && second === inf) {
                    if (first === inf) first = best3[u];
                    else second = best3[u];
                }

                if (second < inf) {
                    curr[e] = Math.max(u, first, second);
                }
            }
        }

        prev = curr;
    }

    const out = new Array(q);
    let answer = 1;

    for (let i = 1; i <= q; i++) {
        const vertices = i + 1;

        while (answer + 1 < thresholds.length && thresholds[answer + 1] <= vertices) {
            answer++;
        }

        out[i - 1] = answer;
    }

    return out;
}

function main() {
    const q = readInt();
    const parents = new Int32Array(q);

    for (let i = 0; i < q; i++) {
        parents[i] = readInt();
    }

    process.stdout.write(solve(q, parents).join(" "));
}

main();
