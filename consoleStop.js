function consoleStop(bot) {
    console.log('Stopping');
    bot.channels.cache.get('738439111412809730').send(':red_circle: Bot has stopped.')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`))
        .then(() => process.exit(0))
        .catch(console.error);
}

module.exports = {consoleStop}