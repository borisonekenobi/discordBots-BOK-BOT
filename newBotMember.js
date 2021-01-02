const util = require('./util.js');

function newBotMember(member, botRolesFile) {
    const args = util.getFileData(botRolesFile);
    for (let i = 0; i < args.length - 1; i++) {
        let roleId = args[i][0].trim();
        roleId.toString();
        let role = member.guild.roles.cache.find(r => r.id === roleId);
        util.giveRole(member, role, roleId)
    }
}

module.exports = {newBotMember}