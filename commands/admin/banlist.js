const Discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = {
    name: "banlist",
    aliases: ['밴리스트'],
    description: "banlist",

    async run (client, message, args) {
        if(!message.member.permissions.has("BAN_MEMBERS")) return;

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await fetchBans).map((member) => `\`${member.user.tag}\``).join(", ");

        const a = new Discord.MessageEmbed()
        .setTitle('BlackDragon Community banlist')
        .setDescription(bannedMembers)
        .setColor('GREEN')
        .setFooter("banlist", client.user.displayAvatarURL())
        message.channel.send(a)

        message.guild.fetchBans().then(banned => {
            let list = banned.map(user => user.tag).join(' / ');
        
            // Make sure if the list is too long to fit in one message, you cut it off appropriately.
            if (list.length >= 1950) list = `${list.slice(0, 1948)}...`;
        
            message.channel.send(`**${banned.size}명의 유저가 밴 리스트에 등록 되어 있습니다**`);
          })
          .catch(console.error);
    }
}