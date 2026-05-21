"use strict";

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
    BIT
};
