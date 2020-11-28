function help(msg) {
    msg.channel.send(
        '!bok help - pulls up this list\n' +
        '!bok helpAdmin - pulls up the help list for admins')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
}

module.exports = {help}