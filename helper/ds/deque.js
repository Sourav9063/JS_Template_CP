"use strict";

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

module.exports = {
    Deque
};
