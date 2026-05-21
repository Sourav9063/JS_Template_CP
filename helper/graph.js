"use strict";

const { Queue } = require("./ds/queue");
const { PriorityQueue } = require("./ds/priority_queue");
const { DSU } = require("./ds/dsu");

/**
 * Breadth-First Search (BFS) for unweighted graphs.
 * @param {number} start - Starting node.
 * @param {Array<Array<number>>} adj - Adjacency list.
 * @param {number} n - Number of nodes.
 * @returns {Array<number>} - Distances from start (-1 if unreachable).
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

/**
 * Depth-First Search (DFS) implementation.
 * @param {number} u - Current node.
 * @param {Array<Array<number>>} adj - Adjacency list.
 * @param {Array<boolean>} visited - Visited array.
 * @param {Array<number>} traversal - Order of visited nodes.
 */
function dfs(u, adj, visited, traversal = []) {
    const stack = [u];

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

/**
 * Dijkstra's Algorithm for weighted graphs (non-negative weights).
 * @param {number} start - Starting node.
 * @param {Array<Array<[number, number]>>} adj - Adjacency list [[node, weight], ...].
 * @param {number} n - Number of nodes.
 * @returns {Array<number>} - Shortest distances from start (Infinity if unreachable).
 */
function dijkstra(start, adj, n) {
    const dist = new Array(n + 1).fill(Infinity);
    const pq = new PriorityQueue((a, b) => a[1] < b[1]); // Min-heap based on distance
    
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
 * Bellman-Ford Algorithm (Handles negative weights, detects negative cycles).
 * @param {number} start - Starting node.
 * @param {Array<[number, number, number]>} edges - Edge list [[u, v, w], ...].
 * @param {number} n - Number of nodes.
 * @returns {Array<number>|null} - Shortest distances or null if negative cycle detected.
 */
function bellmanFord(start, edges, n) {
    const dist = new Array(n + 1).fill(Infinity);
    dist[start] = 0;
    
    // Relax edges n-1 times
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
    
    // Check for negative cycles
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            return null; // Negative cycle detected
        }
    }
    
    return dist;
}

/**
 * Floyd-Warshall Algorithm (All-pairs shortest path).
 * @param {Array<Array<number>>} adjMatrix - Adjacency matrix (Infinity for no edge).
 * @param {number} n - Number of nodes.
 * @returns {Array<Array<number>>} - Distance matrix.
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

/**
 * Topological Sort (Kahn's Algorithm).
 * @param {Array<Array<number>>} adj - Adjacency list (Directed Graph).
 * @param {number} n - Number of nodes.
 * @returns {Array<number>|null} - Topological order or null if cycle detected.
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

/**
 * Kruskal's Algorithm for MST.
 * @param {number} n - Number of nodes.
 * @param {Array<[number, number, number]>} edges - Edge list [[u, v, w], ...].
 * @returns {{mstWeight: number, mstEdges: Array<[number, number, number]>}}
 */
function kruskal(n, edges) {
    edges.sort((a, b) => a[2] - b[2]); // Sort by weight
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

/**
 * Lowest Common Ancestor (LCA) using Binary Lifting.
 * Preprocessing: O(N log N), Query: O(log N).
 */
class LCA {
    /**
     * @param {Array<Array<number>>} adj - Adjacency list (Tree).
     * @param {number} root - Root of the tree.
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

    getLCA(u, v) {
        if (this.depth[u] < this.depth[v]) [u, v] = [v, u];
        
        // Lift u to same depth as v
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

    dist(u, v) {
        return this.depth[u] + this.depth[v] - 2 * this.depth[this.getLCA(u, v)];
    }
}

module.exports = {
    bfs,
    dfs,
    dijkstra,
    bellmanFord,
    floydWarshall,
    topologicalSort,
    kruskal,
    LCA
};
