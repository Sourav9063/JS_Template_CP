"use strict";

const { DSU } = require("../ds/dsu");

/**
 * Computes a minimum spanning tree with Kruskal's algorithm.
 *
 * Assumes an undirected graph with nodes numbered from 1 to n. The `edges`
 * array is sorted in place by weight.
 *
 * @param {number} n - Number of nodes.
 * @param {Array<[number, number, number]>} edges - Edges as `[u, v, weight]`.
 * @returns {{mstWeight: number, mstEdges: Array<[number, number, number]>}} MST result.
 *
 * @example
 * const edges = [[1, 2, 5], [2, 3, 4], [1, 3, 10]];
 * const { mstWeight } = kruskal(3, edges);
 * console.log(mstWeight); // 9
 */
function kruskal(n, edges) {
    edges.sort((a, b) => a[2] - b[2]);
    const dsu = new DSU(n);
    let mstWeight = 0;
    const mstEdges = [];

    for (const [u, v, w] of edges) {
        if (dsu.union(u, v)) {
            mstWeight += w;
            mstEdges.push([u, v, w]);
        }
    }

    if (mstEdges.length !== n - 1) return { mstWeight: -1, mstEdges: [] };
    return { mstWeight, mstEdges };
}

module.exports = {
    kruskal
};
