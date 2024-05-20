const dbClient = require("./dbClient");
const dbUtil = require("./dbUtil");

async function serverHasChannel(guildID) {
    let hasChannel = false;

    const client = dbClient.getClient();
    await (async () => {
        await client.connect();

        let server = await dbUtil.getServerByID(guildID, client);
        hasChannel = await dbUtil.getServerLogChannelByID(server.id, client);
    })();
    await client.end();

    return hasChannel !== false;
}

module.exports = {
    serverHasChannel
}