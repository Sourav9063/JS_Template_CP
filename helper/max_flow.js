"use strict";

const { Queue } = require("./ds/queue");

/**
 * Dinic's Algorithm for Maximum Flow.
 * Time Complexity: O(V^2 * E), typically much faster.
 * O(E * sqrt(V)) for unit networks.
 */
class Dinic {
    constructor(n) {
        this.n = n;
        this.edges = [];
        this.adj = Array.from({ length: n + 1 }, () => []);
        this.level = new Array(n + 1).fill(-1);
        this.ptr = new Array(n + 1).fill(0);
    }

    addEdge(u, v, cap) {
        this.adj[u].push(this.edges.length);
        this.edges.push({ u, v, cap, flow: 0 });
        this.adj[v].push(this.edges.length);
        this.edges.push({ u: v, v: u, cap: 0, flow: 0 }); // Residual edge
    }

    bfs(s, t) {
        this.level.fill(-1);
        this.level[s] = 0;
        const q = new Queue();
        q.push(s);
        
        while (!q.empty()) {
            const u = q.pop();
            for (const id of this.adj[u]) {
                const { v, cap, flow } = this.edges[id];
                if (cap - flow > 0 && this.level[v] === -1) {
                    this.level[v] = this.level[u] + 1;
                    q.push(v);
                }
            }
        }
        return this.level[t] !== -1;
    }

    dfs(u, t, pushed) {
        if (pushed === 0 || u === t) return pushed;
        
        for (let cid = this.ptr[u]; cid < this.adj[u].length; cid++) {
            this.ptr[u] = cid; // Update pointer to avoid reprocessing edges
            const id = this.adj[u][cid];
            const { v, cap, flow } = this.edges[id];
            
            if (this.level[v] !== this.level[u] + 1 || cap - flow === 0) continue;
            
            const tr = this.dfs(v, t, Math.min(pushed, cap - flow));
            if (tr === 0) continue;
            
            this.edges[id].flow += tr;
            this.edges[id ^ 1].flow -= tr;
            return tr;
        }
        return 0;
    }

    maxFlow(s, t) {
        let flow = 0;
        while (this.bfs(s, t)) {
            this.ptr.fill(0);
            while (true) {
                const pushed = this.dfs(s, t, Infinity);
                if (pushed === 0) break;
                flow += pushed;
            }
        }
        return flow;
    }
}

module.exports = {
    Dinic
};
