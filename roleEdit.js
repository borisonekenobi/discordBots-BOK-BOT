const util = require('./util.js');

const fs = require('fs');

function roleEdit(msg, msgContent, rolesFile) {
    const args = msgContent.slice(0).split(' ');
    let roleLevel = parseFloat(args[4]);
    let role = msg.mentions.roles.first();

    // Checks that a role is mentioned
    if (typeof role !== 'object') {
        msg.channel.send('That is an invalid role! Please mention a role.')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Checks where role is mentioned
    } else if (args[3] !== ('<@&' + role.id + '>')) {
        msg.channel.send('That is an invalid role! Please mention a role.')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Checks that roleLevel is a number
    } else if (typeof roleLevel != 'number' || isNaN(roleLevel)) {
        msg.channel.send('That is an invalid role level! Please enter a number.')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Checks that there are no extra arguments
    } else if (args[5] !== undefined) {
        msg.channel.send('Too many arguments provided!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Checks if doesn't exist in rolesFile
    } else if (!util.checkID(role.id, rolesFile)) {
        msg.channel.send('Role is not setup yet!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Changes role level in rolesFile
    } else {
        util.createFile(rolesFile);
        const allArgs = util.getFileData(rolesFile);

        for (let i = 0; i < allArgs.length; i++) {
            if (role.id === allArgs[i][0]) {
                allArgs[i][1] = roleLevel;
            }
        }
        fs.writeFileSync(rolesFile, '');
        for (let i = 0; i < allArgs.length - 1; i++) {
            fs.appendFileSync(rolesFile, allArgs[i][0] + ' ' + allArgs[i][1] + '\n');
        }
        msg.channel.send('The <@&' + role.id + '> role\'s level has been changed to ' + roleLevel)
            .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {roleEdit}