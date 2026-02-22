# JavaScript Competitive Programming Template

## Project Overview
This workspace contains a highly optimized JavaScript template designed for Competitive Programming (CP) on platforms like Codeforces, AtCoder, and HackerEarth. It addresses common JS issues in CP, such as slow I/O and the lack of a standard library (STL), by providing fast input reading and custom data structure implementations.

## Key Features
- **Fast I/O:** Uses `fs.readFileSync(0)` to read raw bytes, bypassing slow string manipulation methods.
- **Data Structures:** Includes implementations for:
  - `Queue` (O(1) amortized)
  - `Deque`
  - `PriorityQueue` (Min/Max Heap)
  - `DSU` (Disjoint Set Union)
  - `BIT` (Fenwick Tree)
- **Utilities:** Binary search (`lowerBound`, `upperBound`), math helpers (`gcd`, `lcm`, modular exponentiation), and array helpers.

## Usage

### Running Locally
To run the solution with input from a file:

1.  Ensure `io/input.txt` exists and contains your test case input.
2.  Run the following command in the terminal:
    ```bash
    node main.js < io/input.txt > io/output.txt
    ```
3.  Check `io/output.txt` for the results.

### Workflow
1.  **Input:** Paste the problem input into `io/input.txt`.
2.  **Code:** Modify `solve()` in `main.js` to implement your logic.
3.  **Run:** Execute the command above.
4.  **Verify:** Check the output in `io/output.txt`.

## Code Structure (`main.js`)
The `main.js` file is self-contained to allow easy copy-pasting into online judges.

- **`solve(...)`**: Place your algorithm logic here. This function returns the result for a single test case.
- **`main()`**: Handles reading input (number of test cases, etc.) and printing output. It calls `solve()` for each test case.
- **`readInt()`, `readNext()`, `readLine()`**: Helper functions for fast input parsing.

## Platform Specifics
- **Codeforces/AtCoder:** Copy the entire `main.js` content. The Fast I/O block is required.
- **LeetCode:** **Do NOT** include the Fast I/O block or the `main()` function. Only copy the data structures (e.g., `PriorityQueue`) and your solution logic. LeetCode does not support `fs.readFileSync(0)`.
