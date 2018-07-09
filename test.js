process.chdir(__dirname);
const glob = require('glob');
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const pb = require('pretty-bytes');
const colors = require('colors/safe');

const byteLimit = 100000;

const files = glob.sync('./dist/**/*.css', {absolute: true});

let code = 0;
for (const file of files) {
  const rp = path.relative(__dirname, file);
  const o = ora({enabled: true});
  try {
    const stat = fs.statSync(file);
    const msg = `${colors.bold(rp)} has a size of ${colors.bold(pb(stat.size))}`;

    if (stat.size < byteLimit) {
      o.succeed(colors.green(msg));
    } else {
      code = 1;
      o.fail(colors.red(msg))
    }
  } catch (e) {
    code = 1;
    o.fail(`${rp} threw`);
    console.error(e);
  }
}

process.exit(code);
