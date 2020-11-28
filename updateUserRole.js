function updateUserRole(msg, msgContent, member, rolesFile, fs) {
    const msgArgs = msgContent.slice(0).split(' ');
    const lines = fs.readFileSync(rolesFile, 'utf8').split('\n');
    let args = [];
    let role = '';
    for (let i = 0; i < lines.length; i++) {
        args.push(lines[i].split(' '))
        if (Number(msgArgs[7]) === args[i][1]) {
            role = member.guild.roles.find(role => role.id === args[i][0]);
            member.roles.add(role).then(console.log('Role ' + role.id + ' given to ' + member.id)).catch(console.error);
            msg.channel.send('Congratulations <@' + member.id + '>, you have just received the <@&' + role.id + '> role!')
                .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error);
            break;
        }
    }
}

module.exports = {updateUserRole}