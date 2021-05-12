const util = require('../../util.js');

function execute(interaction, author, guild, rolesFile, options) {
    if (util.isAdmin(author)) {
        return util.getUserData(options, guild, rolesFile);

    } else {
        return util.notAdmin();
    }
}

module.exports = {execute}