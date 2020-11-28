const util = require('./util.js');

function startScore(msg, rolesFile, options) {
    if (util.isAdmin(msg)) {
        msg.channel.send('Starting to score members')
            .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
        util.getUserData(options, msg, rolesFile);

    } else {
        msg.channel.send('You do not have admin permissions!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {startScore}