"use strict";

// 2D Array Initialization
const make2D = (r, c, val = 0) => Array.from({ length: r }, () => new Array(c).fill(val));

// Safe Max/Min for large arrays (Avoids Maximum Call Stack Size Exceeded)
const arrayMax = (arr) => arr.reduce((a, b) => (a > b ? a : b));
const arrayMin = (arr) => arr.reduce((a, b) => (a < b ? a : b));

module.exports = {
    make2D,
    arrayMax,
    arrayMin
};
