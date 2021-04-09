const util = require('./util.js');

const fs = require('fs');

function roleEdit(interaction, rolesFile) {
    let roleLevel = interaction.data.options[0].options[1].value;
    let roleID = interaction.data.options[0].options[0].value;

    if (!util.checkID(roleID, rolesFile)) {
        return 'Role is not setup yet!'

    } else {
        util.createFile(rolesFile);
        const allArgs = util.getFileData(rolesFile);

        for (let i = 0; i < allArgs.length; i++) {
            if (roleID === allArgs[i][0]) {
                allArgs[i][1] = roleLevel;
            }
        }
        fs.writeFileSync(rolesFile, '');
        for (let i = 0; i < allArgs.length - 1; i++) {
            fs.appendFileSync(rolesFile, allArgs[i][0] + ' ' + allArgs[i][1] + '\n');
        }
        return 'The <@&' + roleID + '> role\'s level has been changed to ' + roleLevel
    }
}

module.exports = {roleEdit}