require('dotenv').config();
const Discord = require('discord.js');
let bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const util = require('./util.js');
const nm = require('./newMember.js');
const nbm = require('./newBotMember.js');
const uur = require('./updateUserRole.js');
const ci = require('./consoleInput.js');

const react = require('./reactionRole.js');
const role = require('./role.js');
const score = require('./startScore.js');
const test = require('./test.js');

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    util.ready(bot)
});

const consoleListener = process.openStdin();
consoleListener.addListener('data', res => {
    try {
        ci.consoleInput(bot, res)
    } catch (err) {
        util.createLog(err);
    }
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    try {
        //console.log(interaction);
        let guildID = interaction.guild_id;
        let guild = bot.guilds.cache.get(guildID);
        let authorID = interaction.member.user.id;
        let author = guild.members.cache.get(authorID);
        let rolesFile = 'servers/' + guildID + '.roles';
        let name = interaction.data.name;
        let content = '';
        switch (name){
            case 'reactionrole':
                content = react;
                break;

            case 'role':
                content = role.role(interaction, author, rolesFile, guild);
                break;

            case 'startscore':
                content = score.startScore(interaction, author, guild, rolesFile, {
                    url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
                    json: true
                });
                break;

            case 'test':
                content = test.test();
        }

        if (content === '') {
            content = 'An error occurred and a response could not be generated';
        }

        bot.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: content
                }
            }
        })
    } catch (err) {
        util.createLog(err);
    }
});

bot.on('guildMemberAdd', member => {
    try {
        const serverID = member.guild.id;
        const rolesFile = 'servers/' + serverID + '.roles';
        const botRolesFile = 'servers/' + serverID + '.botroles';
        util.createFile(rolesFile);
        util.createFile(botRolesFile);

        if (!member.user.bot) { //not bot
            const options = {
                url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + serverID,
                json: true
            };
            nm.newMember(member, rolesFile, options);

        } else if (member.user.bot) { //is bot
            nbm.newBotMember(member, botRolesFile);

        } else {
            console.log('member\'s user.bot is neither true nor false, no roles given');
        }
    } catch (err) {
        util.createLog(err);
    }
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
        if (msg.author.id === '159985870458322944' && member !== undefined) {
            uur.updateUserRole(msg, msgContent, member, rolesFile, options);

        } else if (!msg.author.bot) {
            // Tom Tbomb easter egg
            if (msgContent === 'Tom') {
                msg.channel.send('Tbomb!');
            }
        }
    } catch (err) {
        util.createLog(err);
        msg.channel.send('An error occurred!');
    }
});