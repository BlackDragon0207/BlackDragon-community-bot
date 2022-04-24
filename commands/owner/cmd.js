const Discord = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: "cmd",
        aliases: ['node'],
    description: "node start",

async run (client, message, args) {
    const input_1 = client.emojis.cache.get('777009105356718112')
    if(message.author.id !== "435800525389430804") return message.reply('당신은 개발자가 아닙니다.');

    const inputcode = args.join(" ");
    if(!inputcode) return message.reply('코드를 적어주세요!')

    try {
        const evaluiated = await eval(inputcode);
        const result  = inspect(evaluiated, { depth: 0 })

            const embed1 = new Discord.MessageEmbed()
            .setTitle("정상적으로 실행 되었습니다")
            .setDescription(`${input_1} Input\`\`\`md\n${inputcode}\n\`\`\`\n💾 Output\`\`\`js\n${result}\n\`\`\``)
            .setColor("GREEN")
            .setFooter("개발자 : 흑룡#1273", client.user.displayAvatarURL())
            message.channel.send(embed1)
} catch (e) {
    console.error(e)
        const embed2 = new Discord.MessageEmbed()
        .setTitle("에러가 발견 되었습니다")
        .setDescription(`${input_1} Input\`\`\`md\n${inputcode}\n\`\`\`\n💾 Output\`\`\`js\n${e}\n\`\`\``)
        .setColor('RED')
        .setFooter("개발자 : 흑룡#1273", client.user.displayAvatarURL())
        return message.channel.send(embed2)
    }
}
}