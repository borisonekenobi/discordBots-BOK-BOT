function create(interaction, rolesFile, guild) {
    let channel = interaction.data.options[0].options[0];
    let message = interaction.data.options[0].options[1];
    let role1 = guild.roles.cache.find(role => role.id === interaction.data.options[0].options[2]);
    return {
        "content": message,
        "components": [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": role1.name,
                        "style": 1,
                        "custom_id": "click_one"
                    }
                ]

            }
        ]
    }
}

module.exports = {create}