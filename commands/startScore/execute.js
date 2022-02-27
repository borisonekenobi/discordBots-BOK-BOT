const util = require('../../util');

function execute(guild, rolesFile, options) {
    return util.getUserData(options, guild, rolesFile);
}

module.exports = {execute}