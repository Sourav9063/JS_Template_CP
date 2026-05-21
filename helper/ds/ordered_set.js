"use strict";

const { OrderedMultiSet } = require("./ordered_multiset");

/**
 * Ordered set with unique keys, similar to C++ std::set.
 *
 * Inherits ordered queries from OrderedMultiSet, but `add` keeps only one
 * occurrence of each key.
 *
 * @example
 * const s = new OrderedSet();
 * s.add(5);
 * s.add(5);
 * s.add(2);
 * console.log(s.size()); // 2
 * console.log(s.lowerBound(3)); // 5
 */
class OrderedSet extends OrderedMultiSet {
    add(key) {
        if (!this.has(key)) this.root = this._insert(this.root, key);
    }
}

module.exports = {
    OrderedSet
};
