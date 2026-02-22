"use strict";

const gcd = (a, b) => {
    if (typeof a === 'bigint' || typeof b === 'bigint') {
        a = BigInt(a);
        b = BigInt(b);
        return b === 0n ? a : gcd(b, a % b);
    }
    return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a, b) => (a / gcd(a, b)) * b;

// Modular Exponentiation (base^exp % mod)
const power = (base, exp, mod) => {
    let res = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % BigInt(mod);
        base = (base * base) % BigInt(mod);
        exp /= 2n;
    }
    return res;
};

// Extended Euclidean Algorithm
// Returns { gcd, x, y } such that ax + by = gcd
const extendedGCD = (a, b) => {
    a = BigInt(a);
    b = BigInt(b);
    if (b === 0n) return { gcd: a, x: 1n, y: 0n };
    const { gcd: g, x: x1, y: y1 } = extendedGCD(b, a % b);
    return { gcd: g, x: y1, y: x1 - (a / b) * y1 };
};

// Modular Inverse (a^-1 % m)
const modInverse = (a, m) => {
    const { gcd: g, x } = extendedGCD(a, m);
    if (g !== 1n) return null; // Inverse doesn't exist
    return (x % BigInt(m) + BigInt(m)) % BigInt(m);
};

module.exports = {
    gcd,
    lcm,
    power,
    extendedGCD,
    modInverse
};
