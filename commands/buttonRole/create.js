function create(interaction, guild) {
    let params = interaction.data.options[0].options;
    let message = params[0].value;
    let components = []

    for (let i = 1; i < params.length; i++) {
        let role = guild.roles.cache.find(role => role.id === params[i].value);
        components.push({
            "type": 2,
            "label": role.name,
            "style": 1,
            "custom_id": role.id
        });
    }

    return {
        "content": message,
        "components": [
            {
                "type": 1,
                "components": components

            }
        ]
    }
}

module.exports = {create}