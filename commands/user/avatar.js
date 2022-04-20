const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ['아바타'],
    description: "Brodcast someone's avatar",

    async run (client, message, args) {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`${member.username}님의 아바타`)
        .setImage(avatar)
        .setColor(`#b906ec`)

        message.channel.send(embed);
    }
}