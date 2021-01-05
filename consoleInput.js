const ct = require('./consoleTest.js');
const cr = require('./consoleRestart.js');
const cs = require('./consoleStop.js');
const cv = require('./consoleVersion');
const cp = require('./consolePull.js');
const ch = require('./consoleHelp.js');
const cc = require('./consoleCrash.js');

function consoleInput(bot, res) {
    const consoleMsg = res.toString().toLocaleLowerCase().trim().split(/ +/g).join(' ');
    if (consoleMsg === 'test') {
        ct.consoleTest();

    } else if (consoleMsg === 'restart' || consoleMsg === 'reboot') {
        cr.consoleRestart(bot);

    } else if (consoleMsg === 'stop') {
        cs.consoleStop(bot);

    } else if (consoleMsg === 'version') {
        cv.consoleVersion();

    } else if (consoleMsg === 'pull code' || consoleMsg === 'pull') {
        cp.consolePull();

    } else if (consoleMsg.startsWith('help')) {
        ch.consoleHelp(consoleMsg);

    } else if (consoleMsg.startsWith('crash')) {
        if (consoleMsg === 'crash') {
            cc.consoleCrash();
        } else {
            let errorMsg = consoleMsg.substr(consoleMsg.indexOf(" ") + 1);
            cc.consoleCrash(errorMsg);
        }

    } else {
        console.log(consoleMsg + ': command not found')
        console.log('Use \'help --all\' for help.')

    }
}

module.exports = {consoleInput}