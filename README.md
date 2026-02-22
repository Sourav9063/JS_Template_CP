# JavaScript Competitive Programming Template (JS STL for CP)

The ultimate **JavaScript Competitive Programming Template** and **STL for JavaScript**. A highly optimized, boilerplate solution for solving **Competitive Programming (CP)** problems in **Node.js** and **JS** on platforms like **Codeforces**, **AtCoder**, **LeetCode**, and **HackerEarth**.

JavaScript is often overlooked for **Competitive Programming** due to the lack of a built-in **Standard Template Library (STL)** (like C++) and strict Time Limit Exceeded (TLE) constraints. This repository provides a complete **JS STL** implementation and **Fast I/O** wrapper to make **JavaScript for CP** viable and competitive.

## 🚀 Features & JS STL Implementations

### ⚡ Fast I/O for JavaScript CP
*   **Buffer-based Reader:** Reads standard input directly from the byte buffer (`fs.readFileSync(0)`), completely bypassing the slow `String.split()` method. Essential for avoiding TLE in **Node.js Competitive Programming**.

### 📚 STL Data Structures in JavaScript
Missing **STL in JS**? We've implemented the essential data structures for you:
*   **Priority Queue / Heap:** `PriorityQueue` (Min Heap & Max Heap) for Dijkstra, Prim's, etc.
*   **Double-Ended Queue:** `Deque` for sliding window maximums and 0-1 BFS.
*   **Queue:** Efficient `Queue` implementation (unlike JS `Array.shift()` which is O(n)).
*   **Disjoint Set Union (DSU):** With path compression and rank optimization for graph connectivity.
*   **Fenwick Tree (BIT):** Binary Indexed Tree for efficient prefix sums and updates.
*   **Segment Tree:** Complete `SegmentTree` with Lazy Propagation for range queries.
*   **Sparse Table:** For O(1) Range Minimum Query (RMQ).
*   **Trie:** Prefix tree for string operations.
*   **Graph Algorithms:**
    *   **Traversal:** BFS, DFS
    *   **Shortest Path:** Dijkstra, Bellman-Ford, Floyd-Warshall
    *   **MST:** Kruskal's Algorithm
    *   **LCA:** Lowest Common Ancestor (Binary Lifting)
    *   **Max Flow:** Dinic's Algorithm
*   **String Algorithms:** KMP, Z-Algorithm, Rolling Hash, Manacher's.
*   **Math & Number Theory:** GCD, LCM, Modular Inverse, nCr (Combinatorics), Sieve of Eratosthenes.
*   **Binary Search:** `lowerBound` and `upperBound` (C++ `std::lower_bound` equivalents).

---

## 🛠️ How to Run Locally

To test your **JavaScript CP** code locally without manually typing inputs, create an `io` folder with `input.txt` and `output.txt` files.

Run your script using this command:

```bash
node main.js < io/input.txt > io/output.txt
```

* **`< io/input.txt`**: Feeds the contents of your input file into the script's standard input.
* **`> io/output.txt`**: Redirects the script's `process.stdout.write` into the output file.

---

## 📖 Input Examples & Usage

The template separates the I/O handling (`main`) from the actual problem logic (`solve`). This keeps your logic clean and makes it easier to port to platforms like **LeetCode**.

### 1. Reading Single Variables & Arrays

**Input:**

```text
1
5
10 20 30 40 50
```

**Code:**

```javascript
function solve(n, arr) {
    // Logic here
    return arr.reduce((a, b) => a + b, 0); 
}

function main() {
    let t = readInt(); 
    if (t === null) return; 
    const out = [];

    while (t-- > 0) {
        const n = readInt(); // Reads 5
        const arr = new Array(n);
        for(let i = 0; i < n; i++) arr[i] = readInt(); // Reads the array
        
        out.push(solve(n, arr));
    }
    process.stdout.write(out.join("\n") + "\n");
}
```

### 2. Reading Strings (No Spaces)

**Input:**

```text
1
5
UDLRR
```

**Code:**

```javascript
function main() {
    let t = readInt(); 
    if (t === null) return; 
    const out = [];

    while (t-- > 0) {
        const n = readInt();     // Reads 5
        const moves = readNext(); // Reads "UDLRR" as a single string
        // If you need an array of characters: const chars = readNext().split("");
        
        out.push(solve(n, moves));
    }
    process.stdout.write(out.join("\n") + "\n");
}
```

### 3. Reading Full Lines (With Spaces)

**Input:**

```text
1
Hello World Codeforces
```

**Code:**

```javascript
function main() {
    let t = readInt(); 
    if (t === null) return; 
    const out = [];

    while (t-- > 0) {
        // readLine() safely skips the newline left behind by readInt()
        const sentence = readLine(); // Reads "Hello World Codeforces"
        
        out.push(solve(sentence));
    }
    process.stdout.write(out.join("\n") + "\n");
}
```

### 4. Reading a Matrix / 2D Grid

**Input:**

```text
1
2 3
1 2 3
4 5 6
```

**Code:**

```javascript
function main() {
    let t = readInt(); 
    if (t === null) return; 
    const out = [];

    while (t-- > 0) {
        const r = readInt();
        const c = readInt();
        const grid = [];
        
        for (let i = 0; i < r; i++) {
            const row = new Array(c);
            for (let j = 0; j < c; j++) row[j] = readInt();
            grid.push(row);
        }
        
        out.push(solve(r, c, grid));
    }
    process.stdout.write(out.join("\n") + "\n");
}
```

---

## ⚠️ Important Note: Codeforces vs. LeetCode

* **Codeforces / AtCoder:** Paste the entire template. These platforms pass raw bytes to standard input, so the **Fast I/O** block is strictly necessary.
* **LeetCode:** **DO NOT** paste the Fast I/O block. LeetCode does not use `stdin`/`stdout`. Only copy the **JS STL** data structures (like `PriorityQueue`, `SegmentTree` or `DSU`) and paste them above your LeetCode solution function.
