const Discord = require("discord.js");

module.exports = async(client, message, args) => {
    const ms = require("ms")
    const timeSpan = ms("1 minutes")
    
    client.on('guildMemberAdd', member => {
        if(member.guild.id === '436048224617365524') {
            const createdAt = new Date(member.user.createdAt).getTime();
            const difference = Date.now() - createdAt;
            if (difference < timeSpan) {
                member.ban()
    
                let embed = new discord.MessageEmbed()
                .setTitle(`⛔ 보안 시스템 작동`)
                .setDescription(`**닉네임 [ Name ] : **${member.user.username}\n**유저 [ User ] : **${member.user}\n**아이디 [ ID ] : **${member.user.id}`)
                .addField("사유 [ Reason ]", `\`\`\`토큰 계정으로 의심 되어 밴 처리 되었습니다\`\`\``)
                .setColor("RED")
                client.channels.cache.get("568371523468132362").send(embed)
                console.log(`${member.user.username}가 토큰으로 인해 킥(추방)이 되었습니다.`)
            }
        }
    })
    
    client.on('message', async message => {
        let blacklisted = ["https://discerd.gift/FwrVcACacD", "https://discrods.gift/VEBvBmFbECvcW", "https://nitrosteami.com/airdrops", "https://discord-nit.com/best", "https://discomd.com/newyear", "https://diiscord-nitro.com/welcome", "https://nitro-one.xyz/New_year", "https://dlsccord-app.club/welcome"]
        const username = message.author.username;
        const userid = message.author.id;
        let foundInText = false;
        for (var i in blacklisted) { 
          if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true
        }
    
        if (foundInText) {
            message.delete()
            message.member.ban()
            let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle(`⛔ 보안 시스템 작동`)
            .setDescription(`**닉네임 [ Name ] : **${username}\n**아이디 [ ID ] : ${userid}**`)
            .addField("사유 [ Reason ]", `\`\`\`해킹 관련 링크를 업로드 하여 해당 메세지 삭제 및 메세지를 보낸 유저 밴 처리\`\`\``)
            message.channel.send(embed)
          }
        }
    )
} 