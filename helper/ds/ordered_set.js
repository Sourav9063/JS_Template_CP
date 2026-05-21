"use strict";

const { OrderedMultiSet } = require("./ordered_multiset");

// --- Ordered Set (Replaces std::set for ordered operations) ---
class OrderedSet extends OrderedMultiSet {
    add(key) {
        if (!this.has(key)) this.root = this._insert(this.root, key);
    }
}

module.exports = {
    OrderedSet
};
