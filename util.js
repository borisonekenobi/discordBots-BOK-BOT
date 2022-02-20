const Discord = require('discord.js');
const {MessageEmbed, Permissions, GuildMemberRoleManager} = require('discord.js');
const fs = require('fs');
const rp = require('request-promise');

function getUserData(options, guild, rolesFile) {
    const userData = [];
    rp(options).then((data) => {
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
            let memberID = userInfo[0];
            if (memberID === undefined) {
                continue;
            }

            let member = guild.members.cache.get(memberID);
            for (let arg of args) {
                let roleLevel = Number(arg[1]);
                let roleID = arg[0];
                let role = guild.roles.cache.find(role => role.id === roleID);
                if (roleLevel === 0) {
                    if (member !== undefined) {
                        giveRole(member, role, role.id);
                    }
                } else if (Number(userInfo[1]) >= roleLevel) {
                    if (member !== undefined) {
                        giveRole(member, role, role.id);
                    }
                }
            }
        }
    }).catch((err) => {
        createLog(err);
    });

    return 'Done setup. Use !bok help for help';
}

function isAdmin(user) {
    return user.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || user.id === '360377836479053826';
}

function createDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function createFile(file) {
    if (!fs.existsSync(file)) {
        fs.appendFileSync(file, '');
    }
    return file;
}

function checkID(IDnum, path) {
    const allArgs = getFileData(path);
    const IDs = [];
    for (let i = 0; i < allArgs.length; i++) {
        IDs.push(allArgs[i][0]);
    }

    for (let i = 0; i < IDs.length; i++) {
        if (IDnum === IDs[i]) {
            return IDnum === IDs[i];
        }
    }
}

function getFileData(path) {
    createFile(path);
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n');
    const allArgs = [];
    for (let i = 0; i < lines.length; i++) {
        allArgs.push(lines[i].split(' '));
    }
    return allArgs;
}

function hasRole(member, roleID) {
    return member._roles.indexOf(roleID) >= 0;
}

function giveRole(member, role, roleID, msg = undefined) {
    if (member !== undefined) {
        if (role !== undefined) {
            if (!hasRole(member, roleID)) {
                member.roles.add(role)
                    .then(() => {
                        if (msg !== undefined) {
                            msg.channel.send('Congratulations <@' + member.id + '>, you have just received the ' + role.name + ' role!');
                        }
                    })
                    .then(() => console.log(member.id + ' awarded ' + role.id + ' role'));
            } else {
                console.log(member.id + ' already has ' + role.id + ', no role awarded');
            }
        } else {
            console.log('role is undefined')
        }
    } else {
        console.error('member is undefined');
    }
}

function removeRole(member, role) {
    member.roles.remove(role);
}

function ready(bot) {
    bot.user.setPresence({ activities: [{ name: 'Star Wars', type: 'WATCHING' }], status: 'online' });
    console.info(`Logged in as ${bot.user.tag}`);
    bot.channels.cache.get('738439111412809730').send(':green_circle: Bot has started.');
}

function createLog(err) {
    try {
        let date_ob = new Date();
        let date = ('0' + date_ob.getDate()).slice(-2);
        let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        let logFile = year + '-' + month + '-' + date + '-' + hours + '-' + minutes + '-' + seconds + '.log';

        fs.appendFileSync('logs/' + logFile, err);
        console.error('An error occurred! Error info saved to ' + logFile)
    } catch (e) {
        console.error(err);
    }
}

function notAdmin() {
    return createEmbed('#FF0000', '', '', 'Error!', 'https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png', '', 'You do not have admin permissions!');
}

function createEmbed(Color = '#000000', Title = '', URL = '', Author = '', AuthorImage = '', AuthorURL = '', Description = 'Description', Thumbnail = '', Fields = [], Image = '', Footer = '', FooterURL = '') {
    try {
        return new MessageEmbed()
            .setColor(Color)
            .setTitle(Title)
            .setURL(URL)
            .setAuthor(Author, AuthorImage, AuthorURL)
            .setDescription(Description)
            .setThumbnail(Thumbnail)
            .addFields(Fields)
            .setImage(Image)
            .setTimestamp()
            .setFooter(Footer, FooterURL);
    } catch (err) {
        createLog(err);
    }
}

module.exports = {getUserData, isAdmin, createDir, createFile, checkID, getFileData, hasRole, giveRole, removeRole ,ready, createLog, notAdmin, createEmbed}