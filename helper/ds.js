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
}

// --- Deque (Replaces std::deque) ---
class Deque {
    constructor() { this.frontArr = []; this.backArr = []; }
    push_back(val) { this.backArr.push(val); }
    push_front(val) { this.frontArr.push(val); }
    pop_back() { 
        if (this.backArr.length) return this.backArr.pop();
        return this.frontArr.shift(); // O(N) fallback, rare if balanced
    }
    pop_front() {
        if (this.frontArr.length) return this.frontArr.pop();
        let val = this.backArr[0];
        this.backArr.shift(); // O(N) fallback
        return val;
    }
    front() { return this.frontArr.length ? this.frontArr[this.frontArr.length - 1] : this.backArr[0]; }
    back() { return this.backArr.length ? this.backArr[this.backArr.length - 1] : this.frontArr[0]; }
    empty() { return this.frontArr.length === 0 && this.backArr.length === 0; }
    size() { return this.frontArr.length + this.backArr.length; }
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
        if (this.parent[i] === i) return i;
        return this.parent[i] = this.find(this.parent[i]); 
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
}

module.exports = {
    Queue,
    Deque,
    PriorityQueue,
    DSU,
    BIT
};
