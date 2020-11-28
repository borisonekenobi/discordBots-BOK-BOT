const util = require('./util.js');

function helpAdmin(msg) {
    if (util.isAdmin(msg)) {
        msg.channel.send(
            '!bok helpAdmin - pulls up the help list for admins \n' +
            '!bok test - test connection to bot \n' +
            '!bok startScore - begins scoring members \n' +
            '!bok <mee6 link> - sets up scoring link \n' +
            '!bok kick <user> - temporary command that does nothing \n' +
            '!bok siteClear - clears scoring link \n')
            .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

    } else {
        msg.channel.send('You do not have admin permissions!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {helpAdmin}