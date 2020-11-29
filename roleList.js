const util = require('./util.js');

function roleList(msg, msgContent, rolesFile) {
    const args = msgContent.slice(0).split(' ');
    let role = msg.mentions.roles.first();

        // Checks that a role is not mentioned
    if (role !== undefined) {
        msg.channel.send('Too many arguments provided!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Checks that there are no extra arguments
    } else if (args[3] !== undefined) {
        msg.channel.send('Too many arguments provided!')
            .then(r => console.warn(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);

        // Lists all roles
    } else {
        util.createFile(rolesFile);
        const allArgs = util.getFileData(rolesFile);
        let send = '';
        for (let i = 0; i < allArgs.length - 1; i++) {
            let role = msg.guild.roles.cache.get(allArgs[i][0]).name;
            send = send + role + ' --> ' + allArgs[i][1] + '\n'
        }

        msg.channel.send(send)
            .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
    }
}

module.exports = {roleList}