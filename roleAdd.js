const util = require('./util.js');

const fs = require('fs');

function roleAdd(msg, msgContent, rolesFile) {
    if (util.isAdmin(msg)) {
        const args = msgContent.slice(0).split(' ');
        let roleLevel = parseFloat(args[4]);
        let role = msg.mentions.roles.first();
        if (typeof role !== 'object') {
            msg.channel.send('That is an invalid role! Please mention a role.')
                .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        } else if (typeof roleLevel != 'number' || isNaN(roleLevel)) {
            msg.channel.send('That is an invalid role level! Please enter a number.')
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        } else {
            util.createFile(rolesFile);
            util.checkID(role.id, rolesFile);
            fs.appendFileSync(rolesFile, role.id + ' ' + roleLevel + '\n');

            msg.channel.send('The <@&' + role.id + '> role has been set to level ' + roleLevel)
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
        }
    } else {
        msg.channel.send('You do not have admin permissions!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {roleAdd}