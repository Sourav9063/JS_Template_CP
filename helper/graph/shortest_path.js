"use strict";

const { PriorityQueue } = require("../ds/priority_queue");

/**
 * Computes single-source shortest paths in a graph with non-negative weights.
 *
 * Assumes nodes are numbered from 1 to n and `adj[u]` contains `[v, weight]`
 * pairs. Unreachable nodes keep distance `Infinity`.
 *
 * @param {number} start - Starting node.
 * @param {Array<Array<[number, number]>>} adj - 1-indexed weighted adjacency list.
 * @param {number} n - Number of nodes.
 * @returns {Array<number>} 1-indexed shortest distance array.
 *
 * @example
 * const adj = [[], [[2, 5], [3, 1]], [[3, 2]], []];
 * const dist = dijkstra(1, adj, 3);
 * console.log(dist[3]); // 1
 */
function dijkstra(start, adj, n) {
    const dist = new Array(n + 1).fill(Infinity);
    const pq = new PriorityQueue((a, b) => a[1] < b[1]);

    dist[start] = 0;
    pq.push([start, 0]);

    while (!pq.empty()) {
        const [u, d] = pq.pop();
        if (d > dist[u]) continue;

        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([v, dist[v]]);
            }
        }
    }

    return dist;
}

/**
 * Computes single-source shortest paths and detects negative cycles.
 *
 * Assumes nodes are numbered from 1 to n. If a negative cycle is reachable from
 * `start`, returns null.
 *
 * @param {number} start - Starting node.
 * @param {Array<[number, number, number]>} edges - Directed edges as `[u, v, weight]`.
 * @param {number} n - Number of nodes.
 * @returns {Array<number>|null} 1-indexed distance array, or null for a negative cycle.
 *
 * @example
 * const edges = [[1, 2, 4], [2, 3, -2], [1, 3, 5]];
 * const dist = bellmanFord(1, edges, 3);
 * console.log(dist[3]); // 2
 */
function bellmanFord(start, edges, n) {
    const dist = new Array(n + 1).fill(Infinity);
    dist[start] = 0;

    for (let i = 0; i < n - 1; i++) {
        let changed = false;
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                changed = true;
            }
        }
        if (!changed) break;
    }

    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            return null;
        }
    }

    return dist;
}

/**
 * Computes all-pairs shortest paths with Floyd-Warshall.
 *
 * Assumes `dist[i][j]` is 0 for i === j, edge weight for direct edges, and
 * `Infinity` when no direct edge exists. The matrix is copied before mutation.
 *
 * @param {Array<Array<number>>} adjMatrix - 1-indexed distance matrix.
 * @param {number} n - Number of nodes.
 * @returns {Array<Array<number>>} 1-indexed all-pairs shortest distance matrix.
 *
 * @example
 * const inf = Infinity;
 * const mat = [[], [0, 0, 3], [0, inf, 0]];
 * const dist = floydWarshall(mat, 2);
 * console.log(dist[1][2]); // 3
 */
function floydWarshall(adjMatrix, n) {
    const dist = adjMatrix.map(row => [...row]);

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }
    }

    return dist;
}

module.exports = {
    dijkstra,
    bellmanFord,
    floydWarshall
};
