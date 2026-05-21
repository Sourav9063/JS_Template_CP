"use strict";

/**
 * O(1) amortized FIFO queue, similar to C++ std::queue.
 *
 * @example
 * const q = new Queue();
 * q.push(10);
 * q.push(20);
 * console.log(q.pop()); // 10
 */
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

module.exports = {
    Queue
};
