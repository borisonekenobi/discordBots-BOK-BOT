const util = require('../../util.js');

const fs = require("fs");

function disable(interaction, guild) {
    //return 'currently being worked on';
    const file = './servers/' + guild.id + '.logsfile';
    util.createFile(file);
    const data = fs.readFileSync(file, 'utf8');

    if (data === '') {
        return 'No logs channel is setup yet!'

    } else {
        fs.writeFileSync(file, '');

        return 'The logs channel has been removed. Logs will no longer be kept'
    }
}

module.exports = {disable}