const util = require('./util.js');

function roleList(interaction, rolesFile, guild) {
    util.createFile(rolesFile);
    const allArgs = util.getFileData(rolesFile);
    let send = '';
    for (let i = 0; i < allArgs.length - 1; i++) {
        let role = guild.roles.cache.get(allArgs[i][0]).name;
        send = send + role + ' --> ' + allArgs[i][1] + '\n'
    }

    return send;
}

module.exports = {roleList}