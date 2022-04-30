const { MessageEmbed } = require("discord.js")
const moment = require("moment")

module.exports = {
  name: "userinfo",
  aliases: ['유저정보'],
  description: "Get advance stats of given person or yourself",
  async run (client, message, args){

      const user = message.mentions.members.first() || message.member
      const roles = user.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
      //IONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    }

    //NOW BADGES
    let badges = await user.user.flags
    badges = await badges.toArray();

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(m.replace("_", " "))
    })

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    //ACTIVITY
    let array = []
    if (user.user.presence.activities.length) {

      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None"
        let xname = data[i].details || "None"
        let zname = data[i].state || "None"
        let type = data[i].type

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``)

        if (data[i].name === "Spotify") {
          embed.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        embed.setDescription(array.join("\n"))

      }
    }

      //EMBED COLOR BASED ON member
      embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)

      //OTHER STUFF 
      embed.setAuthor(user.user.tag, user.user.displayAvatarURL({ dynamic: true }))

      //CHECK IF USER HAVE NICKNAME
      if (user.nickname !== null) embed.addField("닉네임", user.nickname)
      embed
        .addField("계정 생성일", `${moment(user.user.createdTimestamp).format('LT')} ${moment(user.user.createdTimestamp).format('LL')} ${moment(user.user.createdTimestamp).fromNow()}`)
        .addField("정보", `아이디: \`${user.user.id}\`\n판별자: #${user.user.discriminator}\n봇: ${user.user.bot}\n아바타: **[Link to avatar](${user.user.displayAvatarURL({ dynamic: true })})**`,`\u200b`)

        .addField("멤버", `최상위 역할: ${user.roles.highest.id === message.guild.id ? 'None' : user.roles.highest.name}\n서버 가입 날짜: ${moment(user.joinedAt).format('LL LTS')}\n호스트 역할: ${user.roles.hoist ? user.roles.hoist.name : 'None'}\n역할 [${roles.length}]: ${roles.length < 100 ? roles.join(', ') : roles.length > 100 ? this.client.trimArray(roles) : 'None'}`, `\u200b`)
        .addField("뱃지", newbadges.join(", ").toLowerCase() || "None")
        .setFooter(user.user.presence.status, stat[user.user.presence.status])



      return message.channel.send(embed).catch(err => {
        return message.channel.send("Error : " + err)
      })



    }



  }