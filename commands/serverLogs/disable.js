const util = require('../../util.js');

const fs = require("fs");

function disable(interaction, guild) {
    const file = './servers/' + guild.id + '.logsfile';
    util.createFile(file);
    const data = fs.readFileSync(file, 'utf8');

    if (data === '') {
        return util.createEmbed('#F9A825', '', '', 'Warning!', 'https://cdn.discordapp.com/attachments/697136585275211779/842042425496567818/download.png', '', 'No logs channel is setup yet!');

    } else {
        fs.writeFileSync(file, '');

        return util.createEmbed('#00FF00', '', '', '', '', '', 'The logs channel has been removed. Logs will no longer be kept');
    }
}

module.exports = {disable}