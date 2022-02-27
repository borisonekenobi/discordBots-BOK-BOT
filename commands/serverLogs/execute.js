const setup = require('./setup.js');
const disable = require('./disable.js');

function execute(interaction, guild) {
    let name = interaction.data.options[0].name
    switch (name) {
        case 'setup':
            return setup.setup(interaction, guild);

        case 'disable':
            return disable.disable(guild);
    }
}

module.exports = {execute}