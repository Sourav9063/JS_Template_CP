"use strict";

/**
 * Disjoint Set Union with path compression and union by size.
 *
 * Assumes elements are usually numbered from 1 to n.
 *
 * @example
 * const dsu = new DSU(3);
 * dsu.union(1, 2);
 * console.log(dsu.find(1) === dsu.find(2)); // true
 */
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

module.exports = {
    DSU
};
