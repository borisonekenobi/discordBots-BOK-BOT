const util = require('./util.js');

function startScore(interaction, author, guild, rolesFile, options) {
    if (util.isAdmin(author)) {
        return util.getUserData(options, guild, rolesFile);

    } else {
        return 'You do not have admin permissions!'
    }
}

module.exports = {startScore}