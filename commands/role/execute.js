const ra = require('./add.js');
const re = require('./edit.js');
const rl = require('./list.js');
const rr = require('./remove.js');

function execute(interaction, rolesFile, guild) {
    let name = interaction.data.options[0].name
    switch (name) {
        case 'add':
            return ra.roleAdd(interaction, rolesFile, guild);

        case 'edit':
            return re.roleEdit(interaction, rolesFile, guild);

        case 'list':
            return rl.roleList(interaction, rolesFile, guild);

        case 'remove':
            return rr.roleRemove(interaction, rolesFile, guild);
    }
}

module.exports = {execute}