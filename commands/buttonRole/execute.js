const util = require('../../util.js');
const brc = require('./create.js');
const bre = require('./edit.js');


function execute(interaction, guild) {
    let name = interaction.data.options[0].name
    switch (name) {
        case 'create':
            return brc.create(interaction, guild);

        case 'edit':
            return bre.edit(interaction, guild);
    }
}

function buttonClicked(interaction, author, guild) {
    let roleID = interaction.data.custom_id;
    let role = guild.roles.cache.find(role => role.id === roleID);
    if (util.hasRole(author, roleID)) {
        util.removeRole(author, role);
    } else {
        util.giveRole(author, role, roleID);
    }
}

module.exports = {execute, buttonClicked}