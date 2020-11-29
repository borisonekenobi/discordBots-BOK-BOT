const util = require('./util.js');

function helpAdmin(msg) {
    if (util.isAdmin(msg)) {
        msg.channel.send(
            '!bok helpAdmin - pulls up the help list for admins \n' +
            '\tUSAGE: !bok helpAdmin \n\n' +

            '!bok test - test connection to bot \n' +
            '\tUSAGE: !bok test \n\n' +

            '!bok startScore - scores all members \n' +
            '\tUSAGE: !bok startScore \n\n' +

            '!bok role <function> <role> <level> \n' +
            '\tUSAGE: !bok role add @test-role 5 \n' +
            '\tUSAGE: !bok role edit @test-role 10 \n' +
            '\tUSAGE: !bok role list \n' +
            '\tUSAGE: !bok role remove @test-role \n\n')

            .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

    } else {
        msg.channel.send('You do not have admin permissions!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {helpAdmin}