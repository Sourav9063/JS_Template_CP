"use strict";

/**
 * Creates a 2D array filled with the same initial value.
 *
 * @param {number} r - Number of rows.
 * @param {number} c - Number of columns.
 * @param {*} [val=0] - Initial value for every cell.
 * @returns {Array<Array<*>>} A new r by c matrix.
 *
 * @example
 * const grid = make2D(2, 3, -1);
 * console.log(grid[0][2]); // -1
 */
const make2D = (r, c, val = 0) => Array.from({ length: r }, () => new Array(c).fill(val));

const arrayMax = (arr) => arr.reduce((a, b) => (a > b ? a : b));

const arrayMin = (arr) => arr.reduce((a, b) => (a < b ? a : b));

/**
 * Builds prefix sums where pref[i] is the sum of arr[0..i-1].
 *
 * @param {Array<number>} arr - Numeric array.
 * @returns {Array<number>} Prefix sum array of length arr.length + 1.
 *
 * @example
 * const pref = prefixSum([2, 4, 6]);
 * console.log(pref[3] - pref[1]); // 10
 */
const prefixSum = (arr) => {
    const pref = new Array(arr.length + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
    return pref;
};

/**
 * Compresses numeric coordinates into sorted zero-based ids.
 *
 * @param {Array<number>} arr - Values to compress.
 * @returns {{values: Array<number>, compressed: Array<number>, id: Map<number, number>}} Compression data.
 *
 * @example
 * const cc = coordinateCompress([10, 5, 10]);
 * console.log(cc.values); // [5, 10]
 * console.log(cc.compressed); // [1, 0, 1]
 */
const coordinateCompress = (arr) => {
    const values = [...new Set(arr)].sort((a, b) => a - b);
    const id = new Map();

    for (let i = 0; i < values.length; i++) {
        id.set(values[i], i);
    }

    return {
        values,
        compressed: arr.map(x => id.get(x)),
        id
    };
};

module.exports = {
    make2D,
    arrayMax,
    arrayMin,
    prefixSum,
    coordinateCompress
};
