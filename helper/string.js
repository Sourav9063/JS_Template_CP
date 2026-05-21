"use strict";

/**
 * Finds all occurrences of a pattern using Knuth-Morris-Pratt.
 *
 * @param {string} txt - Text to search in.
 * @param {string} pat - Pattern to search for.
 * @returns {Array<number>} Starting indices of all matches.
 *
 * @example
 * console.log(kmpSearch("ababa", "aba")); // [0, 2]
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
 * Computes the Z-array of a string.
 *
 * z[i] is the longest common prefix length of s and s.slice(i).
 *
 * @param {string} s - Input string.
 * @returns {Array<number>} Z-array.
 *
 * @example
 * console.log(zFunction("aaab")); // [0, 2, 1, 0]
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

class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

/**
 * Prefix tree for string insertion and lookup.
 *
 * @example
 * const trie = new Trie();
 * trie.insert("code");
 * console.log(trie.search("code")); // true
 * console.log(trie.startsWith("co")); // true
 */
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
 *
 * Uses BigInt for robustness.
 * Default MOD = 1e9 + 9, BASE = 31.
 *
 * @example
 * const rh = new RollingHash("ababa");
 * console.log(rh.getHash(0, 1) === rh.getHash(2, 3)); // true
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
     * Returns hash of substring s[l..r], inclusive.
     *
     * @param {number} l - Left index, 0-based.
     * @param {number} r - Right index, 0-based.
     * @returns {bigint} Substring hash.
     */
    getHash(l, r) {
        let res = (this.hash[r + 1] - this.hash[l] * this.power[r - l + 1]) % this.mod;
        if (res < 0n) res += this.mod;
        return res;
    }
}

/**
 * Computes odd/even palindrome radii with Manacher's algorithm.
 *
 * `d1[i]` is the odd palindrome radius centered at i.
 * `d2[i]` is the even palindrome radius centered between i - 1 and i.
 *
 * @param {string} s - Input string.
 * @returns {{d1: Array<number>, d2: Array<number>}} Palindrome radius arrays.
 *
 * @example
 * const { d1 } = manacher("aba");
 * console.log(d1[1]); // 2
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
