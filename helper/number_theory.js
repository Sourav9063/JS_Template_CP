"use strict";

const { gcd, lcm, power } = require("./math");

/**
 * Sieve of Eratosthenes.
 * Generates all primes up to n.
 * @param {number} n 
 * @returns {Array<number>}
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
 * Prime Factorization.
 * Returns map of prime factors and their powers.
 * @param {number} n 
 * @returns {Map<number, number>}
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
 * Combinatorics (nCr).
 * Precomputes factorials for O(1) queries modulo m.
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
