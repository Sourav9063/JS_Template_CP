"use strict";

const { gcd, lcm, power } = require("./math");

/**
 * Generates all primes up to n with the Sieve of Eratosthenes.
 *
 * @param {number} n - Inclusive upper bound.
 * @returns {Array<number>} Prime numbers <= n.
 *
 * @example
 * console.log(sieve(10)); // [2, 3, 5, 7]
 */
function sieve(n) {
    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;
    for (let p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (let i = p * p; i <= n; i += p) isPrime[i] = false;
        }
    }
    const primes = [];
    for (let p = 2; p <= n; p++) {
        if (isPrime[p]) primes.push(p);
    }
    return primes;
}

/**
 * Factorizes n into prime powers.
 *
 * @param {number} n - Positive integer.
 * @returns {Map<number, number>} Map from prime factor to exponent.
 *
 * @example
 * const factors = primeFactors(12);
 * console.log(factors.get(2)); // 2
 * console.log(factors.get(3)); // 1
 */
function primeFactors(n) {
    const factors = new Map();
    while (n % 2 === 0) {
        factors.set(2, (factors.get(2) || 0) + 1);
        n /= 2;
    }
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            factors.set(i, (factors.get(i) || 0) + 1);
            n /= i;
        }
    }
    if (n > 2) factors.set(n, (factors.get(n) || 0) + 1);
    return factors;
}

/**
 * Precomputes factorials and inverse factorials for nCr modulo a prime.
 *
 * Uses BigInt internally and assumes `mod` is prime for Fermat inverse.
 *
 * @example
 * const comb = new Combinatorics(5, 1000000007n);
 * console.log(comb.nCr(5, 2)); // 10n
 */
class Combinatorics {
    constructor(n, mod) {
        this.mod = BigInt(mod);
        this.fact = new Array(n + 1);
        this.invFact = new Array(n + 1);
        this.fact[0] = 1n;
        this.invFact[0] = 1n;
        
        for (let i = 1; i <= n; i++) {
            this.fact[i] = (this.fact[i - 1] * BigInt(i)) % this.mod;
        }
        this.invFact[n] = power(this.fact[n], this.mod - 2n, this.mod);
        for (let i = n - 1; i >= 1; i--) {
            this.invFact[i] = (this.invFact[i + 1] * BigInt(i + 1)) % this.mod;
        }
    }

    nCr(n, r) {
        if (r < 0 || r > n) return 0n;
        return (((this.fact[n] * this.invFact[r]) % this.mod) * this.invFact[n - r]) % this.mod;
    }
}

module.exports = {
    sieve,
    primeFactors,
    Combinatorics
};
