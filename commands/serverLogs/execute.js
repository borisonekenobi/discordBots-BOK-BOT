const util = require('../../util.js');
const setup = require('./setup.js');
const disable = require('./disable.js');

function execute(interaction, author, guild) {
    if (util.isAdmin(author)) {
        let name = interaction.data.options[0].name
        switch (name) {
            case 'setup':
                return setup.setup(interaction, guild);

            case 'disable':
                return disable.disable(interaction, guild);
        }

    } else {
        return 'You do not have admin permissions!'
    }
}

module.exports = {execute}