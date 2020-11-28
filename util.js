const fs = require('fs');
const rp = require('request-promise');

function getUserData(options, msg, rolesFile) {
    const userData = [];
    rp(options)
        .then((data) => {
            for (let user of data.players) {
                userData.push([user.id, user.level]);
            }

            msg.channel.send('Updating roles').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error)
                .then(r => {
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
                        if (memberId === undefined) {
                            continue;
                        }
                        let member = msg.guild.members.cache.get(memberId);
                        for (let arg of args) {
                            let roleLevel = Number(arg[1]);
                            let roleId = arg[0];
                            let role = msg.guild.roles.cache.find(role => role.id === roleId);
                            if (roleLevel === 0) {
                                if (member !== undefined) {
                                    member.roles.add(role).then(console.log('\t\tRole ' + role.id + ' given to ' + member.id));
                                }
                            } else if (Number(userInfo[1]) >= roleLevel) {
                                if (member !== undefined) {
                                    member.roles.add(role).then(console.log('\t\tRole ' + role.id + ' given to ' + member.id));
                                }
                            }
                        }
                    }
                })
                .then(r => {
                    msg.channel.send('Done setup. Use !bok help for help').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
                });
        })
        .catch((err) => {
            console.error(err);
        });
}

function isAdmin(msg) {
    return msg.guild.member(msg.author).hasPermission('ADMINISTRATOR') || msg.author.id === '360377836479053826';
}

function createFile(path) {
    if (fs.existsSync(path)) {

    } else {
        fs.appendFileSync(path, '');
    }
}

function checkID(IDnum, path) {
    createFile(path);
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    const allArgs = [];
    const IDs = [];
    for (let i = 0; i < lines.length; i++) {
        allArgs.push(lines[i].split(' '));
        IDs.push(allArgs[i][0]);
    }

    for (let i = 0; i < IDs.length; i++) {
        return IDnum === IDs[i];
    }
}

function ready(bot) {
    bot.user.setActivity('Star Wars', {type: 'WATCHING'})
        .then(r => console.log(r));
    console.info(`Logged in as ${bot.user.tag}`);
    bot.channels.cache.get('738439111412809730').send(':green_circle: Bot has started.')
}

module.exports = {getUserData, isAdmin, createFile, checkID, ready}