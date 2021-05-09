const fs = require('fs');
const rp = require('request-promise');

const util = require('../../util.js');

function execute(msg, msgContent, member, rolesFile, options) {
    const userData = [];
    rp(options)
        .then((data) => {
            for (let user of data.players) {
                userData.push([user.id, user.level]);
            }
            const contents = fs.readFileSync(rolesFile, 'utf8');
            const lines = contents.split('\n');
            const args = [];
            for (let i = 0; i < lines.length; i++) {
                if (lines[i] !== '') {
                    args.push(lines[i].split(' '));
                }
            }

            for (let userInfo of userData) {
                let memberId = userInfo[0];
                if (member.id === memberId) {
                    for (let arg of args) {
                        let roleLevel = Number(arg[1]);
                        let roleId = arg[0];
                        let role = msg.guild.roles.cache.find(role => role.id === roleId);
                        if (roleLevel === 0) {
                            util.giveRole(member, role, roleId)
                        } else if (Number(userInfo[1]) >= roleLevel) {
                            util.giveRole(member, role, roleId, msg)
                        }
                    }
                }
            }
        });
}

module.exports = {execute}