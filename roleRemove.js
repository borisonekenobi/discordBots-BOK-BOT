const util = require('./util.js');

const fs = require('fs');

function roleRemove(interaction, rolesFile) {
    let roleID = interaction.data.options[0].options[0].value;

    if (!util.checkID(roleID, rolesFile)) {
        return 'Role is not setup yet!'

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

        return 'The <@&' + roleID + '> role has been removed'
    }
}

module.exports = {roleRemove}