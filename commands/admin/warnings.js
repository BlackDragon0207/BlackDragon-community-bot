const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: "warnings",
        aliases: ['경고확인'],
    description: "Check a users warnings",

    async run (client, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that');
        
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;

        let score = db.get(`warnings_${message.guild.id}_${user.id}`)

        message.channel.send(`**${user.username}**님의 경고 횟수 | *${score}*개 입니다.`);
    }
}