const types = require('../../types.js')
const util = require('../../util');

const fs = require('fs');

function log(type, guild, arg1, arg2 = undefined) {
    const file = './servers/' + guild.id + '/logsfile.txt';
    util.createFile(file);
    const channelID = fs.readFileSync(file, 'utf8');

    if (channelID !== '') {
        if (type === types.EDITED && arg1.content === arg2.content) {
        } else {
            guild.channels.cache.get(channelID).send({ embeds: [responseBuilder(type, arg1, arg2)] });
        }
    }
}

function responseBuilder(type, arg1, arg2) {
    switch (type) {
        case types.JOINED:
            return util.createEmbed('#37D893', 'Member Joined:', '', '', '', '', '<@' + arg1.user.id + '> '  + arg1.user.username + '#' + arg1.user.discriminator);

        case types.DELETED:
            return util.createEmbed('#AB1327', '', '', '', '', '', 'Message sent by <@' + arg1.author.id + '> deleted in <#' + arg1.channel.id + '>:', '', [
                {name: 'Original Message:', value: arg1.content}
            ]);

        case types.LEFT:
            return util.createEmbed('#D9367D', 'Member Left:', '', '', '', '', '<@' + arg1.user.id + '> ' + arg1.user.username + '#' + arg1.user.discriminator);

        case types.EDITED:
            return util.createEmbed('#AB9713', '', '', '', '', '', 'Message edited by <@' + arg1.author.id + '> in <#' + arg1.channel.id + '>:', '', [
                {name: 'Before:', value: arg1.content},
                {name: 'After:', value: arg2.content}
            ]);
    }
}

module.exports = {log}