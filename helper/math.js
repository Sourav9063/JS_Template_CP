"use strict";

/**
 * Computes the greatest common divisor for Number or BigInt inputs.
 *
 * If either input is BigInt, the result is BigInt. Negative inputs are allowed.
 *
 * @param {number|bigint} a - First value.
 * @param {number|bigint} b - Second value.
 * @returns {number|bigint} Greatest common divisor.
 *
 * @example
 * console.log(gcd(-12, 18)); // 6
 */
const gcd = (a, b) => {
    if (typeof a === "bigint" || typeof b === "bigint") {
        a = BigInt(a);
        b = BigInt(b);
        if (a < 0n) a = -a;
        if (b < 0n) b = -b;
        while (b !== 0n) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
};

/**
 * Computes the least common multiple for Number or BigInt inputs.
 *
 * If either input is BigInt, the result is BigInt.
 *
 * @param {number|bigint} a - First value.
 * @param {number|bigint} b - Second value.
 * @returns {number|bigint} Least common multiple.
 *
 * @example
 * console.log(lcm(4, 6)); // 12
 */
const lcm = (a, b) => {
    if (typeof a === "bigint" || typeof b === "bigint") {
        a = BigInt(a);
        b = BigInt(b);
        if (a === 0n || b === 0n) return 0n;
        return (a / gcd(a, b)) * b;
    }
    if (a === 0 || b === 0) return 0;
    return (a / gcd(a, b)) * b;
};

/**
 * Normalizes x into the range [0, mod).
 *
 * Works with Number or BigInt inputs.
 *
 * @param {number|bigint} x - Value to normalize.
 * @param {number|bigint} mod - Positive modulus.
 * @returns {number|bigint} Normalized value.
 *
 * @example
 * console.log(modNormalize(-1, 5)); // 4
 */
const modNormalize = (x, mod) => {
    if (typeof x === "bigint" || typeof mod === "bigint") {
        x = BigInt(x);
        mod = BigInt(mod);
        x %= mod;
        return x < 0n ? x + mod : x;
    }
    x %= mod;
    return x < 0 ? x + mod : x;
};

/**
 * Computes base^exp mod mod using binary exponentiation.
 *
 * Always returns BigInt.
 *
 * @param {number|bigint|string} base - Base value.
 * @param {number|bigint|string} exp - Non-negative exponent.
 * @param {number|bigint|string} mod - Positive modulus.
 * @returns {bigint} Modular exponentiation result.
 *
 * @example
 * console.log(power(2, 10, 1000)); // 24n
 */
const power = (base, exp, mod) => {
    mod = BigInt(mod);
    let res = 1n;
    base = BigInt(base) % mod;
    exp = BigInt(exp);
    while (exp > 0n) {
        if (exp & 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
};

/**
 * Computes extended Euclidean coefficients.
 *
 * Returns `{ gcd, x, y }` such that `a * x + b * y = gcd`.
 * Always returns BigInt fields.
 *
 * @param {number|bigint|string} a - First value.
 * @param {number|bigint|string} b - Second value.
 * @returns {{gcd: bigint, x: bigint, y: bigint}} GCD and Bezout coefficients.
 *
 * @example
 * const res = extendedGCD(30, 12);
 * console.log(res.gcd); // 6n
 */
const extendedGCD = (a, b) => {
    a = BigInt(a);
    b = BigInt(b);
    if (b === 0n) return { gcd: a, x: 1n, y: 0n };
    const { gcd: g, x: x1, y: y1 } = extendedGCD(b, a % b);
    return { gcd: g, x: y1, y: x1 - (a / b) * y1 };
};

/**
 * Computes modular inverse of a modulo m.
 *
 * Returns null when inverse does not exist.
 *
 * @param {number|bigint|string} a - Value to invert.
 * @param {number|bigint|string} m - Modulus.
 * @returns {bigint|null} Modular inverse, or null.
 *
 * @example
 * console.log(modInverse(3, 11)); // 4n
 */
const modInverse = (a, m) => {
    const { gcd: g, x } = extendedGCD(a, m);
    if (g !== 1n) return null; // Inverse doesn't exist
    return (x % BigInt(m) + BigInt(m)) % BigInt(m);
};

module.exports = {
    gcd,
    lcm,
    modNormalize,
    power,
    extendedGCD,
    modInverse
};
