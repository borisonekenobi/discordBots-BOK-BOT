const util = require('../../util');

const fs = require('fs');

function remove(interaction, rolesFile, guild) {
    let roleID = interaction.data.options[0].options[0].value;

    if (!util.checkID(roleID, rolesFile)) {
        return util.createEmbed('#F9A825', '', '', 'Warning!', 'https://cdn.discordapp.com/attachments/697136585275211779/842042425496567818/download.png', '', 'Role is not setup yet!')

    } else {
        util.createFile(rolesFile);
        const allArgs = util.getFileData(rolesFile);

        for (let i = 0; i < allArgs.length; i++) {
            if (roleID === allArgs[i][0]) {
                allArgs.splice(i);
            }
        }
        fs.writeFileSync(rolesFile, '');
        for (let i = 0; i < allArgs.length; i++) {
            fs.appendFileSync(rolesFile, allArgs[i][0] + ' ' + allArgs[i][1] + '\n');
        }

        const role = guild.roles.cache.find(role => role.id === roleID);
        return util.createEmbed('#00FF00', '', '', '', '', '', 'The ' + role.toString() + ' role has been removed');
    }
}

module.exports = {roleRemove: remove}