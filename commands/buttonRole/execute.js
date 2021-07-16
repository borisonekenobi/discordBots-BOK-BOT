const util = require('../../util.js');
const rrc = require('./create.js');
const rre = require('./edit.js');
const rrr = require('./remove.js');


function execute(interaction, author, rolesFile, guild) {
    if (util.isAdmin(author)) {
        let name = interaction.data.options[0].name
        switch (name) {
            case 'create':
                return rrc.create(interaction, rolesFile, guild);

            case 'edit':
                return rre.edit(interaction, rolesFile);

            case 'remove':
                return rrr.remove(interaction, rolesFile);
        }
    } else {
        return util.notAdmin();
    }
}

function buttonClicked(interaction, author, guild) {
    let roleID = interaction.data.custom_id;
    let role = guild.roles.cache.find(role => role.id === roleID);
    util.giveRole(author, role, roleID);
}

module.exports = {execute, buttonClicked}