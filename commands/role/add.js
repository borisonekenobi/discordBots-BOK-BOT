const util = require('../../util');

const fs = require('fs');

function add(interaction, rolesFile, guild) {
    let roleLevel = interaction.data.options[0].options[1].value;
    let roleID = interaction.data.options[0].options[0].value;

    if (util.checkID(roleID, rolesFile)) {
        return util.createEmbed('#F9A825', '', '', 'Warning!', 'https://cdn.discordapp.com/attachments/697136585275211779/842042425496567818/download.png', '', 'That role is already setup!')

    } else {
        util.createFile(rolesFile);
        fs.appendFileSync(rolesFile, roleID + ' ' + roleLevel + '\n');

        const role = guild.roles.cache.find(role => role.id === roleID);
        return util.createEmbed('#00FF00', '', '', '', '', '', 'The ' + role.toString() + ' role has been set to level ' + roleLevel);
    }
}

module.exports = {roleAdd: add}