const Discord = require('discord.js')

module.exports = {
    name: "reload",
        aliases: ['리로드'],
    description: "reload",
    
async run (client, message, args){
    const reload = client.emojis.cache.get('715047358873731122')
    const ok = client.emojis.cache.get('772413073701076993')
    const i = client.emojis.cache.get('776772936748630037')
    
    const dev = ['435800525389430804']
    if(!dev.includes(message.author.id)) return message.reply('당신은 개발자가 아닙니다.');
    if(!args[0]) return message.channel.send('리로드할 폴더를 선택해주세요');
    if(!args[1]) return message.channel.send('리로드할 파일을 선택해주세요');
    

    let cetegory = args[0].toLowerCase();
    let command = args[1].toLowerCase();

    try {
        delete require.cache[require.resolve(`../../commands/${cetegory}/${command}.js`)];
        client.commands.delete(command);

        const pull = require(`../../commands/${cetegory}/${command}.js`);
        client.commands.set(command, pull);
    } catch (e) {
        return message.channel.send(`존재하지 않는 파일 : ${command}`);
    }
    
    let wait = await message.channel.send(`${reload} 파일 리로드 중. . .`)
    const embed = new Discord.MessageEmbed()
    .setTitle('리로드가 성공적으로 완료 되었습니다')
    .setDescription(`${ok} 명령어 갯수 : ${client.commands.size}개\n📂 리로드 된 폴더 : ${cetegory}\n${i} 리로드 된 파일 : ${command}`)
    .setColor('GREEN')
    .setFooter("리로드 완료", client.user.displayAvatarURL())
    await wait.edit('',embed)
}
}

