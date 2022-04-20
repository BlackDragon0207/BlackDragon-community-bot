const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: "covid",
    aliases: ['코로나'],
    description: "covid",

    async run (client, message, args){
        const get = await fetch(`https://api.corona-19.kr/korea/?serviceKey=vbR6TMH8C1LzZNtqAhIxapOBE9ykrduw7`).then(res => res.json());

        const covid = new Discord.MessageEmbed()
        .setColor("RED")
        .setImage('https://cdn.discordapp.com/attachments/935045899695050793/939538427781730375/d2882bf8372bdf78b48bbec1ab7499b26b242c3efdf329dbbd604a8e553f0a323952188bfb453293db7a2b716df129578ed04af9ce5e7390e748efe91a4467c2b1c3047ee4b19908a06632f5bcbb49ce.jpg')
        .setThumbnail('https://cdn.discordapp.com/attachments/935045899695050793/939547120556453918/6ed8bd202a0b045e.png')
        .setTitle(`📈 코로나 바이러스 현황`)
        .setFooter('코로나 조심하세요!', client.user.displayAvatarURL())
        .setDescription(`👥 총 확진자: \`${get.TotalCase}명\`
        ✔ 총 완치자: \`${get.TotalRecovered}명\`
        ❌ 총 사망자: \`${get.TotalDeath}명\`
        💉 치료자: \`${get.NowCase}명\``);
        message.channel.send(covid)
    }
    }
