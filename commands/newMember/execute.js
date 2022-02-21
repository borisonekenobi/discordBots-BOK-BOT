const fs = require('fs');
const rp = require('request-promise');

const util = require('../../util')

function execute(member, rolesFile, options, guildOwner) {
    try {
        let userData = [];
        rp(options)
            .then((data) => {
                for (let user of data.players) {
                    if (user.id === member.id) {
                        userData.push([user.id, user.level]);
                    }
                }
                if (userData.length === 0) {
                    userData.push([member.id, 0]);
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
                            let role = member.guild.roles.cache.find(role => role.id === roleId);
                            if (roleLevel === 0) {
                                util.giveRole(member, role, roleId, undefined, guildOwner);
                            } else if (Number(userInfo[1]) >= roleLevel) {
                                util.giveRole(member, role, roleId, undefined, guildOwner);
                            }
                        }
                    }
                }
            })
            .catch(() => {
                guildOwner.send('Error occured while retrieving data from mee6.xyz leaderboard. *The leaderboard may be set to private, go to https://mee6.xyz/dashboard/' + guildOwner.guild.id + '/leaderboard to change privacy settings.*')
            });
    } catch (err) {
        util.createLog(err);
    }
}

module.exports = {execute}