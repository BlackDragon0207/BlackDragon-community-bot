const Discord = require('discord.js')

module.exports = {
    name: "ping",
        aliases: ['핑'],
    description: "test command",

    async run (client, message, args) {
        let wait = await message.channel.send(`${client.emojis.cache.get('668796958881742859')} Please Wait..`)

        const embed = new Discord.MessageEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle(`${client.emojis.cache.get('668796958881742859')} 현재 핑`)
        .addField(`\n${client.emojis.cache.get('668795590263439370')} **Ping API**`, `__**${Math.round(client.ws.ping)}ms**__`)
        .addField(`\n${client.emojis.cache.get('668795627437555747')} **Message Delay**`, `__**${wait.createdTimestamp - message.createdTimestamp}ms**__`)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setColor(`#b906ec`)
        await wait.edit('',embed)
    }
}