const ct = require('./consoleTest.js');
const cr = require('./consoleRestart.js');
const cs = require('./consoleStop.js');
const cv = require('./consoleVersion');

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
    }
}

module.exports = {consoleInput}