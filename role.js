const util = require('./util.js');
const ra = require('./roleAdd.js');
const re = require('./roleEdit.js');
const rl = require('./roleList.js');
const rr = require('./roleRemove.js');

function role(msg, msgContent, rolesFile) {
    if (util.isAdmin(msg)) {
        const args = msgContent.slice(0).split(' ');
        // Checks if user has inputted function
        if (args [2] === undefined) {
            msg.channel.send('That is an invalid function! Please specify a function (add, edit, list, remove).')
                .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

            // Adds role to roleFile
        } else if (msgContent.startsWith('!bok role add')) {
            ra.roleAdd(msg, msgContent, rolesFile);

            // Edits role in roleFile
        } else if (msgContent.startsWith('!bok role edit')) {
            re.roleEdit(msg, msgContent, rolesFile);

            // Lists all setup roles
        } else if (msgContent.startsWith('!bok role list')) {
            rl.roleList(msg, msgContent, rolesFile);

            // Removes role from roleFile
        } else if (msgContent.startsWith('!bok role remove')) {
            rr.roleRemove(msg, msgContent, rolesFile);
        }

    } else {
        msg.channel.send('You do not have admin permissions!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {role}