const Discord = require('discord.js');
const client = new Discord.Client()
const { token, default_prefix } = require('./config.json');
const { readdirSync, read } = require('fs');
const config = require('./config.json');
client.config = config;
const { send } = require('process');
const db = require('quick.db');
const message = [' ']
let current = 1;

client.event = new Discord.Collection();
const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadEvents.run(client);
}

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
  
    setInterval(() => {
        if(message[current]){
            client.user.setActivity(`BlackDragon Community`, { type: "COMPETING"})
        current++;
        }else{
            current = 0;
            client.user.setActivity(`흑룡 커뮤니티`, { type: "PLAYING"})
        }
    }, 5*1500)
  });

const ms = require("ms")
const timeSpan = ms("1m")
    
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

load();
client.login(token)
