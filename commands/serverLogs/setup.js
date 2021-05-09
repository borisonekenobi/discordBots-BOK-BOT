const util = require('../../util.js');

const fs = require("fs");

function setup(interaction, guild) {
    return 'currently being worked on';
    let channelID = Object.keys(interaction.data.resolved.channels)[0]
    let logsFile = util.createFile('./servers/' + guild.id + '.logsfile');
    fs.writeFileSync(logsFile, channelID);

    return 'The <#' + channelID + '> channel will now be used for logs';
}

module.exports = {setup}