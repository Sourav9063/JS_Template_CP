# JavaScript Competitive Programming Template

A highly optimized, boilerplate template for solving Competitive Programming (CP) problems in Node.js on platforms like Codeforces, AtCoder, and HackerEarth. 

JavaScript is notoriously tricky for CP due to strict Time Limit Exceeded (TLE) and Memory Limit Exceeded (MLE) constraints when reading large inputs, as well as its lack of a built-in C++ standard library (STL). This template solves both problems.

## 🚀 Features

### ⚡ Fast I/O
*   **Buffer-based Reader:** Reads standard input directly from the byte buffer (`fs.readFileSync(0)`), completely bypassing the slow `String.split()` method.

### 📚 Data Structures & Algorithms
*   **Data Structures:**
    *   `PriorityQueue` (Min/Max Heap), `Queue`, `Deque`
    *   `DSU` (Disjoint Set Union)
    *   `BIT` (Fenwick Tree)
    *   `SegmentTree` (Lazy Propagation)
    *   `SparseTable` (Range Minimum Query)
    *   `Trie`
*   **Graph Theory:**
    *   **Traversal:** BFS, DFS
    *   **Shortest Path:** Dijkstra, Bellman-Ford, Floyd-Warshall
    *   **Tree Algorithms:** Kruskal's MST, LCA (Binary Lifting)
    *   **Flow:** Dinic's Algorithm (Max Flow)
    *   **Other:** Topological Sort
*   **String Processing:**
    *   KMP, Z-Algorithm
    *   Rolling Hash (BigInt safe)
    *   Manacher's Algorithm
*   **Math & Number Theory:**
    *   Sieve of Eratosthenes, Prime Factorization
    *   Combinatorics (nCr with modulo)
    *   GCD, LCM, Modular Exponentiation
    *   Extended Euclidean, Modular Inverse
*   **Geometry:**
    *   Point Class (Vector operations)
    *   Convex Hull (Monotone Chain)
    *   Polygon Area
*   **Search:**
    *   `lowerBound`, `upperBound` (Binary Search)

---

## 🛠️ How to Run Locally

To test your code locally without constantly pasting inputs into the terminal, create an `io` folder with `input.txt` and `output.txt` files. 

Run your script using this command:

```bash
node main.js < io/input.txt > io/output.txt
```

* **`< io/input.txt`**: Feeds the contents of your input file into the script's standard input.
* **`> io/output.txt`**: Redirects the script's `process.stdout.write` into the output file.

---

## 📖 Input Examples & Usage

The template separates the I/O handling (`main`) from the actual problem logic (`solve`). This keeps your logic clean and makes it easier to port to platforms like LeetCode.

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

* **Codeforces / AtCoder:** Paste the entire template. These platforms pass raw bytes to standard input, so the Fast I/O block is strictly necessary.
* **LeetCode:** **DO NOT** paste the Fast I/O block. LeetCode does not use `stdin`/`stdout` and will crash if you use `fs.readFileSync(0)`. Only copy the data structures (like `PriorityQueue` or `DSU`) and paste them above your LeetCode solution function.
