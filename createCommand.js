const apiEndpoint = 'https://discord.com/api/v8/applications/651208025075351602/commands'
const botToken = 'NjUxMjA4MDI1MDc1MzUxNjAy.XeWivA.kHEJKSmlA8OLNiOMhB3Wf4YtK_Y'
const commandData = {
    "name": "logs",
    "description": "Setup or disable logs",
    "options": [
        {
            "name": "setup",
            "description": "Setup logs",
            "type": 1,
            "required": true,
            "options": [
                {
                    "name": "channel",
                    "description": "The channel where the log will be created",
                    "type": 7,
                    "required": true
                }
            ]
        },
        {
            "name": "disable",
            "description": "Disable logs",
            "type": 1,
            "required": true
        }
    ]
}

async function main () {
    const fetch = require('node-fetch')

    const response = await fetch(apiEndpoint, {
        method: 'post',
        body: JSON.stringify(commandData),
        headers: {
            'Authorization': 'Bot ' + botToken,
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json()

    console.log(json)
}
main()