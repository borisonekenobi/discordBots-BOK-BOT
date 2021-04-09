const util = require('./util.js');
const ra = require('./roleAdd.js');
const re = require('./roleEdit.js');
const rl = require('./roleList.js');
const rr = require('./roleRemove.js');

function role(interaction, author, rolesFile, guild) {
    if (util.isAdmin(author)) {
        let name = interaction.data.options[0].name
        switch (name) {
            case 'add':
                return ra.roleAdd(interaction, rolesFile);

            case 'edit':
                return re.roleEdit(interaction, rolesFile);

            case 'list':
                return rl.roleList(interaction, rolesFile, guild);

            case 'remove':
                return rr.roleRemove(interaction, rolesFile);
        }
    } else {
        return 'You do not have admin permissions!';
    }
}

module.exports = {role}