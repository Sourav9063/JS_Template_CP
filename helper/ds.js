"use strict";

// --- O(1) Queue (Replaces std::queue) ---
class Queue {
    constructor() { this.q = []; this.head = 0; }
    push(x) { this.q.push(x); }
    pop() {
        if (this.empty()) return null;
        const res = this.q[this.head++];
        if (this.head * 2 >= this.q.length) {
            this.q = this.q.slice(this.head);
            this.head = 0;
        }
        return res;
    }
    front() { return this.empty() ? null : this.q[this.head]; }
    empty() { return this.head === this.q.length; }
    size() { return this.q.length - this.head; }
    clear() { this.q.length = 0; this.head = 0; }
}

// --- Stack (Replaces std::stack) ---
class Stack {
    constructor() { this.data = []; }
    push(x) { this.data.push(x); }
    pop() { return this.empty() ? null : this.data.pop(); }
    top() { return this.empty() ? null : this.data[this.data.length - 1]; }
    empty() { return this.data.length === 0; }
    size() { return this.data.length; }
    clear() { this.data.length = 0; }
}

// --- Deque (Replaces std::deque) ---
class Deque {
    constructor(capacity = 16) {
        this.data = new Array(Math.max(1, capacity));
        this.head = 0;
        this.len = 0;
    }

    _grow() {
        const old = this.data;
        const n = old.length;
        const next = new Array(n << 1);

        for (let i = 0; i < this.len; i++) {
            next[i] = old[(this.head + i) % n];
        }

        this.data = next;
        this.head = 0;
    }

    push_back(val) {
        if (this.len === this.data.length) this._grow();
        this.data[(this.head + this.len) % this.data.length] = val;
        this.len++;
    }

    push_front(val) {
        if (this.len === this.data.length) this._grow();
        this.head = (this.head - 1 + this.data.length) % this.data.length;
        this.data[this.head] = val;
        this.len++;
    }

    pop_back() {
        if (this.empty()) return null;
        const idx = (this.head + this.len - 1) % this.data.length;
        const val = this.data[idx];
        this.data[idx] = undefined;
        this.len--;
        return val;
    }

    pop_front() {
        if (this.empty()) return null;
        const val = this.data[this.head];
        this.data[this.head] = undefined;
        this.head = (this.head + 1) % this.data.length;
        this.len--;
        return val;
    }

    front() { return this.empty() ? null : this.data[this.head]; }
    back() { return this.empty() ? null : this.data[(this.head + this.len - 1) % this.data.length]; }
    empty() { return this.len === 0; }
    size() { return this.len; }
    clear() { this.data.fill(undefined); this.head = 0; this.len = 0; }
}

// --- Priority Queue (Replaces std::priority_queue) ---
class PriorityQueue {
    constructor(comparator = (a, b) => a < b) { // Default: Min-Heap
        this.heap = [];
        this.comparator = comparator;
    }
    size() { return this.heap.length; }
    empty() { return this.heap.length === 0; }
    peek() { return this.heap[0]; }
    clear() { this.heap.length = 0; }
    push(val) {
        this.heap.push(val);
        this.siftUp(this.size() - 1);
    }
    pop() {
        if (this.empty()) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    siftUp(idx) {
        while (idx > 0) {
            let p = (idx - 1) >> 1;
            if (this.comparator(this.heap[idx], this.heap[p])) {
                [this.heap[idx], this.heap[p]] = [this.heap[p], this.heap[idx]];
                idx = p;
            } else break;
        }
    }
    siftDown(idx) {
        while (true) {
            let l = (idx << 1) + 1, r = (idx << 1) + 2, s = idx;
            if (l < this.size() && this.comparator(this.heap[l], this.heap[s])) s = l;
            if (r < this.size() && this.comparator(this.heap[r], this.heap[s])) s = r;
            if (s === idx) break;
            [this.heap[idx], this.heap[s]] = [this.heap[s], this.heap[idx]];
            idx = s;
        }
    }
}

let treapSeed = 123456789;
function nextTreapPriority() {
    treapSeed = (treapSeed * 1664525 + 1013904223) >>> 0;
    return treapSeed;
}

class TreapNode {
    constructor(key) {
        this.key = key;
        this.priority = nextTreapPriority();
        this.cnt = 1;
        this.size = 1;
        this.left = null;
        this.right = null;
    }
}

// --- Ordered Multiset (Replaces std::multiset for ordered operations) ---
class OrderedMultiSet {
    constructor(comparator = (a, b) => a - b) {
        this.root = null;
        this.comparator = comparator;
    }

    _size(node) { return node ? node.size : 0; }

    _update(node) {
        if (node) node.size = node.cnt + this._size(node.left) + this._size(node.right);
        return node;
    }

    _rotateRight(node) {
        const left = node.left;
        node.left = left.right;
        left.right = this._update(node);
        return this._update(left);
    }

