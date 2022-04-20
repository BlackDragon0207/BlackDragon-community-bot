const { MessageEmbed } = require('discord.js');

		module.exports = {
			name: 'serverinfo',
			aliases: ['서버정보'],
			description: "serverinfo command",
			
			async run (client, message, args) {
					const ID = client.emojis.cache.get('777042273350713354')
					const owner = client.emojis.cache.get('714091211392155699')
					const ne = client.emojis.cache.get('772413074228903956')
					const ne2 = client.emojis.cache.get('713349039810281492')
					const discord = client.emojis.cache.get('777075390484447252')

		
				const embed = new MessageEmbed()
					.setThumbnail(message.guild.iconURL({ dynamic: true }))
					.setColor('#0c0c0c')
					.setTitle(`${message.guild.name} 서버 정보`)
					.setFooter('개발자 : 흑룡#1273', client.user.displayAvatarURL())
					.addFields(
						{
							name: `${owner} Owner`,
							value: message.guild.owner.user.tag,
							inline: true,
						},
						{
							name: `👥 Members`,
							value: `${message.guild.memberCount}명`,
							inline: true,
						},
						{
							name: `🟢 Members Online`,
							value: `${message.guild.members.cache.filter((m) => m.user.presence.status === 'online').size}명`,
							inline: true,
						},
						{
							name: `💾 Total Bots`,
							value: `${message.guild.members.cache.filter((m) => m.user.bot).size}개`,
							inline: true,
						},
						{
							name: `📑 Roles Count`,
							value: `${message.guild.roles.cache.size}개`,
							inline: true,
						},
						{
							name: `${discord} Emojis`,
							value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size}개` : '이모티콘이 없습니다',
							inline: true,
						},
						{
							name: `${ne} Boosters`,
							value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} Boosters` : '부스터가 없습니다',
							inline: true,
						},
						{
							name: `${ne2} Boosters Tier`,
							value: message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '티어가 없습니다',
							inline: true,
						},
					);
				return message.channel.send(embed);
			},
		};