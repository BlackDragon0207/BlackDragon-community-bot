const Discord = require('discord.js')
const os = require('os') // npm i os
const ms = require('ms') // npm i ms
const moment = require('moment') // npm i moment
const cpuStat = require('cpu-stat') // npm i cpu-stat
const db = require('quick.db') // npm i quick.db // Optional

module.exports = {
    name: "botinfo",
      aliases: ['봇정보'],
    description: "botinfo",

    async run (client, message, args) {

            // For Status Of Bot
            const status = {
                online: '🟢 Online',
                idle: '🟡 Idle',
                dnd: '🔴 DND',
                offline: '⚫ Offline'
            }
            // UpTime Of Bot
            const days = Math.floor(client.uptime / 86400000)
            const hours = Math.floor(client.uptime / 3600000) % 24 // 1 Day = 24 Hours
            const minutes = Math.floor(client.uptime / 60000) % 60 // 1 Hour = 60 Minutes
            const seconds = Math.floor(client.uptime / 1000) % 60 // 1 Minute = 60 Seconds

            // Other Stats
            cpuStat.usagePercent(function(error, percent) {
                if(error) return message.reply(error)
                const memoryusage = formatBytes(process.memoryUsage().heapUsed) // Memory Usage
                const node = process.version // NodeJS Version
                const CPU = percent.toFixed(2) // CPU Usage
                const CPUModel = os.cpus()[0].model // PC Model
                const cores = os.cpus().length // Cores
                const card = client.emojis.cache.get('777042273350713354')
                const nodes = client.emojis.cache.get('748522338089304165')
                const name = client.emojis.cache.get('777009105356718112')
                const stats = client.emojis.cache.get('852175098453819412')
                const cpus = client.emojis.cache.get('647649699444293632')

                const embed = new Discord.MessageEmbed()
                .setAuthor(`${client.user.username} 정보`, client.user.displayAvatarURL())
                .setTimestamp()
                .setColor('#0c0c0c')
                .addField(`${name} 이름`, client.user.username, true)
                .addField(`${card} 아이디`, client.user.id, true)
                .addField(`${stats} 상태`, `${status[client.presence.status]}`)
                .addField('⏲ 작동 시간', `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`)
                .addField(`${nodes} node 버전`, node, true)
                .addField('💾 메모리 사용량', memoryusage, true)
                .addField(`${cpus} CPU 사용량`, `${CPU}%`, true)
                .addField('📋 CPU 모델', CPUModel)
                .addField('💻 코어', cores, true)
                message.channel.send(embed)
            })

            // For Memory In MB, GB....
            function formatBytes(a, b) {
                let c = 1024 // 1 GB = 1024 MB
                d = b || 2
                e = ['B', 'KB', 'MB', 'GB', 'TB']
                f = Math.floor(Math.log(a) / Math.log(c))

                return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f]
            }
        }
    }