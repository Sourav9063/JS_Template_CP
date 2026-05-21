"use strict";

const { Queue } = require("../ds/queue");

/**
 * Computes shortest unweighted distances from a start node using BFS.
 *
 * Assumes nodes are numbered from 1 to n and `adj[u]` contains neighbors of u.
 * Unreachable nodes keep distance -1.
 *
 * @param {number} start - Starting node.
 * @param {Array<Array<number>>} adj - 1-indexed adjacency list.
 * @param {number} n - Number of nodes.
 * @returns {Array<number>} 1-indexed distance array where dist[start] is 0.
 *
 * @example
 * const adj = [[], [2, 3], [1], [1]];
 * const dist = bfs(1, adj, 3);
 * console.log(dist[2]); // 1
 */
function bfs(start, adj, n) {
    const dist = new Array(n + 1).fill(-1);
    const q = new Queue();

    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        const u = q.pop();
        for (const v of adj[u]) {
            if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }

    return dist;
}

module.exports = {
    bfs
};
