const Discord = require('discord.js')
const db = require('quick.db');
const warnings = require('../admin/warnings');

module.exports = {
    name: "deletewarns",
        aliases: ['경고취소'],
    description: "Delete a member's warns",


    async run (client, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that.');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(user.id === message.author.id) return message.channel.send('You can\'t clear your own warnings');


            await db.add(`warnings_${message.guild.id}_${user.id}`, -1)
            let score = db.get(`warnings_${message.guild.id}_${user.id}`)

        setTimeout (() => {
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#2bfa47`)
            .setDescription(`${user}님의 경고가 취소 되었습니다 `)
            message.channel.send(warnEmbed)
        }, 1000)
    }
}