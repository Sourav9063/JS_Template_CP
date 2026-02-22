"use strict";

/**
 * Knuth-Morris-Pratt (KMP) Algorithm.
 * Returns the starting indices of all occurrences of pat in txt.
 * @param {string} txt 
 * @param {string} pat 
 * @returns {Array<number>}
 */
function kmpSearch(txt, pat) {
    const m = pat.length;
    const n = txt.length;
    const lps = computeLPSArray(pat);
    const result = [];
    
    let i = 0; // index for txt
    let j = 0; // index for pat
    while (i < n) {
        if (pat[j] === txt[i]) {
            j++;
            i++;
        }
        if (j === m) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pat[j] !== txt[i]) {
            if (j !== 0) j = lps[j - 1];
            else i++;
        }
    }
    return result;
}

function computeLPSArray(pat) {
    const m = pat.length;
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;
    while (i < m) {
        if (pat[i] === pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) len = lps[len - 1];
            else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

/**
 * Z-Algorithm.
 * Computes the Z-array where Z[i] is the length of the longest common prefix
 * between the suffix of S starting at i and the prefix of S.
 * @param {string} s 
 * @returns {Array<number>}
 */
function zFunction(s) {
    const n = s.length;
    const z = new Array(n).fill(0);
    for (let i = 1, l = 0, r = 0; i < n; i++) {
        if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}

/**
 * Trie Implementation.
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) node.children[char] = new TrieNode();
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
    
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }
    
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return true;
    }
}

/**
 * Rolling Hash for String Matching.
 * Uses BigInt for robustness.
 * Default MOD = 1e9 + 9, BASE = 31.
 */
class RollingHash {
    constructor(s, base = 31n, mod = 1000000009n) {
        this.mod = BigInt(mod);
        this.base = BigInt(base);
        this.n = s.length;
        this.hash = new BigInt64Array(this.n + 1); // 0-indexed prefix hash
        this.power = new BigInt64Array(this.n + 1);
        
        this.hash[0] = 0n;
        this.power[0] = 1n;
        
        for (let i = 0; i < this.n; i++) {
            this.hash[i + 1] = (this.hash[i] * this.base + BigInt(s.charCodeAt(i))) % this.mod;
            this.power[i + 1] = (this.power[i] * this.base) % this.mod;
        }
    }
    
    /**
     * Get hash of substring s[l...r] (0-indexed, inclusive).
     * @param {number} l 
     * @param {number} r 
     * @returns {bigint}
     */
    getHash(l, r) {
        let res = (this.hash[r + 1] - this.hash[l] * this.power[r - l + 1]) % this.mod;
        if (res < 0n) res += this.mod;
        return res;
    }
}

/**
 * Manacher's Algorithm.
 * Returns { d1, d2 } where:
 * d1[i] = radius of odd-length palindrome centered at i. (len = 2*d1[i] - 1)
 * d2[i] = radius of even-length palindrome centered at i-1 and i. (len = 2*d2[i])
 */
function manacher(s) {
    const n = s.length;
    const d1 = new Array(n).fill(0);
    const d2 = new Array(n).fill(0);
    
    // Odd length palindromes
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 1 : Math.min(d1[l + r - i], r - i + 1);
        while (0 <= i - k && i + k < n && s[i - k] === s[i + k]) k++;
        d1[i] = k--;
        if (i + k > r) { l = i - k; r = i + k; }
    }
    
    // Even length palindromes
    for (let i = 0, l = 0, r = -1; i < n; i++) {
        let k = (i > r) ? 0 : Math.min(d2[l + r - i + 1], r - i + 1);
        while (0 <= i - k - 1 && i + k < n && s[i - k - 1] === s[i + k]) k++;
        d2[i] = k--;
        if (i + k > r) { l = i - k - 1; r = i + k; }
    }
    return { d1, d2 };
}

module.exports = {
    kmpSearch,
    zFunction,
    Trie,
    RollingHash,
    manacher
};