    _rotateLeft(node) {
        const right = node.right;
        node.right = right.left;
        right.left = this._update(node);
        return this._update(right);
    }

    _merge(left, right) {
        if (!left || !right) return left || right;

        if (left.priority > right.priority) {
            left.right = this._merge(left.right, right);
            return this._update(left);
        }

        right.left = this._merge(left, right.left);
        return this._update(right);
    }

    _insert(node, key) {
        if (!node) return new TreapNode(key);

        const cmp = this.comparator(key, node.key);
        if (cmp === 0) {
            node.cnt++;
        } else if (cmp < 0) {
            node.left = this._insert(node.left, key);
            if (node.left.priority > node.priority) node = this._rotateRight(node);
        } else {
            node.right = this._insert(node.right, key);
            if (node.right.priority > node.priority) node = this._rotateLeft(node);
        }

        return this._update(node);
    }

    _delete(node, key) {
        if (!node) return null;

        const cmp = this.comparator(key, node.key);
        if (cmp === 0) {
            if (node.cnt > 1) {
                node.cnt--;
                return this._update(node);
            }
            return this._merge(node.left, node.right);
        }

        if (cmp < 0) node.left = this._delete(node.left, key);
        else node.right = this._delete(node.right, key);
        return this._update(node);
    }

    add(key) {
        this.root = this._insert(this.root, key);
    }

    delete(key) {
        if (!this.has(key)) return false;
        this.root = this._delete(this.root, key);
        return true;
    }

    has(key) {
        let node = this.root;

        while (node) {
            const cmp = this.comparator(key, node.key);
            if (cmp === 0) return true;
            node = cmp < 0 ? node.left : node.right;
        }

        return false;
    }

    count(key) {
        let node = this.root;

        while (node) {
            const cmp = this.comparator(key, node.key);
            if (cmp === 0) return node.cnt;
            node = cmp < 0 ? node.left : node.right;
        }

        return 0;
    }

    lowerBound(key) {
        let node = this.root;
        let answer = null;

        while (node) {
            if (this.comparator(node.key, key) >= 0) {
                answer = node.key;
                node = node.left;
            } else {
                node = node.right;
            }
        }

        return answer;
    }

    upperBound(key) {
        let node = this.root;
        let answer = null;

        while (node) {
            if (this.comparator(node.key, key) > 0) {
                answer = node.key;
                node = node.left;
            } else {
                node = node.right;
            }
        }

        return answer;
    }

    countLessThan(key) {
        let node = this.root;
        let count = 0;

        while (node) {
            if (this.comparator(node.key, key) < 0) {
                count += this._size(node.left) + node.cnt;
                node = node.right;
            } else {
                node = node.left;
            }
        }

        return count;
    }

    countLessOrEqual(key) {
        let node = this.root;
        let count = 0;

        while (node) {
            if (this.comparator(node.key, key) <= 0) {
                count += this._size(node.left) + node.cnt;
                node = node.right;
            } else {
                node = node.left;
            }
        }

        return count;
    }

    kth(k) {
        let node = this.root;

        while (node) {
            const leftSize = this._size(node.left);
            if (k < leftSize) {
                node = node.left;
            } else if (k < leftSize + node.cnt) {
                return node.key;
            } else {
                k -= leftSize + node.cnt;
                node = node.right;
            }
        }

        return null;
    }

    first() {
        let node = this.root;
        if (!node) return null;
        while (node.left) node = node.left;
        return node.key;
    }

    last() {
        let node = this.root;
        if (!node) return null;
        while (node.right) node = node.right;
        return node.key;
    }

    size() { return this._size(this.root); }
    empty() { return this.root === null; }
    clear() { this.root = null; }
}

// --- Ordered Set (Replaces std::set for ordered operations) ---
class OrderedSet extends OrderedMultiSet {
    add(key) {
        if (!this.has(key)) this.root = this._insert(this.root, key);
    }
}

// --- Disjoint Set Union (DSU) ---
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

// --- Fenwick Tree / Binary Indexed Tree (1-indexed) ---
class BIT {
    constructor(n) { this.tree = new Array(n + 1).fill(0); }
    add(i, delta) {
        for (; i < this.tree.length; i += i & -i) this.tree[i] += delta;
    }
    query(i) {
        let sum = 0;
        for (; i > 0; i -= i & -i) sum += this.tree[i];
        return sum;
    }
    rangeQuery(l, r) { return this.query(r) - this.query(l - 1); }
    lowerBound(target) {
        let idx = 0;
        let bit = 1;
        while ((bit << 1) < this.tree.length) bit <<= 1;

        for (; bit > 0; bit >>= 1) {
            const next = idx + bit;
            if (next < this.tree.length && this.tree[next] < target) {
                idx = next;
                target -= this.tree[next];
            }
        }

        return idx + 1;
    }
}

module.exports = {
    Queue,
    Stack,
    Deque,
    PriorityQueue,
    OrderedSet,
    OrderedMultiSet,
    DSU,
    BIT
};
