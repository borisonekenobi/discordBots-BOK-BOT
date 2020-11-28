const ready = require('./util.js');

const Discord = require('discord.js');
const TOKEN = process.env.TOKEN;

function consoleRestart(bot) {
    bot.channels.cache.get('738439111412809730').send(':yellow_circle: Bot is restarting.')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`))
        .then(() => reboot(bot))
        .catch(console.error);
}

function reboot(bot) {
    bot.destroy();
    bot = new Discord.Client();
    bot.login(TOKEN).then(r => console.log('Used token: ' + r));
    bot.on('ready', () => {
        ready.ready(bot)
    });
}

module.exports = {consoleRestart}