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

### 1. Install Dependencies
First, install the necessary dependencies (we use `esbuild` for bundling):

```bash
npm install
```

### 2. Test with Input File
To test your code locally, create an `io` folder with `input.txt` and `output.txt` files.

Build `solve.js` into `output.js`, then run:

```bash
npm run build
npm run test
```

The test script (`node output.js < io/input.txt > io/output.txt`) feeds `io/input.txt` into the bundled file and writes the result to `io/output.txt`.

You can also run both steps together:

```bash
npm run verify
```

### 3. Bundle for Submission
When you are ready to submit to an online judge (like Codeforces), you need a single file containing all your code and helper functions.

Run the build script:

```bash
npm run build
```

This will generate an **`output.js`** file using `esbuild`. **Copy the contents of `output.js` and paste it into the online judge.**

### 4. VS Code Code Runner
This repository includes `.vscode/settings.json` for the Code Runner extension. When you run a JavaScript file from VS Code, it uses the active file as the entry point:

```bash
cd $workspaceRoot && ./node_modules/.bin/esbuild $fullFileName --bundle --platform=node --outfile=output.js && node output.js < io/input.txt > io/output.txt
```

This is the same flow as `npm run build` plus `npm run test`, except `solve.js` is replaced by the active file opened in VS Code. That lets you run files like `contest/2231/b.js` while still generating `output.js` and writing results to `io/output.txt`.

The command uses `./node_modules/.bin/esbuild` because Code Runner runs in a normal shell, where `esbuild` may not be on `PATH`. npm scripts automatically add `node_modules/.bin` to `PATH`.

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

* **Codeforces / AtCoder:** Paste the entire template (or the bundled `output.js`). These platforms pass raw bytes to standard input, so the **Fast I/O** block is strictly necessary.
* **LeetCode:** **DO NOT** paste the Fast I/O block. LeetCode does not use `stdin`/`stdout`. Only copy the **JS STL** data structures (like `PriorityQueue`, `SegmentTree` or `DSU`) and paste them above your LeetCode solution function.
