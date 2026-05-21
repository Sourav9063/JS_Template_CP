"use strict";

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

// Modular Exponentiation (base^exp % mod)
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
    modNormalize,
    power,
    extendedGCD,
    modInverse
};
