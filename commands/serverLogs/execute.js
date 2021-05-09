const util = require('../../util.js');

function execute(interaction, author, guild) {
    if (util.isAdmin(author)) {


    } else {
        return 'You do not have admin permissions!'
    }
}

module.exports = {execute}