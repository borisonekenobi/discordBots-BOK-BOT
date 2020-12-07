const fs = require('fs');
const rp = require('request-promise');

function updateUserRole(msg, msgContent, member, rolesFile, options) {
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
                            giveRole(msg, member, role, roleId)
                        } else if (Number(userInfo[1]) >= roleLevel) {
                            giveRole(msg, member, role, roleId)
                        }
                    }
                }
            }
        });
}

function giveRole(msg, member, role, roleId) {
    if (member !== undefined) {
        if (!member.roles.cache.some(r => r.id === roleId)) {
            try {
                member.roles.add(role)
                    .then(console.log('Role ' + role.id + ' given to ' + member.id));
            } catch (err) {
                console.error(err);
                msg.channel.send('An error occurred!')
                    .then(r => console.error(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
            }
            msg.channel.send('Congratulations <@' + member.id + '>, you have just received the ' + role.name + ' role!')
        }
    }
}

module.exports = {updateUserRole, giveRole}