const ha = require('./helpAdmin.js');
const hs = require('./helpStandard.js');

function help(msg, msgContent) {
    const args = msgContent.slice(0).split(' ');
    // Displays standard help list
    if (args [2] === undefined) {
        hs.helpStandard(msg)

        // Displays standard help list
    } else if (msg.content.startsWith('!bok help standard')) {
        hs.helpStandard(msg)

        // Displays admin help list
    } else if (msg.content.startsWith('!bok role admin')) {
        ha.helpAdmin(msg)
    }
}

module.exports = {help}