function consoleVersion() {
    const p = require('./package.json');
    console.log(p.version);
}

module.exports = {consoleVersion}