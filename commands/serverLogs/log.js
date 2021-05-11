const types = require('../../types.js')
const util = require('../../util.js');

const fs = require('fs');

function log(type, guild, arg1, arg2 = undefined) {
    const file = './servers/' + guild.id + '.logsfile';
    util.createFile(file);
    const channelID = fs.readFileSync(file, 'utf8');

    if (channelID !== '') {
        guild.channels.cache.get(channelID).send(responseBuilder(type, arg1, arg2));
    }
}

function responseBuilder(type, arg1, arg2) {
    switch (type) {
        case types.JOINED:
            return '**Member Joined:**\n' +
                '<@' + arg1.user.id + '> ' + arg1.user.username + '#' + arg1.user.discriminator;

        case types.DELETED:
            return '**Message sent by <@' + arg1.author.id + '> deleted in <#' + arg1.channel.id + '>:**\n' +
                arg1.content;

        case types.LEFT:
            return '**Member Left:**\n' +
                '<@' + arg1.user.id + '> ' + arg1.user.username + '#' + arg1.user.discriminator;

        case types.EDITED:
            return '**Message edited by <@' + arg1.author.id + '> in <#' + arg1.channel.id + '>:**\n' +
                '**Before:**\n' + arg1.content +
                '\n**After:**\n' + arg2.content;
    }
}

module.exports = {log}