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

/**
 * 2. C++ STL EQUIVALENTS
 */

// --- O(1) Queue (Replaces std::queue) ---
class Queue {
    constructor() { this.q = []; this.head = 0; }
    push(x) { this.q.push(x); }
    pop() {
        if (this.empty()) return null;
        const res = this.q[this.head++];
        if (this.head * 2 >= this.q.length) {
            this.q = this.q.slice(this.head);
            this.head = 0;
        }
        return res;
    }
    front() { return this.empty() ? null : this.q[this.head]; }
    empty() { return this.head === this.q.length; }
    size() { return this.q.length - this.head; }
    clear() { this.q.length = 0; this.head = 0; }
}

// --- Deque (Replaces std::deque) ---
class Deque {
    constructor(capacity = 16) {
        this.data = new Array(Math.max(1, capacity));
        this.head = 0;
        this.len = 0;
    }

    _grow() {
        const old = this.data;
        const n = old.length;
        const next = new Array(n << 1);

        for (let i = 0; i < this.len; i++) {
            next[i] = old[(this.head + i) % n];
        }

        this.data = next;
        this.head = 0;
    }

    push_back(val) {
        if (this.len === this.data.length) this._grow();
        this.data[(this.head + this.len) % this.data.length] = val;
        this.len++;
    }

    push_front(val) {
        if (this.len === this.data.length) this._grow();
        this.head = (this.head - 1 + this.data.length) % this.data.length;
        this.data[this.head] = val;
        this.len++;
    }

    pop_back() {
        if (this.empty()) return null;
        const idx = (this.head + this.len - 1) % this.data.length;
        const val = this.data[idx];
        this.data[idx] = undefined;
        this.len--;
        return val;
    }

    pop_front() {
        if (this.empty()) return null;
        const val = this.data[this.head];
        this.data[this.head] = undefined;
        this.head = (this.head + 1) % this.data.length;
        this.len--;
        return val;
    }

    front() { return this.empty() ? null : this.data[this.head]; }
    back() { return this.empty() ? null : this.data[(this.head + this.len - 1) % this.data.length]; }
    empty() { return this.len === 0; }
    size() { return this.len; }
    clear() { this.data.fill(undefined); this.head = 0; this.len = 0; }
}

// --- Priority Queue (Replaces std::priority_queue) ---
class PriorityQueue {
    constructor(comparator = (a, b) => a < b) { // Default: Min-Heap
        this.heap = [];
        this.comparator = comparator;
    }
    size() { return this.heap.length; }
    empty() { return this.heap.length === 0; }
    peek() { return this.heap[0]; }
    clear() { this.heap.length = 0; }
    push(val) {
        this.heap.push(val);
        this.siftUp(this.size() - 1);
    }
    pop() {
        if (this.empty()) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    siftUp(idx) {
        while (idx > 0) {
            let p = (idx - 1) >> 1;
            if (this.comparator(this.heap[idx], this.heap[p])) {
                [this.heap[idx], this.heap[p]] = [this.heap[p], this.heap[idx]];
                idx = p;
            } else break;
        }
    }
    siftDown(idx) {
        while (true) {
            let l = (idx << 1) + 1, r = (idx << 1) + 2, s = idx;
            if (l < this.size() && this.comparator(this.heap[l], this.heap[s])) s = l;
            if (r < this.size() && this.comparator(this.heap[r], this.heap[s])) s = r;
            if (s === idx) break;
            [this.heap[idx], this.heap[s]] = [this.heap[s], this.heap[idx]];
            idx = s;
        }
    }
}

// --- Binary Search (Replaces std::lower_bound & std::upper_bound) ---
const lowerBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return l;
};

const upperBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] > target) r = mid;
        else l = mid + 1;
    }
    return l;
};

const binarySearchFirstTrue = (lo, hi, predicate) => {
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (predicate(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};

const binarySearchLastTrue = (lo, hi, predicate) => {
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (predicate(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
};

// --- Disjoint Set Union (DSU) ---
class DSU {
    constructor(n) {
        this.parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.size = new Array(n + 1).fill(1);
        this.components = n;
    }
    find(i) {
        let root = i;
        while (this.parent[root] !== root) root = this.parent[root];
        while (this.parent[i] !== i) {
            const p = this.parent[i];
            this.parent[i] = root;
            i = p;
        }
        return root;
    }
    union(i, j) {
        let rootI = this.find(i), rootJ = this.find(j);
        if (rootI !== rootJ) {
            if (this.size[rootI] < this.size[rootJ]) [rootI, rootJ] = [rootJ, rootI];
            this.parent[rootJ] = rootI;
            this.size[rootI] += this.size[rootJ];
            this.components--;
            return true;
        }
        return false;
    }
}

// --- Fenwick Tree / Binary Indexed Tree (1-indexed) ---
class BIT {
    constructor(n) { this.tree = new Array(n + 1).fill(0); }
    add(i, delta) {
        for (; i < this.tree.length; i += i & -i) this.tree[i] += delta;
    }
    query(i) {
        let sum = 0;
        for (; i > 0; i -= i & -i) sum += this.tree[i];
        return sum;
    }
    rangeQuery(l, r) { return this.query(r) - this.query(l - 1); }
    lowerBound(target) {
        let idx = 0;
        let bit = 1;
        while ((bit << 1) < this.tree.length) bit <<= 1;

        for (; bit > 0; bit >>= 1) {
            const next = idx + bit;
            if (next < this.tree.length && this.tree[next] < target) {
                idx = next;
                target -= this.tree[next];
            }
        }

        return idx + 1;
    }
}

/**
 * 3. UTILITIES & MATH
 */
// 2D Array Initialization
const make2D = (r, c, val = 0) => Array.from({ length: r }, () => new Array(c).fill(val));

// Safe Max/Min for large arrays (Avoids Maximum Call Stack Size Exceeded)
const arrayMax = (arr) => arr.reduce((a, b) => (a > b ? a : b));
const arrayMin = (arr) => arr.reduce((a, b) => (a < b ? a : b));

const prefixSum = (arr) => {
    const pref = new Array(arr.length + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
    return pref;
};

const coordinateCompress = (arr) => {
    const values = [...new Set(arr)].sort((a, b) => a - b);
    const id = new Map();

    for (let i = 0; i < values.length; i++) {
        id.set(values[i], i);
    }

    return {
        values,
        compressed: arr.map(x => id.get(x)),
        id
    };
};

const gcd = (a, b) => {
    if (typeof a === "bigint" || typeof b === "bigint") {
        a = BigInt(a);
        b = BigInt(b);
        if (a < 0n) a = -a;
        if (b < 0n) b = -b;
        while (b !== 0n) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
};

const lcm = (a, b) => {
    if (typeof a === "bigint" || typeof b === "bigint") {
        a = BigInt(a);
        b = BigInt(b);
        if (a === 0n || b === 0n) return 0n;
        return (a / gcd(a, b)) * b;
    }
    if (a === 0 || b === 0) return 0;
    return (a / gcd(a, b)) * b;
};

const modNormalize = (x, mod) => {
    if (typeof x === "bigint" || typeof mod === "bigint") {
        x = BigInt(x);
        mod = BigInt(mod);
        x %= mod;
        return x < 0n ? x + mod : x;
    }
    x %= mod;
    return x < 0 ? x + mod : x;
};

// Modular Exponentiation (base^exp % mod)
const power = (base, exp, mod) => {
    mod = BigInt(mod);
    let res = 1n;
    base = BigInt(base) % mod;
    exp = BigInt(exp);
    while (exp > 0n) {
        if (exp & 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
};

/**
 * 4. MAIN LOGIC
 */

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
