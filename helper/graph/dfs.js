"use strict";

/**
 * Traverses a graph component using iterative DFS.
 *
 * Assumes nodes are numbered from 1 to n and `adj[u]` contains neighbors of u.
 * The provided `visited` array is mutated, which makes repeated component
 * traversals cheap in connected-components problems.
 *
 * @param {number} start - Starting node.
 * @param {Array<Array<number>>} adj - 1-indexed adjacency list.
 * @param {Array<boolean>} visited - Visited marker array.
 * @param {Array<number>} [traversal=[]] - Optional output array to append order into.
 * @returns {Array<number>} DFS visitation order.
 *
 * @example
 * const adj = [[], [2, 3], [1], [1]];
 * const visited = new Array(4).fill(false);
 * console.log(dfs(1, adj, visited)); // [1, 2, 3]
 */
function dfs(start, adj, visited, traversal = []) {
    const stack = [start];

    while (stack.length) {
        const node = stack.pop();
        if (visited[node]) continue;

        visited[node] = true;
        traversal.push(node);

        for (let i = adj[node].length - 1; i >= 0; i--) {
            const v = adj[node][i];
            if (!visited[v]) stack.push(v);
        }
    }

    return traversal;
}

module.exports = {
    dfs
};
