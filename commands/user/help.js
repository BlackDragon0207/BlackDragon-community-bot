const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "help",
        aliases: ['도움말'],
    description: "The help command, what do you expect?",

    async run (client, message, args){
        const settings = client.emojis.cache.get('777009105356718112')
        const owner = client.emojis.cache.get('714091211392155699')
        const card = client.emojis.cache.get('777042273350713354')
        //Sort your commands into categories, and make seperate embeds for each category

        const x = new Discord.MessageEmbed()
        .setColor(`#111010`)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(`[ BlackDragon Community Bot command List #1 ]`)
        .addField(`${settings} **봇 개발자 전용 명령어**`, '`해당 봇을 개발한 유저만 사용이 가능합니다`')
        .addField('`D_cmd | D_node`', 'node를 실행하는 명령어')
        .addField('`D_reload | D_리로드`', '수정한 코드를 리로드 할 때 쓰는 명령어')
        .setTimestamp()

        const a = new Discord.MessageEmbed()
        .setColor(`#111010`)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(`[ BlackDragon Community Bot command List #2 ]`)
        .addField(`${owner} **서버 관리자 전용**`, '`서버의 관리자 권한을 가진 사용자만 사용이 가능합니다`')
        .addField('`D_kick | D_킥`', '특정 사용자를 서버에서 추방 시키는 명령어')
        .addField('`D_ban | D_밴`', '특정 사용자를 서버에서 차단 시키는 명령어')
        .addField('`D_warn | D_경고`', '특정 사용자에게 경고를 부여하는 명령어')
        .addField('`D_deletewarns | D_경고취소`', '특정 사용자의 경고를 취소하는 명령어')
        .addField('`D_resetwarns | D_경고초기화`', '특정 사용자의 경고를 초기화 시키는 명령어')
        .addField('`D_clear | D_청소`', '채팅 내용을 삭제하는 명령어')
        .addField('`D_mute | D_뮤트`', '유저를 뮤트 시키는 명령어')
        .addField('`D_unmute | D_언뮤트`', '유저의 뮤트를 해제 시키는 명령어')
        .setTimestamp()

        const b = new Discord.MessageEmbed()
        .setColor(`#111010`)
        .setThumbnail(client.user.displayAvatarURL())
        .setAuthor(`[ BlackDragon Community Bot command List #3 ]`)
        .addField(`${card} **일반 유저 전용**`, '`서버의 모든 유저가 사용이 가능합니다`')
        .addField('`D_help | D_도움말`', '명령어 목록을 표시하는 명령어')
        .addField('`D_ping | D_핑`', '핑을 표시하는 명령어')
        .addField('`D_weather | D_날씨`', '각 지역의 날씨를 알려주는 명령어')
        .addField('`D_warnings | D_경고확인`', '특정 사용자의 경고 횟수를 확인하는 명령어')
        .addField('`D_avatar | D_아바타`', '자신의 프로필을 출력해주는 명령어')
        .addField('`D_serverinfo | D_서버정보`', '서버의 정보를 알려주는 명령어')
        .addField('`D_botinfo | D_봇정보`', '봇의 정보를 알려주는 명령어')
        .addField('`D_userinfo | D_유저정보`', '유저의 정보를 알려주는 명령어')
        .addField('`D_covid | D_코로나`', '코로나 정보를 알려주는 명령어')
        .addField('`D_disaster | D_안내문자`', '안내문자를 알려주는 명령어')
        .setTimestamp()

        const pages = [
                x,
                a,
                b,

        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}
