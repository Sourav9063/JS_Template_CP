"use strict";

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

/**
 * Ordered multiset with duplicate keys, similar to C++ std::multiset.
 *
 * Supports expected O(log n) insertion, deletion, lower/upper bound, rank,
 * and kth-element queries.
 *
 * @example
 * const ms = new OrderedMultiSet();
 * [5, 1, 3, 3].forEach(x => ms.add(x));
 * console.log(ms.count(3)); // 2
 * console.log(ms.lowerBound(4)); // 5
 * console.log(ms.kth(2)); // 3
 */
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

module.exports = {
    OrderedMultiSet
};
