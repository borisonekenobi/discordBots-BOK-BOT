const util = require("../util");
const db = require("../db/dbUtil");
const dbClient = require("../db/dbClient");
const dbLevel = require("../db/dbLevel");

async function execute(userID, guildID) {
    const user = await dbLevel.getUser(guildID, userID)
    const client = dbClient.getClient();
    await client.connect();
    const pointsForNextLevel = await db.getPointsForLevel(user.level + 1, client);
    await client.end;

    const percent = Math.round(user.points / pointsForNextLevel * 100);

    const numFilled = Math.round(percent / 5);
    const numEmpty = 20 - numFilled;

    const underline = '⠀'.repeat(10);

    const filled = '█'.repeat(numFilled);
    const empty = '▒'.repeat(numEmpty);

    const fields = [
        {name: `__${underline}⠀${percent}%${underline}${percent >= 10 ? '' : '⠀'}__`, value: `${user.level} ${filled}${empty} ${user.level + 1}`}
    ]

    return util.createEmbed('#00FF00', `Level ${user.level}`, '', '', '', '', `${user.points}/${pointsForNextLevel}`, '', fields);
}

module.exports = {
    execute
}