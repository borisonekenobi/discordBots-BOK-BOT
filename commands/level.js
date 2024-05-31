const util = require("../util");
const dbLevel = require("../db/dbLevel");
var Jimp = require("jimp");

async function execute(guildID, member, otherMember = false) {
    const userID = member.id;

    const user = await dbLevel.getUser(guildID, userID)
    const pointsForNextLevel = await dbLevel.getPointsForLevel(user.level + 1);

    const otherMemberText = otherMember ? `${member.displayName} - ` : '';

    const percent = Math.round(user.points / pointsForNextLevel * 100);

    const numFilled = Math.round(percent / 5);
    const numEmpty = 20 - numFilled;

    var image;

    Jimp.read("https://cdn.discordapp.com/attachments/546366129673863170/1245254758021730304/card.png?ex=665a0f9e&is=6658be1e&hm=d3d56744f0b34b268986751a3ce0624ddbb9656cf5eb5344743f19a60e3ad792&", (err, img) => {
      if (err) throw err;
          Jimp.read(member.displayAvatarURL(), (err, pfp) => {
          if (err) throw err;
          img.composite(pfp, 30, 30); //i have no clue what numbers to use i dont care that hard about this
        });

      Jimp.loadFont(pathOrURL).then((font) => { //todo add a font
          image.print(font, 60, 60, user.name);
          image.print(font, 60, 90, "Level: " + user.level);
      });
      image = img;
    });

    return image;

    // const underline = '⠀'.repeat(10);

    // const filled = '█'.repeat(numFilled);
    // const empty = '▒'.repeat(numEmpty);

    // const fields = [
    //     {
    //         name: `__${underline}⠀${percent}%${underline}${percent >= 10 ? '' : '⠀'}__`,
    //         value: `${user.level} ${filled}${empty} ${user.level + 1}`
    //     }
    // ]

    // return util.createEmbed('#00FF00', `${otherMemberText}Rank #${user.rank} - Level ${user.level}`, '', '', '', '', `${user.points}/${pointsForNextLevel}`, '', fields);
}

function infinite() {
    const underline = '⠀'.repeat(11);
    const fields = [
        {
            name: `__${underline}∞%${underline}__`,
            value: `∞ ${'█'.repeat(20)} ∞`
        }
    ]
    return util.createEmbed('#00FF00', `Level ∞`, '', '', '', '', `∞/∞`, '', fields);
}

module.exports = {
    execute,
    infinite
}
