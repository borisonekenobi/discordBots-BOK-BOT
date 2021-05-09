const util = require('../../util.js');
const ra = require('./add.js');
const re = require('./edit.js');
const rl = require('./list.js');
const rr = require('./remove.js');

function execute(interaction, author, rolesFile, guild) {
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

module.exports = {execute}