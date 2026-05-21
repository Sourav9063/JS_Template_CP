# Randomized Verification Command

```bash
node << 'EOF'
const { spawnSync } = require('child_process');
function prefMax(a) {
  let sum = 0, mx = -Infinity;
  return a.map(x => { sum += x; if (sum > mx) mx = sum; return mx; });
}
let input = '200\n';
const tests = [];
for (let tc = 0; tc < 200; tc++) {
  const n = 1 + Math.floor(Math.random() * 20);
  const real = Array.from({length: n}, () => Math.floor(Math.random() * 21) - 10);
  const s = Array.from({length: n}, () => Math.random() < 0.5 ? '1' : '0').join('');
  const shown = real.map((x, i) => s[i] === '1' ? x : 0);
  const c = prefMax(real);
  tests.push({n, s, shown, c});
  input += `${n}\n${s}\n${shown.join(' ')}\n${c.join(' ')}\n`;
}
const res = spawnSync('node', ['contest/2231/d.js'], { input, encoding: 'utf8' });
if (res.status !== 0) {
  console.error(res.stderr);
  process.exit(1);
}
const lines = res.stdout.trim().split(/\n/);
let p = 0;
for (let tc = 0; tc < tests.length; tc++) {
  const verdict = lines[p++];
  if (verdict !== 'Yes') {
    console.log('unexpected No', tc, tests[tc], res.stdout);
    process.exit(1);
  }
  const got = lines[p++].trim().split(/\s+/).map(Number);
  const {n, s, shown, c} = tests[tc];
  if (got.length !== n) throw new Error('bad length');
  for (let i = 0; i < n; i++) {
    if (s[i] === '1' && got[i] !== shown[i]) {
      console.log('known mismatch', tc, i, tests[tc], got);
      process.exit(1);
    }
  }
  const cc = prefMax(got);
  if (cc.join(',') !== c.join(',')) {
    console.log('c mismatch', tc, tests[tc], got, cc);
    process.exit(1);
  }
}
console.log('ok');
EOF
```
