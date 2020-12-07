require('dotenv').config();
const Discord = require('discord.js');
let bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const customPrefix = '!bok';

const util = require('./util.js');
const nm = require('./newMember.js');
const uur = require('./updateUserRole.js');
const test = require('./test.js');
const help = require('./help.js');
const ss = require('./startScore.js');
const role = require('./role.js');
const ci = require('./consoleInput.js');

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    util.ready(bot)
});

const consoleListener = process.openStdin();
consoleListener.addListener('data', res => {
    try {
        ci.consoleInput(bot, res)
    } catch (err) {
        console.error(err);
    }
});

bot.on('guildMemberAdd', member => {
    const rolesFile = 'servers/' + member.guild.id + '.roles';
    nm.newMember(member, rolesFile);
});

bot.on('message', msg => {
    try {
        const msgContent = msg.content;
        const serverID = msg.guild.id;
        const rolesFile = 'servers/' + serverID + '.roles';
        const member = msg.mentions.members.first();
        const options = {
            url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + serverID,
            json: true
        }
        if (msg.author.id === '159985870458322944' && member !== undefined || msg.author.id === '360377836479053826' && member !== undefined) {
            uur.updateUserRole(msg, msgContent, member, rolesFile, options);

            // Tom Tbomb easter egg
        } else if (msgContent === 'Tom') {
            msg.channel.send('Tbomb!')
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);


        } else if (msgContent.startsWith(customPrefix)) {
            // test connection to bot
            if (msgContent === '!bok test') {
                test.test(msg);

                // all help commands
            } else if (msgContent.startsWith('!bok help')) {
                help.help(msg, msgContent);

                // starts scoring members on server (setup)
            } else if (msgContent === '!bok startScore') {
                ss.startScore(msg, rolesFile, options);

                // all role commands
            } else if (msgContent.startsWith('!bok role')) {
                role.role(msg, msgContent, rolesFile);
            }
        }
    } catch (err) {
        console.error(err);
        msg.channel.send('An error occurred!')
            .then(r => console.error(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
});