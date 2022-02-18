require('dotenv').config();
import { Client } from 'discord.js';
let bot = new Client();
const TOKEN = process.env.TOKEN;

import { ready, createLog, createDir, isAdmin, notAdmin, createFile } from './util.ts';
import { execute as NM } from './commands/newMember/execute.js';
import { execute as NBM } from './commands/newBotMember/execute.js';
import { execute as UUR } from './commands/updateUserRole/execute.js';
import { input } from './commands/console/input.js';

import { execute as SL } from './commands/serverLogs/execute.js';
import { execute as BR, buttonClicked } from './commands/buttonRole/execute.ts';
import { execute as R } from './commands/role/execute.js';
import { execute as SS } from './commands/startScore/execute.js';
import { execute as T } from './commands/test/execute.js';

import { log as log } from './commands/serverLogs/log.js';

bot.login(TOKEN).then(r => console.log('Used token: ' + r));

bot.on('ready', () => {
    ready(bot);
});

const consoleListener = process.openStdin();
consoleListener.addListener('data', res => {
    try {
        input(bot, res)
    } catch (err) {
        createLog(err);
    }
});

bot.ws.on('INTERACTION_CREATE', async interaction => {
    try {
        let type = interaction.type;
        let guildID = interaction.guild_id;
        let guild = bot.guilds.cache.get(guildID);
        let authorID = interaction.member.user.id;
        let author = guild.members.cache.get(authorID);
        createDir('./servers/' + guildID);
        let rolesFile = './servers/' + guildID + '/roles.txt';
        let name = interaction.data.name;
        let content = 'An error occurred and a response could not be generated';
        console.log('Interaction type ' + type + ' used by ' + authorID + ' in guild ' + guildID + ' in channel ' + interaction.channel_id);
        //console.log(interaction);

        switch (type) {
            case 1:
                console.log('type == 1');
                console.log(interaction);
                break;

            case 2:
                if (isAdmin(author)) {
                    switch (name) {
                        case 'logs':
                            content = SL(interaction, guild);
                            break;

                        case 'buttonrole':
                            let message = BR(interaction, guild);
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
                            content = R(interaction, rolesFile, guild);
                            break;

                        case 'startscore':
                            content = SS(interaction, guild, rolesFile, {
                                url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
                                json: true
                            });
                            break;

                        case 'test':
                            content = T();
                    }
                } else {
                    return notAdmin();
                }
                break;

            case 3:
                buttonClicked(interaction, author, guild);
                content = undefined;
                bot.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 6
                    }
                }).catch(reason => {console.log(reason)})
                return;
        }

        const createAPIMessage = async(interaction, content) => {
            const { data, files } = await APIMessage.create(
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
        createLog(err);
    }
});

bot.on('guildMemberAdd', member => {
    try {
        const guild = member.guild;
        const guildID = guild.id;
        createDir('./servers/' + guildID);
        const rolesFile = './servers/' + guildID + '/roles.txt';
        const botRolesFile = './servers/' + guildID + '/botroles.txt';
        createFile(rolesFile);
        createFile(botRolesFile);
        console.log(member.id + ' joined ' + guildID);

        log(JOINED, guild, member);

        if (!member.user.bot) { //not bot
            const options = {
                url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
                json: true
            };
            NM(member, rolesFile, options);

        } else if (member.user.bot) { //is bot
            NBM(member, botRolesFile);

        } else {
            console.log('member\'s user.bot is neither true nor false, no roles given');
        }
    } catch (err) {
        createLog(err);
    }
});

bot.on('message', msg => {
    try {
        const msgContent = msg.content;
        const guildID = msg.guild.id;
        createDir('./servers/' + guildID);
        const rolesFile = './servers/' + guildID + '/roles.txt';
        const member = msg.mentions.members.first();
        const options = {
            url: 'https://mee6.xyz/api/plugins/levels/leaderboard/' + guildID,
            json: true
        }
        if (msg.author.id === '159985870458322944' && member !== undefined) {
            UUR(msg, msgContent, member, rolesFile, options);

        } else if (!msg.author.bot) {
            // Tom Tbomb easter egg
            if (msgContent === 'Tom') {
                msg.channel.send('Tbomb!');
            }
        }
    } catch (err) {
        createLog(err);
        msg.channel.send('An error occurred!');
    }
});

import { EDITED, DELETED, JOINED, LEFT } from './types.js';

bot.on('messageUpdate', (oldMessage, newMessage) => {
    try {
        console.log(oldMessage.author.id + ' edited message in guild ' + oldMessage.channel.guild.id + ' in channel ' + oldMessage.channel.id);
        log(EDITED, oldMessage.channel.guild, oldMessage, newMessage);
    } catch (err) {
        createLog(err);
        oldMessage.channel.send('An error occurred!');
    }
});

bot.on("messageDelete", (deleteMessage) => {
    try {
        console.log(deleteMessage.author.id + ' deleted message in guild ' + deleteMessage.channel.guild.id + ' in channel ' + deleteMessage.channel.id);
        log(DELETED, deleteMessage.channel.guild, deleteMessage);
    } catch (err) {
        createLog(err);
        deleteMessage.channel.send('An error occurred!');
    }
});

bot.on('guildMemberRemove', member => {
    try {
        console.log(member.id + ' left ' + member.guild.id);
        log(LEFT, member.guild, member);
    } catch (err) {
        createLog(err);
    }
});