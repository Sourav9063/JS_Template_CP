"use strict";

/**
 * LIFO stack, similar to C++ std::stack.
 *
 * @example
 * const st = new Stack();
 * st.push(1);
 * st.push(2);
 * console.log(st.top()); // 2
 */
class Stack {
    constructor() { this.data = []; }
    push(x) { this.data.push(x); }
    pop() { return this.empty() ? null : this.data.pop(); }
    top() { return this.empty() ? null : this.data[this.data.length - 1]; }
    empty() { return this.data.length === 0; }
    size() { return this.data.length; }
    clear() { this.data.length = 0; }
}

module.exports = {
    Stack
};
