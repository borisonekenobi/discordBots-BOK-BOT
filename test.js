function test(msg) {
    msg.reply('Test Successful')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error); //mentions pinger + pong

    msg.channel.send('Test Successful')
        .then(r => console.log(`Sent message: \n\t${r.content.replace(/\r?\n|\r/g, '\n\t')}`)).catch(console.error); //pong
}

module.exports = {test}