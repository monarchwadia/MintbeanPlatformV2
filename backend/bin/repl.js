const repl = require('repl');
const models = require('../src/db/models');

// set models as globals
Object.entries(models).forEach(([key, value]) => {
  if (global[key]) {
    console.log(`Variable ${key} already exists in the global namespace. Exiting.`)
    process.exit(-1);
  }
  global[key] = value;
});

repl.start({ prompt: 'app >' })