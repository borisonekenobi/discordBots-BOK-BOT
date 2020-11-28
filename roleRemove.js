const fs = require('fs');

function roleRemove(msg, msgContent, rolesFile) {
    msg.channel.send('This command has not been finished yet!')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
}

module.exports = {roleRemove}