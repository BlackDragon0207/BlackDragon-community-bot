const Discord = require('discord.js');

require("isomorphic-fetch");

module.exports = {
    name: "disaster",
    aliases: ['안내문자'],
    description: "covid disaster ",

    async run (client, message, args){
        const message2 = client.emojis.cache.get('776772936748630037')
        const get = await fetch(`http://m.safekorea.go.kr/idsiSFK/neo/ext/json/disasterDataList/disasterDataList.json`).then(res => res.json());

        const covid2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`📩 안내문자`)
        .setFooter('코로나 조심하세요!', client.user.displayAvatarURL())
        .setDescription(`${message2} **${get[0].SJ}**\n
        \`\`\`${get[0].CONT}\`\`\``);
        message.channel.send(covid2)
    }
}