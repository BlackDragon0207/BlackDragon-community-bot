const Discord = require("discord.js");

module.exports = async (client) => {
    console.log('I am ready');            
    client.user.setActivity(`BlackDragon Community`, { type: "COMPETING"})
}
