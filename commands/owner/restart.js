const Discord = require('discord.js');

module.exports = {
    name: "restart",
    aliases: ['재시작'],
    category: "owner",

    run: async (client, message, args) => {
        if (message.author.id !== '435800525389430804') return message.channel.send(`You cannot use this command!`)
        try {
            const dmEmbed = new Discord.MessageEmbed()
            .setTitle('봇 재부팅')
            .setColor("GREEN")
            .setTimestamp()
            .setDescription(`**봇이 재부팅 됩니다.**`)
            
            const DMC = client.channels.cache.get('872798553049792522')
            DMC.send(dmEmbed)

            setTimeout(() => {
                process.exit()
            }, 1000)
        } catch (e) {
            console.log(e.message)
        }
    }}