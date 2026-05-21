"use strict";

/**
 * Fenwick Tree / Binary Indexed Tree for prefix sums.
 *
 * Uses 1-indexed positions.
 *
 * @example
 * const bit = new BIT(5);
 * bit.add(1, 10);
 * bit.add(3, 5);
 * console.log(bit.query(3)); // 15
 */
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

    /**
     * Finds the smallest index i where prefix sum query(i) >= target.
     *
     * All added values should be non-negative for this binary lifting search.
     *
     * @param {number} target - Target prefix sum.
     * @returns {number} Smallest 1-indexed position.
     *
     * @example
     * const bit = new BIT(3);
     * bit.add(1, 2);
     * bit.add(2, 5);
     * console.log(bit.lowerBound(6)); // 2
     */
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
