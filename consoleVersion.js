function consoleVersion() {
    const p = require('./package.json');
    console.log(p.version);
}

function help() {
    console.log('Currently being worked on');
}

module.exports = {consoleVersion, help}