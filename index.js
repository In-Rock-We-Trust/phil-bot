const {Collection, Client, MessageEmbed, WebhookClient} = require('discord.js')
const fs = require('fs')
const client = new Client({
    intents: 32767,

})
const Discord = require("discord.js")
const qdb = require("quick.db")
const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.config = require("./config.json");

["commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
//require("./twitter.js")(client);
require("./music.js")(client);
client.on('ready', () => {
    console.log(`${client.user.username} ✅`)
    let so = qdb.get('sotd_')
    client.user.setActivity(so, { type: "PLAYING"})
})
client.on('messageCreate', async message =>{
    var er = new MessageEmbed()
    .setAuthor('Phil')
    .setColor(`RED`)
    .setTimestamp();
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args, er) 
})
client.on('messageCreate', message => {
    // set sotd
    if (message.channel.id === '771888334519140353') {
      if (message.author.id === '694464427923210260') {
          const args = message.content.slice(prefix.length).trim().split(/ +/);
          const split = args.join(" ").split('"')
          const song = split[1];
  
          qdb.set('sotd_', song)
          let so = qdb.get('sotd_')
      client.user.setActivity(so, { type: "PLAYING"})
    }
  }
  });
client.login(token)
