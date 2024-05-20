const util = require('../util');
const dbClient = require("../db/dbClient");
const dbUtil = require("../db/dbUtil");

async function execute(guild) {
    const client = dbClient.getClient();
    await client.connect();

    let server = await dbUtil.getServerByID(guild.id, client);
    if (!server) server = await dbUtil.addServer(guild.id, client);

    let server_users = await dbUtil.getServerUsers(server.id, client);
    let server_roles = await dbUtil.getServerRoles(server.id, undefined, client);

    await client.end();

    for (const server_user of server_users) {
        const member = await guild.members.fetch(server_user.id);
        for (const server_role of server_roles) {
            if (server_role.level > server_user.level) continue;

            const role = guild.roles.cache.find(role => role.id === server_role.id);
            util.giveRole(member, role, role.id);
        }
    }

    return util.createEmbed('#00FF00', '', '', '', '', '', 'Done scoring members');
}

module.exports = {
    execute
}
