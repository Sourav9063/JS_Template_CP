"use strict";

const { Queue } = require("../ds/queue");

/**
 * Returns a topological order for a directed acyclic graph using Kahn's algorithm.
 *
 * Assumes nodes are numbered from 1 to n and `adj[u]` contains outgoing
 * neighbors. Returns null when the graph contains a cycle.
 *
 * @param {Array<Array<number>>} adj - 1-indexed directed adjacency list.
 * @param {number} n - Number of nodes.
 * @returns {Array<number>|null} Topological order, or null if a cycle exists.
 *
 * @example
 * const adj = [[], [2, 3], [3], []];
 * console.log(topologicalSort(adj, 3)); // [1, 2, 3]
 */
function topologicalSort(adj, n) {
    const inDegree = new Array(n + 1).fill(0);

    for (let u = 1; u <= n; u++) {
        for (const v of adj[u]) {
            inDegree[v]++;
        }
    }

    const q = new Queue();
    for (let i = 1; i <= n; i++) {
        if (inDegree[i] === 0) q.push(i);
    }

    const order = [];
    while (!q.empty()) {
        const u = q.pop();
        order.push(u);

        for (const v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) q.push(v);
        }
    }

    return order.length === n ? order : null;
}

module.exports = {
    topologicalSort
};
