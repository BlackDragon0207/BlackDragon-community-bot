const Discord = require('discord.js');
const client = new Discord.Client();
const { token, default_prefix } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');
const config = require('./config.json');
client.config = config;
const db = require('quick.db');

client.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
        if(command.aliases){
            for(const alias of command.aliases)
            client.commands.set(alias, command);
        }
    }
}
client.on("error", console.error);

client.on('ready', () => {
    console.log('I am ready');
client.user.setActivity(`BlackDragon Community`, { type: "COMPETING"})
})

client.on('ready', () => {

setInterval(() => {
    const guild = client.guilds.cache.get("서버 ID");
    const boost = guild.channels.cache.get("채널 ID");
    boost.setName(`🎉 | ${guild.premiumSubscriptionCount || '0'}부스트 - ${guild.premiumTier ? `${guild.premiumTier}` : 'None'}레벨`)
    },5000)
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = await db.get(`prefix_${message.guild.id}`);
    if(prefix === null) prefix = default_prefix;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);


    if(prefixRegex.test(message.content)){
        const args = message.content.slice(prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();

        if(!client.commands.has(command)) return;


        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){
            console.error(error);
        }
    }
})

client.login(token)
