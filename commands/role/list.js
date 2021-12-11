const util = require('../../util');

function list(interaction, rolesFile, guild) {
    util.createFile(rolesFile);
    const allArgs = util.getFileData(rolesFile);
    let fields = [];
    for (let i = 0; i < allArgs.length - 1; i++) {
        let role = guild.roles.cache.find(role => role.id === allArgs[i][0]);
        let level = allArgs[i][1].trim() === '0' ? 'Join Server:' : 'Level ' + allArgs[i][1].trim() + ':';
        fields.push({name: level, value: role.toString()});
    }

    if (fields[0] === undefined) {
        return util.createEmbed('#00FF00', '', '', '', '', '', 'No roles have been setup!');
    } else {
        return util.createEmbed('#00FF00', '', '', '', '', '', 'All roles and their levels', '', fields);
    }
}

module.exports = {roleList: list}