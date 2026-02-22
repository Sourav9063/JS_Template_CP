const { Queue } = require('./helper/ds');

const q = new Queue();
q.push(10);
console.log(q.pop());
