"use strict";

/**
 * Segment tree for range-add updates and range-sum queries.
 *
 * The constructor accepts a merge function and neutral value, but the lazy
 * propagation logic is specialized for sum with range-add updates.
 *
 * @example
 * const st = new SegmentTree(arr, (a, b) => a + b, 0); // Sum Segment Tree
 * st.update(l, r, val);
 * st.query(l, r);
 */
class SegmentTree {
    constructor(arr, mergeFn, neutralVal) {
        this.n = arr.length;
        this.mergeFn = mergeFn;
        this.neutralVal = neutralVal;
        this.tree = new Array(4 * this.n).fill(neutralVal);
        this.lazy = new Array(4 * this.n).fill(0);
        this.hasLazy = new Array(4 * this.n).fill(false);
        this.build(arr, 1, 0, this.n - 1);
    }

    build(arr, node, start, end) {
        if (start === end) {
            this.tree[node] = arr[start];
        } else {
            const mid = (start + end) >> 1;
            this.build(arr, 2 * node, start, mid);
            this.build(arr, 2 * node + 1, mid + 1, end);
            this.tree[node] = this.mergeFn(this.tree[2 * node], this.tree[2 * node + 1]);
        }
    }

    push(node, start, end) {
        if (this.hasLazy[node]) {
            if (start !== end) {
                const mid = (start + end) >> 1;
                // Apply lazy to children
                this.lazy[2 * node] += this.lazy[node];
                this.tree[2 * node] += this.lazy[node] * (mid - start + 1); // Specific for SUM! Need generic way for other ops?
                this.hasLazy[2 * node] = true;

                this.lazy[2 * node + 1] += this.lazy[node];
                this.tree[2 * node + 1] += this.lazy[node] * (end - mid);
                this.hasLazy[2 * node + 1] = true;
            }
            this.lazy[node] = 0;
            this.hasLazy[node] = false;
        }
    }
    
    // NOTE: The above push implementation is specific for Range Sum Query with Range Add Update.
    // For generic Lazy Prop, the update logic depends on the operation.
    // Below is a generic implementation assuming Range Add Update and Range Sum Query.
    // For Min/Max with Add/Set, logic differs. 
    // Just providing a basic Sum Segment Tree here. For complex cases, modify 'push' and 'update'.

    update(l, r, val) {
        this._update(1, 0, this.n - 1, l, r, val);
    }

    _update(node, start, end, l, r, val) {
        this.push(node, start, end);
        if (start > end || start > r || end < l) return;
        
        if (start >= l && end <= r) {
            this.lazy[node] += val;
            this.tree[node] += val * (end - start + 1);
            this.hasLazy[node] = true;
            return;
        }

        const mid = (start + end) >> 1;
        this._update(2 * node, start, mid, l, r, val);
        this._update(2 * node + 1, mid + 1, end, l, r, val);
        this.tree[node] = this.mergeFn(this.tree[2 * node], this.tree[2 * node + 1]);
    }

    query(l, r) {
        return this._query(1, 0, this.n - 1, l, r);
    }

    _query(node, start, end, l, r) {
        this.push(node, start, end);
        if (start > end || start > r || end < l) return this.neutralVal;
        if (start >= l && end <= r) return this.tree[node];

        const mid = (start + end) >> 1;
        return this.mergeFn(
            this._query(2 * node, start, mid, l, r),
            this._query(2 * node + 1, mid + 1, end, l, r)
        );
    }
}

/**
 * Sparse table for idempotent static range queries.
 *
 * Default function is Math.min. Query is O(1) after O(n log n) build.
 *
 * @example
 * const st = new SparseTable([5, 2, 7]);
 * console.log(st.query(0, 2)); // 2
 */
class SparseTable {
    constructor(arr, func = Math.min) {
        this.func = func;
        this.n = arr.length;
        this.logs = new Array(this.n + 1).fill(0);
        for (let i = 2; i <= this.n; i++) this.logs[i] = this.logs[i >> 1] + 1;
        
        this.k = this.logs[this.n];
        this.table = Array.from({ length: this.n }, () => new Array(this.k + 1));
        
        for (let i = 0; i < this.n; i++) this.table[i][0] = arr[i];
        
        for (let j = 1; j <= this.k; j++) {
            for (let i = 0; i + (1 << j) <= this.n; i++) {
                this.table[i][j] = this.func(
                    this.table[i][j - 1],
                    this.table[i + (1 << (j - 1))][j - 1]
                );
            }
        }
    }

    query(l, r) {
        const j = this.logs[r - l + 1];
        return this.func(this.table[l][j], this.table[r - (1 << j) + 1][j]);
    }
}

module.exports = {
    SegmentTree,
    SparseTable
};
