"use strict";

// --- Binary Search (Replaces std::lower_bound & std::upper_bound) ---
const lowerBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return l;
};

const upperBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] > target) r = mid;
        else l = mid + 1;
    }
    return l;
};

const binarySearchFirstTrue = (lo, hi, predicate) => {
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (predicate(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};

const binarySearchLastTrue = (lo, hi, predicate) => {
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (predicate(mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
};

module.exports = {
    lowerBound,
    upperBound,
    binarySearchFirstTrue,
    binarySearchLastTrue
};
