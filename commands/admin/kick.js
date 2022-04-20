const Discord = require('discord.js');

const db = require('quick.db')

module.exports = {
    name: "kick",
        aliases: ['킥'],
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You can\'t use that!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I don\'t have the right permissions.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('> 내보낼 사용자를 맨션하주세요.\nhttps://cdn.discordapp.com/attachments/647648929374273592/670853851909324800/20200126135330.png ');

        if(!member) return message.channel.send('Can\'t seem to find this user. Sorry \'bout that :/');
        if(!member.kickable) return message.channel.send('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine');

        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t kick yourself!');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })

        const kickembed = new Discord.MessageEmbed()
        .setColor(`#b906ec`)
        .setTitle('한 유저가 서버에서 추방 되었음을 알려드립니다.')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('추방된 사용자', member)
        .addField('추방한 관리자', message.author)
        .addField('추방된 사유', reason)
        .setFooter('추방된 시간', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);
    }
}