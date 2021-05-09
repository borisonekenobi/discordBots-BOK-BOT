const util = require('../../util.js');

const fs = require('fs');

function add(interaction, rolesFile) {
    let roleLevel = interaction.data.options[0].options[1].value;
    let roleID = interaction.data.options[0].options[0].value;

    if (util.checkID(roleID, rolesFile)) {
        return 'That role is already setup!';

    } else {
        util.createFile(rolesFile);
        fs.appendFileSync(rolesFile, roleID + ' ' + roleLevel + '\n');

        return 'The <@&' + roleID + '> role has been set to level ' + roleLevel;
    }
}

module.exports = {roleAdd: add}