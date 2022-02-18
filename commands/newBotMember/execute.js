const util = require('../../util');

function execute(member, botRolesFile) {
    try {
        const args = util.getFileData(botRolesFile);
        for (let i = 0; i < args.length - 1; i++) {
            let roleId = args[i][0].trim();
            roleId.toString();
            let role = member.guild.roles.cache.find(r => r.id === roleId);
            util.giveRole(member, role, roleId)
        }
    } catch (err) {
        util.createLog(err);
    }
}

module.exports = {execute}