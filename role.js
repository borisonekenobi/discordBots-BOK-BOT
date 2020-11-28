const ra = require('./roleAdd.js');
const rr = require('./roleRemove.js');

function role(msg, msgContent, rolesFile) {
        // Adds role to roleFile
    if (msgContent.startsWith('!bok role add')) {
        ra.roleAdd(msg, msgContent, rolesFile);

        // Removes role from roleFile
    } else if (msgContent.startsWith('!bok role remove')) {
        rr.roleRemove(msg, msgContent, rolesFile);

        //
    } else {
        msg.channel.send('That is an invalid argument, please specify whether you are adding or removing role!')
            .then(r => console.error(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {role}