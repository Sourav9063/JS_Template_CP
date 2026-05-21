"use strict";

/**
 * Returns the first index where arr[index] >= target.
 *
 * @param {Array<number>} arr - Sorted array.
 * @param {number} target - Target value.
 * @returns {number} Insertion index in [0, arr.length].
 *
 * @example
 * console.log(lowerBound([1, 3, 3, 7], 3)); // 1
 */
const lowerBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] >= target) r = mid;
        else l = mid + 1;
    }
    return l;
};

/**
 * Returns the first index where arr[index] > target.
 *
 * @param {Array<number>} arr - Sorted array.
 * @param {number} target - Target value.
 * @returns {number} Insertion index in [0, arr.length].
 *
 * @example
 * console.log(upperBound([1, 3, 3, 7], 3)); // 3
 */
const upperBound = (arr, target) => {
    let l = 0, r = arr.length;
    while (l < r) {
        let mid = (l + r) >> 1;
        if (arr[mid] > target) r = mid;
        else l = mid + 1;
    }
    return l;
};

/**
 * Finds the first value in [lo, hi] where predicate(value) is true.
 *
 * Predicate must be monotonic: false...false, true...true.
 *
 * @param {number} lo - Lower inclusive bound.
 * @param {number} hi - Upper inclusive candidate bound.
 * @param {(value: number) => boolean} predicate - Monotonic predicate.
 * @returns {number} First true position.
 *
 * @example
 * console.log(binarySearchFirstTrue(0, 10, x => x * x >= 30)); // 6
 */
const binarySearchFirstTrue = (lo, hi, predicate) => {
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (predicate(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
};

/**
 * Finds the last value in [lo, hi] where predicate(value) is true.
 *
 * Predicate must be monotonic: true...true, false...false.
 *
 * @param {number} lo - Lower inclusive bound.
 * @param {number} hi - Upper inclusive bound.
 * @param {(value: number) => boolean} predicate - Monotonic predicate.
 * @returns {number} Last true position.
 *
 * @example
 * console.log(binarySearchLastTrue(0, 10, x => x * x <= 30)); // 5
 */
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
