const util = require('../../util.js');
const rrc = require('./create.js');


function execute(interaction, guild) {
    return rrc.create(interaction, guild);
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