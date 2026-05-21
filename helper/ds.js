"use strict";

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

module.exports = {
    Queue,
    Deque,
    PriorityQueue,
    DSU,
    BIT
};
