  
const Discord = require('discord.js');
const { send } = require('process');
const db = require("quick.db")
module.exports = {
    name : 'sotd',
    run : async(client, message, args, er) => {
      if (!message.member.permissions.hass(PermissionsBitField.Flags.ManageMessages)) return

    const song = args.join(" ")
    if(!song) return message.channel.send({content: "Provide a song."})

    db.set("sotd_", song)
    message.channel.send({content: "Le done"})
    client.user.setActivity(song, { type: "PLAYING"})



}}
