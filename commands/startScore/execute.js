const util = require('../../util.js');

function execute(interaction, guild, rolesFile, options) {
    return util.getUserData(options, guild, rolesFile);
}

module.exports = {execute}