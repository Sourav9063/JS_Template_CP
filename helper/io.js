"use strict";

const fs = require("fs");

const buffer = fs.readFileSync(0);
const inputLength = buffer.length;
let offset = 0;

/**
 * Reads the next whitespace-delimited token as a JavaScript string.
 *
 * @returns {string|null} Next token, or null at EOF.
 *
 * @example
 * const name = readNext(); // input token: alice
 */
function readNext() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] > 32) offset++;

    return buffer.toString("utf8", start, offset);
}

/**
 * Reads the next whitespace-delimited token as a Buffer slice.
 *
 * Use this for byte-level string work to avoid UTF-8 conversion.
 *
 * @returns {Buffer|null} Next token buffer, or null at EOF.
 *
 * @example
 * const s = readToken(); // input token: 123
 * console.log(s[0]); // 49, the ASCII code for '1'
 */
function readToken() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] > 32) offset++;

    return buffer.subarray(start, offset);
}

/**
 * Reads the current remaining line as a JavaScript string.
 *
 * Leading newline characters are skipped before reading the line.
 *
 * @returns {string|null} Line content without newline, or null at EOF.
 *
 * @example
 * const sentence = readLine(); // input line: hello world
 */
function readLine() {
    while (offset < inputLength && (buffer[offset] === 10 || buffer[offset] === 13)) {
        offset++;
    }
    if (offset >= inputLength) return null;

    const start = offset;
    while (offset < inputLength && buffer[offset] !== 10 && buffer[offset] !== 13) {
        offset++;
    }

    return buffer.toString("utf8", start, offset);
}

function readUInt() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    let value = 0;
    while (offset < inputLength) {
        const c = buffer[offset];
        if (c <= 32) break;
        value = value * 10 + c - 48;
        offset++;
    }

    return value;
}

function readInt() {
    while (offset < inputLength && buffer[offset] <= 32) offset++;
    if (offset >= inputLength) return null;

    let value = 0;
    let sign = 1;
    if (buffer[offset] === 45) {
        sign = -1;
        offset++;
    }

    while (offset < inputLength) {
        const c = buffer[offset];
        if (c <= 32) break;
        value = value * 10 + c - 48;
        offset++;
    }

    return value * sign;
}

/**
 * Reads the next integer as a BigInt.
 *
 * Use for values outside Number.MAX_SAFE_INTEGER.
 *
 * @returns {bigint|null} Parsed BigInt, or null at EOF.
 *
 * @example
 * const n = readBigInt();
 */
function readBigInt() {
    const word = readNext();
    return word === null ? null : BigInt(word);
}

module.exports = {
    readNext,
    readToken,
    readLine,
    readUInt,
    readInt,
    readBigInt
};
