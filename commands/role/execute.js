const util = require('../../util.js');
const ra = require('./add.js');
const re = require('./edit.js');
const rl = require('./list.js');
const rr = require('./remove.js');

function execute(interaction, author, rolesFile, guild) {
    let name = interaction.data.options[0].name
    if (name === 'list') {
        return rl.roleList(interaction, rolesFile, guild);

    } else if (util.isAdmin(author)) {
        switch (name) {
            case 'add':
                return ra.roleAdd(interaction, rolesFile, guild);

            case 'edit':
                return re.roleEdit(interaction, rolesFile, guild);

            case 'remove':
                return rr.roleRemove(interaction, rolesFile, guild);
        }
    } else {
        return util.notAdmin();
    }
}

module.exports = {execute}