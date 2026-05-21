"use strict";

/**
 * Binary-lifting Lowest Common Ancestor helper for a rooted tree.
 *
 * Assumes nodes are numbered from 1 to n and `adj[u]` contains undirected tree
 * neighbors. Preprocessing is O(n log n); each LCA or distance query is O(log n).
 *
 * @example
 * const adj = [[], [2, 3], [1, 4], [1], [2]];
 * const lca = new LCA(adj, 1, 4);
 * console.log(lca.getLCA(4, 3)); // 1
 * console.log(lca.dist(4, 3)); // 3
 */
class LCA {
    /**
     * Builds the binary-lifting table from a rooted tree.
     *
     * @param {Array<Array<number>>} adj - 1-indexed undirected tree adjacency list.
     * @param {number} root - Root node.
     * @param {number} n - Number of nodes.
     */
    constructor(adj, root, n) {
        this.n = n;
        this.adj = adj;
        this.LOG = Math.ceil(Math.log2(n + 1));
        this.up = Array.from({ length: n + 1 }, () => new Array(this.LOG + 1).fill(0));
        this.depth = new Array(n + 1).fill(0);
        this.root = root;

        this._build(root);
    }

    /**
     * Fills parent jump pointers and depths iteratively to avoid recursion limits.
     *
     * @private
     * @param {number} root - Root node.
     * @returns {void}
     */
    _build(root) {
        const stack = [[root, root]];

        while (stack.length) {
            const [u, p] = stack.pop();
            this.up[u][0] = p;

            for (let i = 1; i <= this.LOG; i++) {
                this.up[u][i] = this.up[this.up[u][i - 1]][i - 1];
            }

            for (const v of this.adj[u]) {
                if (v !== p) {
                    this.depth[v] = this.depth[u] + 1;
                    stack.push([v, u]);
                }
            }
        }
    }

    /**
     * Returns the lowest common ancestor of two nodes.
     *
     * @param {number} u - First node.
     * @param {number} v - Second node.
     * @returns {number} Lowest common ancestor.
     *
     * @example
     * const lca = new LCA([[], [2], [1]], 1, 2);
     * console.log(lca.getLCA(1, 2)); // 1
     */
    getLCA(u, v) {
        if (this.depth[u] < this.depth[v]) [u, v] = [v, u];

        for (let i = this.LOG; i >= 0; i--) {
            if (this.depth[u] - (1 << i) >= this.depth[v]) {
                u = this.up[u][i];
            }
        }

        if (u === v) return u;

        for (let i = this.LOG; i >= 0; i--) {
            if (this.up[u][i] !== this.up[v][i]) {
                u = this.up[u][i];
                v = this.up[v][i];
            }
        }

        return this.up[u][0];
    }

    /**
     * Returns the number of edges on the path between two nodes.
     *
     * @param {number} u - First node.
     * @param {number} v - Second node.
     * @returns {number} Tree distance in edges.
     *
     * @example
     * const lca = new LCA([[], [2], [1]], 1, 2);
     * console.log(lca.dist(1, 2)); // 1
     */
    dist(u, v) {
        return this.depth[u] + this.depth[v] - 2 * this.depth[this.getLCA(u, v)];
    }
}

module.exports = {
    LCA
};
