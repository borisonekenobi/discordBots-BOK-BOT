const util = require('./util.js');
const rrc = require('./reactRoleCreate.js');
const rre = require('./reactRoleEdit.js');
const rrr = require('./reactRoleRemove.js');


function reactionRole(interaction, author, rolesFile) {
    if (util.isAdmin(author)) {
        let name = interaction.data.options[0].name
        switch (name) {
            case 'create':
                return rrc.create(interaction, rolesFile);

            case 'edit':
                return rre.edit(interaction, rolesFile);

            case 'remove':
                return rrr.remove(interaction, rolesFile);
        }
    } else {
        return 'You do not have admin permissions!';
    }
}

module.exports = {reactionRole}