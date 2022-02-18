const util = require('../../util');

const fs = require("fs");

function setup(interaction, guild) {
    let channelID = Object.keys(interaction.data.resolved.channels)[0]
    let logsFile = util.createFile('./servers/' + guild.id + '/logsfile.txt');
    fs.writeFileSync(logsFile, channelID);

    let channel = guild.channels.cache.find(channel => channel.id === channelID);
    return util.createEmbed('#00FF00', '', '', '', '', '', 'The ' + channel.toString() + ' channel will now be used for logs');
}

module.exports = {setup}