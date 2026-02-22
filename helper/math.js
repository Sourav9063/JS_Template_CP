"use strict";

const gcd = (a, b) => b === 0n || b === 0 ? a : gcd(b, a % b);
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

module.exports = {
    gcd,
    lcm,
    power
};
