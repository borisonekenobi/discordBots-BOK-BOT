require('dotenv').config();
const Discord = require('discord.js');
let bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

const util = require('./util.js');
const newMember = require('./commands/newMember/execute.js');
const newBotMember = require('./commands/newBotMember/execute.js');
const updateUserRole = require('./commands/updateUserRole/execute.js');
const consoleInput = require('./commands/console/input.js');

const logs = require('./commands/serverLogs/execute.js');
const buttonRole = require('./commands/buttonRole/execute.js');
const role = require('./commands/role/execute.js');
const startScore = require('./commands/startScore/execute.js');
const test = require('./commands/test/execute.js');

const log = require('./commands/serverLogs/log.js');

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    util.ready(bot);
});

const consoleListener = process.openStdin();
consoleListener.addListener('data', res => {
    try {
        consoleInput.input(bot, res)
    } catch (err) {
        util.createLog(err);
    }
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    try {
        let type = interaction.type;
        let guildID = interaction.guild_id;
        let guild = bot.guilds.cache.get(guildID);
        let authorID = interaction.member.user.id;
        let author = guild.members.cache.get(authorID);
        let rolesFile = 'servers/' + guildID + '/roles.txt';
        let name = interaction.data.name;
        let content = 'An error occurred and a response could not be generated';
        //console.log(interaction);

        switch (type) {
            case 1:
                console.log('type == 1');
                console.log(interaction);
                break;

            case 2:
                if (util.isAdmin(author)) {
                    switch (name) {
                        case 'logs':
                            content = logs.execute(interaction, guild);
                            break;

                        case 'buttonrole':
                            let message = buttonRole.execute(interaction, guild);
                            let msg = message.content;
                            let components = message.components;
                            bot.api.interactions(interaction.id, interaction.token).callback.post({
                                data: {
                                    type: 4,
                                    data: {
                                        content: msg,
                                        components: components
                                    }
                                }
                            });
                            return;

                        case 'role':
                            content = role.execute(interaction, rolesFile, guild);
                            break;

                        case 'startscore':
                            content = startScore.execute(interaction, guild, rolesFile, {
                                url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
                                json: true
                            });
                            break;

                        case 'test':
                            content = test.execute();
                    }
                } else {
                    return util.notAdmin();
                }
                break;

            case 3:
                buttonRole.buttonClicked(interaction, author, guild);
                content = undefined;
                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 6
                    }
                }).catch(reason => {console.log(reason)})
                return;
        }

        const createAPIMessage = async(interaction, content) => {
            const { data, files } = await Discord.APIMessage.create(
                bot.channels.resolve(interaction.channel_id),
                content
            )
                .resolveData()
                .resolveFiles()
            return { ...data, files }
        }

        const reply = async (interaction, response) => {
            let data = {
                content: response
            }

            if (typeof response === 'object') {
                data = await createAPIMessage(interaction, response)
            }

            bot.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data
                }
            })
        };
        await reply(interaction, content)

    } catch (err) {
        util.createLog(err);
    }
});

bot.on('guildMemberAdd', member => {
    try {
        const guild = member.guild;
        const guildID = guild.id;
        const rolesFile = 'servers/' + guildID + '/roles.txt';
        const botRolesFile = 'servers/' + guildID + '/botroles.txt';
        util.createFile(rolesFile);
        util.createFile(botRolesFile);

        log.log(types.JOINED, guild, member);

        if (!member.user.bot) { //not bot
            const options = {
                url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
                json: true
            };
            newMember.execute(member, rolesFile, options);

        } else if (member.user.bot) { //is bot
            newBotMember.execute(member, botRolesFile);

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
        const guildID = msg.guild.id;
        const rolesFile = 'servers/' + guildID + '/roles.txt';
        const member = msg.mentions.members.first();
        const options = {
            url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
            json: true
        }
        if (msg.author.id === '159985870458322944' && member !== undefined) {
            updateUserRole.execute(msg, msgContent, member, rolesFile, options);

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

const types = require('./types.js')

bot.on('messageUpdate', (oldMessage, newMessage) => {
    try {
        log.log(types.EDITED, oldMessage.channel.guild, oldMessage, newMessage);
    } catch (err) {
        util.createLog(err);
        oldMessage.channel.send('An error occurred!');
    }
});

bot.on("messageDelete", (deleteMessage) => {
    try {
        log.log(types.DELETED, deleteMessage.channel.guild, deleteMessage);
    } catch (err) {
        util.createLog(err);
        deleteMessage.channel.send('An error occurred!');
    }
});

bot.on('guildMemberRemove', member => {
    try {
        log.log(types.LEFT, member.guild, member);
    } catch (err) {
        util.createLog(err);
    }
});