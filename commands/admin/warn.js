const Discord = require('discord.js');

const db = require('quick.db');

module.exports = {
  name: "warn",
      aliases: ['경고'],
  description: "Warn a member",

  async run (client, message, args) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that');

      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

      if(!user) return message.channel.send('경고를 부여할 유저를 맨션해주세요');

      if(user.bot) return message.channel.send('You can\'t warn bots');

      if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

      if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

      let reason = args.slice(1).join(" ");

      if(!reason) reason = 'Unspecified';

      let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

      if(warnings === null) warnings = 0;

//=======
if(warnings === null) {    
    const warnEmbed = new Discord.MessageEmbed()
    .setColor(`#e21717`)
    .setDescription(`${user}님에게 경고 부여 되었습니다`)
    message.channel.send(warnEmbed)
        setTimeout (() => {
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            let score = db.get(`warnings_${message.guild.id}_${user.id}`)
            const warnEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}님의 경고 내용`)
            .setThumbnail(user.displayAvatarURL())
            .setColor(`#e21717`)
            .addField(`경고 부여자`, message.author)
            .addField(`경고 대상`, `${user}`)
            .addField(`경고 사유`, reason)
            .addField(`경고 횟수`, `${score}`)
            .setFooter('경고 부여된 시간', client.user.displayAvatarURL())
            .setTimestamp()
            message.channel.send(warnEmbed)    
        }, 500) 
    } else 
        {
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setDescription(`${user}님에게 경고 부여 되었습니다`)
            message.channel.send(warnEmbed)
            setTimeout (() => {
                db.add(`warnings_${message.guild.id}_${user.id}`, 1)
                let score = db.get(`warnings_${message.guild.id}_${user.id}`)
                const warnEmbed = new Discord.MessageEmbed()
                .setAuthor(`${user.username}님의 경고 내용`)
                .setThumbnail(user.displayAvatarURL())
                .setColor(`#e21717`)
                .addField(`경고 부여자`, message.author)
                .addField(`경고 대상`, `${user}`)
                .addField(`경고 사유`, reason)
                .addField(`경고 횟수`, `${score}`)
                .setFooter('경고 부여된 시간', client.user.displayAvatarURL())
                .setTimestamp()
                message.channel.send(warnEmbed)             
            }, 500) 
    }

    if(warnings === 3){
        setTimeout (() => {
            db.set(`warnings_${message.guild.id}_${user.id}`, 4)
            db.get(`warnings_${message.guild.id}_${user.id}`)
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setDescription(`${user}님 앞으로 경고를 한 번 더 받으시면 서버에서 영구 밴 됩니다`)
            message.channel.send(warnEmbed)
        }, 1000)
    }

    if(warnings === 4){
        setTimeout (() => {
            db.set(`warnings_${message.guild.id}_${user.id}`, 5)
            db.get(`warnings_${message.guild.id}_${user.id}`)
            user.send(`경고가 5 누적 되셨습니다.\n${message.guild.name}서버에서 영구밴 처리 됩니다.`)
            const warnEmbed = new Discord.MessageEmbed()
            .setColor(`#e21717`)
            .setDescription(`${user}님께서 경고 5가 누적 되었습니다.\n관리자가 확인 후 서버에서 밴 처리 됩니다.`)
            message.channel.send(warnEmbed)
        }, 1000)
    }
  }
}
      