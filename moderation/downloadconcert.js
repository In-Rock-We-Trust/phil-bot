const { MessageEmbed } = require(`discord.js`);
const child = require("child_process")

module.exports = {
    name: 'concert',
    run: async (client, message, args) => {
        const conc = args.join(" ")
        if(!conc) return message.reply("Provide a concert for me to download.")
        child.exec(`youtube-dl --extract-audio --force-ipv6 --audio-format mp3 ${conc}`, (err, res) =>{
            if(err) return message.reply(`\`\`\`${err}\`\`\``)
            message.channel.send("Starting download! This may take upto 15 minutes")
        })
     

    }
}
