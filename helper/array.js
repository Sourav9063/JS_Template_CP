"use strict";

// 2D Array Initialization
const make2D = (r, c, val = 0) => Array.from({ length: r }, () => new Array(c).fill(val));

// Safe Max/Min for large arrays (Avoids Maximum Call Stack Size Exceeded)
const arrayMax = (arr) => arr.reduce((a, b) => (a > b ? a : b));
const arrayMin = (arr) => arr.reduce((a, b) => (a < b ? a : b));

// Prefix sums where pref[i] is the sum of arr[0..i-1].
const prefixSum = (arr) => {
    const pref = new Array(arr.length + 1).fill(0);
    for (let i = 0; i < arr.length; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
    return pref;
};

// Returns sorted unique values and compressed ids for each original value.
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
