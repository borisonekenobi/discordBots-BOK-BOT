require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const rp = require('request-promise');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
let roleLevel = 0;

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    bot.user.setActivity("Star Wars", {type: "WATCHING"}).then(r => console.log(r));
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.channels.get('738439111412809730').send(':green_circle: Bot has started.')
});

const consoleListener = process.openStdin();
consoleListener.addListener("data", res => {
    try {
        const consoleMsg = res.toString().toLocaleLowerCase().trim().split(/ +/g).join(" ");
        if (consoleMsg === 'test') {
            console.log('test successful');
        } else if (consoleMsg === 'restart' || consoleMsg === 'reboot') {
            bot.channels.get('738439111412809730').send(':yellow_circle: Bot is restarting.')
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`))
                .then(msg => bot.destroy())
                .then(() => bot.login(TOKEN))
                .catch(console.error);
        } else if (consoleMsg === 'stop') {
            console.log('Stopping');
            bot.channels.get('738439111412809730').send(':red_circle: Bot has stopped.')
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`))
                .then(msg => bot.destroy().then(process.exit(0)))
                .catch(console.error);
        }
    } catch (err) {
        console.error(err);
    }
});

bot.on('message', msg => {
    try {
        const msgContent = msg.content.toLocaleLowerCase();
        const serverID = msg.guild.id;
        const rolesFile = 'servers/' + serverID + '.roles';
        const member = msg.mentions.members.first();
        const options = {
            url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + serverID,
            json: true
        }
        if (msg.author.id === '159985870458322944' && member !== undefined) {
            const msgArgs = msgContent.slice(0).split(' ');
            const lines = fs.readFileSync(rolesFile, 'utf8').split('\n');
            let args = [];
            let role = '';
            for (let i = 0; i < lines.length; i++) {
                args.push(lines[i].split(' '))
                if (Number(msgArgs[7]) === args[i][1]) {
                    role = member.guild.roles.find(role => role.id === args[i][0]);
                    member.addRole(role).catch(console.error);//.then(console.log("Role " + role.id + " given to " + member.id));
                    msg.channel.send('Congratulations <@' + member.id + '>, you have just received the <@&' + role + '> role!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
                    break;
                }
            }

            //test connection to bot
        } else if (msgContent === 'test' || msgContent === '!bok test') {
            msg.reply('Test Successful').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error); //mentions pinger + pong
            msg.channel.send('Test Successful').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error); //pong

            //displays help list
        } else if (msgContent === '!bok help') {
            msg.channel.send('!bok help - pulls up this list\n!bok helpAdmin - pulls up the help list for admins').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);

            //displays admin help list
        } else if (msgContent === '!bok helpadmin') {
            if (isAdmin(msg)) {
                msg.channel.send('!bok helpAdmin - pulls up the help list for admins \n!bok test - test connection to bot \n!bok startScore - begins scoring members \n!bok <mee6 link> - sets up scoring link \n!bok kick <user> - temporary command that does nothing \n!bok siteClear - clears scoring link \n').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
            } else {
                msg.channel.send('You do not have admin permissions!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
            }

            //Tom Tbomb easter egg
        } else if (msg.content === 'Tom') {
            msg.channel.send('Tbomb!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);

            //starts scoring members on server (setup)
        } else if (msgContent === '!bok startscore') {
            if (isAdmin(msg)) {
                msg.channel.send('Starting to score members').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
                getUserData(options, msg, rolesFile);
            } else {
                msg.channel.send('You do not have admin permissions!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
            }

        } else if (msgContent.startsWith('!bok role add')) {
            if (isAdmin(msg)) {
                const args = msgContent.slice(0).split(' ');
                roleLevel = parseFloat(args[4]);
                let role = msg.mentions.roles.first().id;
                if (typeof roleLevel != "number" || isNaN(roleLevel)) {
                    msg.reply("that is an invalid role level! Please enter a number.").then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
                } else if (role === undefined) {
                    msg.reply("that is an invalid role! Please mention a role.").then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
                } else {
                    roleLevel = Math.floor(roleLevel);
                    role = Math.floor(role);

                    createFile(rolesFile);
                    checkID(role, rolesFile);
                    fs.appendFileSync(rolesFile, role + " " + roleLevel + "\n", function (err) {
                        if (err) throw err;
                    });

                    msg.channel.send("The " + role + " role has been set to level " + roleLevel).then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
                }
            } else {
                msg.channel.send('You do not have admin permissions!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
            }
        }
    } catch (err) {
        console.error(err);
        msg.channel.send('An error occurred!').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
    }
});

function getUserData(options, msg, rolesFile) {
    const userData = [];
    rp(options)
        .then((data) => {
            for (let user of data.players) {
                userData.push([user.id, user.level]);
            }

            // By Kiril
            msg.channel.send('Updating roles').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
            const contents = fs.readFileSync(rolesFile, 'utf8');
            const lines = contents.split('\n');
            const args = [];
            for (let i = 0; i < lines.length; i++) {
                if (lines[i] !== '') {
                    args.push(lines[i].split(' '))
                }
            }
            for (let userInfo of userData) {
                if (userInfo[0] === undefined) {
                    continue;
                }
                for (let arg of args) {
                    const roleLevel = Number(arg[1]);
                    if (Number(userInfo[1]) >= roleLevel) {
                        const memberId = userInfo[0];
                        const roleId = arg[0];
                        const role = msg.guild.roles.get(roleId);
                        const member = msg.guild.members.get(memberId);
                        if (member === undefined) {
                            break;
                        }
                        member.addRole(role);
                    }
                }
            }
            msg.channel.send('Done setup. Use !bok help for help').then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, "\n\t")}`)).catch(console.error);
        })
        .catch((err) => {
            console.error(err);
        });
}

function isAdmin(msg) {
    return msg.member.hasPermission("ADMINISTRATOR");
}

function createFile(path) {
    if (fs.existsSync(path)) {

    } else {
        fs.appendFileSync(path, '', function (err) {
            if (err) throw err;
        });
    }
}

function checkID(IDnum, path) {
    createFile(path);
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split("\n");
    const allArgs = [];
    const IDs = [];
    for (let i = 0; i < lines.length; i++) {
        allArgs.push(lines[i].split(" "));
        IDs.push(allArgs[i][0]);
    }

    for (let i = 0; i < IDs.length; i++) {
        return IDnum === IDs[i];
    }
}
