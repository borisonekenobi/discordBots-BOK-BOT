const util = require('../../util.js');

const fs = require("fs");

function setup(interaction, guild) {
    let channelID = Object.keys(interaction.data.resolved.channels)[0]
    let logsFile = util.createFile('./servers/' + guild.id + '.logsfile');
    fs.writeFileSync(logsFile, channelID);

    let channel = guild.channels.cache.find(channel => channel.id === channelID);
    return 'The ' + channel.toString() + ' channel will now be used for logs';
}

module.exports = {setup}