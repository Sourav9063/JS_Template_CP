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

module.exports = {
    kmpSearch,
    zFunction,
    Trie
};
