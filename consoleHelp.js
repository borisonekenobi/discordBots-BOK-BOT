const ct = require('./consoleTest.js');
const cr = require('./consoleRestart.js');
const cs = require('./consoleStop.js');
const cv = require('./consoleVersion');
const cp = require('./consolePull.js');
const cc = require('./consoleCrash.js');

function consoleHelp(consoleMsg) {
    if (consoleMsg === 'help' || consoleMsg === 'help -a' || consoleMsg === 'help --all') {
        //TODO: List all commands

    } else if (consoleMsg === 'help --test') {
        ct.help();

    } else if (consoleMsg === 'help --restart') {
        cr.help();

    } else if (consoleMsg === 'help --stop') {
        cs.help();

    } else if (consoleMsg === 'help --version') {
        cv.help();

    } else if (consoleMsg === 'help --pull') {
        cp.help();

    } else if (consoleMsg === 'help --help') {
        help();

    } else if (consoleMsg === 'help --crash') {
        cc.help();

    } else {
        console.log(consoleMsg + ': command not found')
        console.log('use \'help --all\' for help')
    }
}

function help() {
    console.log('Currently being worked on');
}

module.exports = {consoleHelp}