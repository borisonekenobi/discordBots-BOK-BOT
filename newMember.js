const fs = require('fs');

function newMember(member, rolesFile) {
    const userData = [];
    userData.push([member.id, 0]);

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
                    giveRole(member, role, roleId)
                } else if (Number(userInfo[1]) >= roleLevel) {
                    giveRole(member, role, roleId)
                }
            }
        }
    }
}

function giveRole(member, role, roleId) {
    if (member !== undefined) {
        if (!member.roles.cache.some((role) => role.id === roleId)) {
            try {
                member.roles.add(role)
                    .then(console.log('Role ' + role.id + ' given to ' + member.id));
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = {newMember}